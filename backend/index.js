import Message from './models/message.model.js';
import express from 'express';
import dotenv from 'dotenv';
import { createServer } from 'http';
import { Server } from 'socket.io';
import Interview from './models/interview.model.js';
import userRouter from './routes.js/user.route.js';
import companyRouter from './routes.js/company.route.js';
import Application from './models/application.model.js';
import jobRouter from './routes.js/job.route.js';
import applicationRouter from './routes.js/application.route.js';
import mongodb_connection from './mongodb.js';
import cors from 'cors';
import { advancedJobSearch } from './controlers/advancedSearch.controler.js';
import { getApplicant, updateStatus } from './controlers/application.controler.js';
import isAuthenticate from './middleware/isAuthenticate.js';
import cookie_parser from 'cookie-parser';
import mongoose from 'mongoose';
import { parseResumeAI } from './controlers/ai.controller.js';
import upload from './middleware/multer.js';
import Job from './models/job.model.js';
import User from './models/user.model.js';
import redisClient from './utils/redis.js';
import { sendCustomEmail } from './utils/mailer.js';

dotenv.config();

const app = express();

// ✅ DYNAMIC URLS: Use env vars, fallback to localhost
const FRONTEND_URL = process.env.FRONTEND_URL || "http://localhost:5173";

// SOCKET.IO SETUP
const httpServer = createServer(app);
const io = new Server(httpServer, {
  cors: {
    origin: FRONTEND_URL,
    methods: ["GET", "POST"],
    credentials: true
  }
});

io.on("connection", (socket) => {
  console.log("■ A user connected:", socket.id);
  socket.on("joinRoom", (userId) => {
    socket.join(userId);
    console.log(`User ${userId} joined their notification room`);
  });
  socket.on("sendMessage", async (data) => {
    try {
      const newMessage = await Message.create({
        sender: data.senderId,
        receiver: data.receiverId,
        content: data.content,
        job: data.jobId
      });
      io.to(data.receiverId).emit("receiveMessage", {
        _id: newMessage._id,
        sender: data.senderId,
        receiver: data.receiverId,
        content: data.content,
        createdAt: newMessage.createdAt
      });
    } catch (error) {
      console.log("■ Chat socket error:", error);
    }
  });
  socket.on("disconnect", () => {
    console.log("■ A user disconnected:", socket.id);
  });
});

app.set("io", io);

app.use(cookie_parser());
app.use(express.json());

// ✅ DYNAMIC CORS
app.use(cors({
  origin: FRONTEND_URL,
  credentials: true
}));

mongodb_connection("job_portal");

app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
  return res.status(200).json({ success: true, message: "server run successfully" });
});

app.use('/user', userRouter);
app.use('/company', companyRouter);
app.use('/job', jobRouter);
app.use('/application', applicationRouter);

app.get('/api/v1/job/advancedSearch', advancedJobSearch);
app.get('/api/v1/application/:id/applicants', isAuthenticate, getApplicant);
app.post('/api/v1/application/status/:id/update', isAuthenticate, updateStatus);

app.get('/api/v1/company/:id/jobs', async (req, res) => {
  try {
    const companyId = req.params.id;
    const jobs = await Job.find({ company: companyId }).populate('company');
    return res.status(200).json({ success: true, jobs: jobs });
  } catch (error) {
    return res.status(500).json({ success: false, message: "Error fetching company jobs" });
  }
});

app.post('/api/v1/ai/parse-resume', upload.single('resume'), parseResumeAI);

