
import Job from "../models/job.model.js";
import redisClient from "../utils/redis.js";

export const postJob = async (req, res) => {
    try {
        const {
            title, description, requirements, salary, 
            jobType, experience, position, location, companyId
        } = req.body;

        const userId = req.id;

        // ■ IMPROVED VALIDATION: Tell the user EXACTLY what is missing
        const missingFields = [];
        if (!title) missingFields.push("Title");
        if (!description) missingFields.push("Description");
        if (!requirements) missingFields.push("Requirements");
        if (!salary) missingFields.push("Salary");
        if (!jobType) missingFields.push("Job Type");
        if (!experience) missingFields.push("Experience");
        if (!position) missingFields.push("Position");
        if (!companyId) missingFields.push("Company (Make sure to select one!)");
        if (!location) missingFields.push("Location");

        if (missingFields.length > 0) {
            return res.status(400).json({
                success: false,
                message: `Missing required fields: ${missingFields.join(", ")}`
            });
        }

        const job = await Job.create({
            title,
            description,
            requirements: requirements.split(","),
            salary: Number(salary),
            location,
            experienceLevel: Number(experience),
            position,
            company: companyId,
            created_by: userId,
            jobType
        });

        // ■ CACHE INVALIDATION: Clear Redis cache when a new job is posted
        try {
            const keys = await redisClient.keys('jobs:*');
            if (keys.length > 0) {
                await redisClient.del(keys);
                console.log("■ Redis Cache Cleared (New Job Posted)!");
            }
        } catch (redisError) {
            console.log("Redis cache clear failed:", redisError.message);
        }

        // ■■■ NEW: Emit real-time event so students see the job instantly ■■■
        const io = req.app.get("io");
        if (io) {
            io.emit("jobListUpdated"); 
        }

        // ■ FIX: Removed duplicate return statement
        return res.status(201).json({
            message: 'New job created successfully',
            success: true,
            job
        });

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

////
export const getAllJob = async (req, res) => {
    try {
        const keyword = req?.query?.keyword || "";

        const query = {
            status: 'published', // ■ CRITICAL: Students ONLY see published jobs!
            $or: [
                { title: { $regex: keyword, $options: "i" } },
                { description: { $regex: keyword, $options: "i" } }
            ]
        };

        const jobs = await Job.find(query)
            .populate({ path: "company" })
            .sort({ createdAt: -1 });

        if (!jobs || jobs.length === 0) {
            return res.status(200).json({ // Changed to 200 so it doesn't error out
                message: "No published jobs found",
                success: true,
                jobs: []
            });
        }

        return res.status(200).json({
            success: true,
            message: "Jobs found successfully",
            jobs
        });

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "backend error in getAllJob function"
        });
    }
};

export const getJobById = async (req, res) => {
    try {
        const jobId = req.params.id;
        const job = await Job.findById(jobId);
        if (!job) {
            return res.status(404).json({
                success: false,
                message: 'job does not exist from this id'
            })
        }
        return res.status(200).json({
            success: true,
            message: "find job by id successfully",
            job
        })
    }
    catch (error) {
        return res.status(500).json({
            success: false,
            message: `backend error in the getJobById function ${error.message}` 
        })
    }
}

///for admin job
export const getAdminJobs = async (req, res) => {
    try {
        const adminId = req.id;
        const jobs = await Job.find({ created_by: adminId })
            .sort({ createdAt: -1 })                        // ✅ Sort the jobs themselves
            .populate({
                path: 'company',
                options: { sort: { createdAt: -1 } }        // ✅ Sort populated sub-docs (if needed)
            });

        if (!jobs || jobs.length === 0) {
            return res.status(200).json({
                success: true,
                message: 'No jobs posted yet',
                jobs: []
            });
        }

        return res.status(200).json({
            success: true,
            message: "job has found successfully by admin",
            jobs
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: `backend error in getAdminJob: ${error.message}` // ✅ Include actual error for debugging
        });
    }
}