app.post('/api/v1/job/status/:id/update', isAuthenticate, async (req, res) => {
  try {
    const { status } = req.body;
    const jobId = req.params.id;
    const recruiterId = req.id;
    if (!['draft', 'published', 'archived'].includes(status)) {
      return res.status(400).json({ success: false, message: "Invalid status" });
    }
    const job = await Job.findById(jobId);
    if (!job) return res.status(404).json({ success: false, message: "Job not found" });
    if (job.created_by.toString() !== recruiterId.toString()) {
      return res.status(403).json({ success: false, message: "You are not authorized to update this job" });
    }
    job.status = status;
    await job.save();
    const keys = await redisClient.keys('jobs:*');
    if (keys.length > 0) await redisClient.del(keys);
    const io = req.app.get("io");
    if (io) io.emit("jobListUpdated");
    return res.status(200).json({ success: true, message: `Job status updated to ${status}`, job });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
});

app.get('/api/v1/job/recommendations', isAuthenticate, async (req, res) => {
  try {
    const user = await User.findById(req.id);
    if (!user || !user.profile?.skills || user.profile.skills.length === 0) {
      return res.status(200).json({ success: true, jobs: [] });
    }
    const skillFilters = user.profile.skills.map(skill => ({ requirements: { $regex: skill, $options: "i" } }));
    const recommendedJobs = await Job.find({ status: 'published', $or: skillFilters }).populate('company').sort({ createdAt: -1 }).limit(6);
    return res.status(200).json({ success: true, jobs: recommendedJobs });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
});

app.post('/api/v1/interview/schedule', isAuthenticate, async (req, res) => {
  try {
    const { jobId, applicantId, scheduledAt, location, notes } = req.body;
    const recruiterId = req.id;
    if (!jobId || !applicantId || !scheduledAt) return res.status(400).json({ success: false, message: "Job, Applicant, and Date/Time are required." });
    const job = await Job.findById(jobId);
    if (!job || job.created_by.toString() !== recruiterId.toString()) return res.status(403).json({ success: false, message: "Not authorized" });
    const interview = await Interview.create({ job: jobId, applicant: applicantId, recruiter: recruiterId, scheduledAt, location, notes });
    const io = req.app.get("io");
    if (io) io.to(applicantId.toString()).emit("interviewScheduled");
    return res.status(201).json({ success: true, message: "Interview scheduled successfully", interview });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
});

app.get('/api/v1/interview/get', isAuthenticate, async (req, res) => {
  try {
    const userId = req.id;
    const now = new Date();
    const interviews = await Interview.find({ $or: [{ applicant: userId }, { recruiter: userId }], scheduledAt: { $gte: now }, status: 'scheduled' })
      .populate('job', 'title').populate('applicant', 'fullname email').populate('recruiter', 'fullname email').sort({ scheduledAt: 1 });
    return res.status(200).json({ success: true, interviews });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
});

app.get('/api/v1/job/autocomplete', isAuthenticate, async (req, res) => {
  try {
    const { query } = req.query;
    if (!query || query.trim() === '') return res.status(200).json({ success: true, suggestions: [] });
    const jobs = await Job.find({ status: 'published', $or: [{ title: { $regex: query, $options: "i" } }, { requirements: { $regex: query, $options: "i" } }] }).select('title requirements -_id').limit(5);
    const suggestions = new Set();
    jobs.forEach(job => { if (job.title.toLowerCase().includes(query.toLowerCase())) suggestions.add(job.title); job.requirements.forEach(req => { if (req.toLowerCase().includes(query.toLowerCase())) suggestions.add(req); }); });
    return res.status(200).json({ success: true, suggestions: Array.from(suggestions).slice(0, 5) });
  } catch (error) { return res.status(500).json({ success: false, message: error.message }); }
});

app.post('/api/v1/user/save-search', isAuthenticate, async (req, res) => {
  try {
    const { searchQuery } = req.body; if (!searchQuery || searchQuery.trim() === '') return res.status(400).json({ success: false });
    const userId = req.id;
    await User.findByIdAndUpdate(userId, { $pull: { recentSearches: searchQuery } });
    await User.findByIdAndUpdate(userId, { $push: { recentSearches: { $each: [searchQuery], $slice: -5 } } });
    return res.status(200).json({ success: true, message: "Search saved" });
  } catch (error) { return res.status(500).json({ success: false, message: error.message }); }
});

app.get('/api/v1/user/recent-searches', isAuthenticate, async (req, res) => {
  try { const user = await User.findById(req.id).select('recentSearches'); return res.status(200).json({ success: true, recentSearches: user?.recentSearches || [] }); } catch (error) { return res.status(500).json({ success: false, message: error.message }); }
});

app.get('/api/v1/analytics/dashboard', isAuthenticate, async (req, res) => {
  try {
    const recruiterId = req.id;
    const applicationFunnel = await Application.aggregate([{ $lookup: { from: 'jobs', localField: 'job', foreignField: '_id', as: 'jobData' } }, { $match: { 'jobData.created_by': new mongoose.Types.ObjectId(recruiterId) } }, { $group: { _id: '$status', count: { $sum: 1 } } }]);
    const funnelData = ['pending', 'accepted', 'rejected'].map(status => { const found = applicationFunnel.find(item => item._id === status); return { name: status, value: found ? found.count : 0 }; });
    const jobPerformance = await Job.aggregate([{ $match: { created_by: new mongoose.Types.ObjectId(recruiterId) } }, { $project: { title: 1, applicantCount: { $size: { $ifNull: ['$applicant', []] } } } }, { $sort: { applicantCount: -1 } }, { $limit: 5 }]);
    const jobPerfData = jobPerformance.map(job => ({ name: job.title.length > 15 ? job.title.substring(0, 15) + '...' : job.title, applicants: job.applicantCount }));
    const totalJobs = await Job.countDocuments({ created_by: recruiterId });
    const totalApplicants = await Application.countDocuments({ job: { $in: await Job.find({ created_by: recruiterId }).distinct('_id') } });
    return res.status(200).json({ success: true, analytics: { funnelData, jobPerfData, totalJobs, totalApplicants, avgApplicantsPerJob: totalJobs > 0 ? (totalApplicants / totalJobs).toFixed(1) : 0 } });
  } catch (error) { return res.status(500).json({ success: false, message: error.message }); }
});

app.get('/api/v1/message/:otherUserId', isAuthenticate, async (req, res) => {
  try {
    const myId = req.id; const otherUserId = req.params.otherUserId;
    const messages = await Message.find({ $or: [{ sender: myId, receiver: otherUserId }, { sender: otherUserId, receiver: myId }] }).sort({ createdAt: 1 });
    return res.status(200).json({ success: true, messages });
  } catch (error) { return res.status(500).json({ success: false, message: error.message }); }
});

app.post('/api/v1/user/notifications/read', isAuthenticate, async (req, res) => {
  try { await User.updateOne({ _id: req.id, 'notifications.read': false }, { $set: { 'notifications.$[].read': true } }); return res.status(200).json({ success: true, message: "Notifications marked as read" }); } catch (error) { return res.status(500).json({ success: false, message: error.message }); }
});

app.post('/api/v1/application/:id/send-email', isAuthenticate, async (req, res) => {
  try {
    const applicationId = req.params.id; const { subject, body } = req.body; const recruiterId = req.id;
    if (!subject || !body) return res.status(400).json({ success: false, message: "Subject and body are required" });
    const application = await Application.findById(applicationId).populate('job');
    if (!application) return res.status(404).json({ success: false, message: "Application not found" });
    if (application.job.created_by.toString() !== recruiterId.toString()) return res.status(403).json({ success: false, message: "Not authorized" });
    const fullApplication = await Application.findById(applicationId).populate('applicant');
    if (!fullApplication.applicant?.email) return res.status(404).json({ success: false, message: "Applicant email not found" });
    await sendCustomEmail(fullApplication.applicant.email, subject, body);
    return res.status(200).json({ success: true, message: "Email sent successfully" });
  } catch (error) { return res.status(500).json({ success: false, message: error.message }); }
});

// ✅ USE DYNAMIC PORT
const PORT = process.env.PORT || 8000;
httpServer.listen(PORT, () => {
  console.log(`Server is started at port ${PORT}`);
});