import { APPLICATION_API_END_POINT, JOB_API_END_POINT } from '../utils/constant'; // ✅ AD
import React, { useEffect, useState } from 'react';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-hot-toast';
import { setAppliedJob, setSingleJob } from '../redux/JobSlice';
import { useDispatch, useSelector } from 'react-redux';
import MatchScore from './MatchScore';
import ChatDialog from './shared/ChatDialog';
import ApplyJobDialog from './ApplyJobDialog';
import { MessageCircle, CalendarDays, Briefcase, IndianRupee, MapPin, Users } from 'lucide-react';
import Navebar from './shared/Navebar';
import Footer from './Footer';

export default function JobDescription() {
  const { id } = useParams();
  const [job, setJob] = useState(null);
  const [openChat, setOpenChat] = useState(false);
  const [openApply, setOpenApply] = useState(false);
  const dispatch = useDispatch();
  
  const { user } = useSelector(Store => Store?.user) || {};
  const singleJob = useSelector(Store => Store?.jobs?.singleJob);
  const user_id = user?._id;
  const applicant = singleJob?.applicant;
  const [isApplied, setIsApplied] = useState(false);

  useEffect(() => {
    const applied = applicant?.some(id => id === user_id) || false;
    setIsApplied(applied);
  }, [singleJob, user_id]);

  const appliedJobHandler = async () => {
    try {
      const res = await axios.get(`${APPLICATION_API_END_POINT}/get`, { // ✅ CHANGE
  headers: { 'Content-Type': 'application/json' }, withCredentials: true
});
      if (res?.data?.success) {
        dispatch(setAppliedJob(res?.data?.application));
      }
    } catch (error) {
      console.log("Fetch applied jobs error:", error?.response?.data?.message || error.message);
    }
  };

  useEffect(() => {
    appliedJobHandler();
  }, [singleJob]);

  const jobHandler = async () => {
    try {
      const res = await axios.get(`${JOB_API_END_POINT}/getJobById/${id}`, { // ✅ CHANGE
  headers: { "Content-Type": 'application/json' }, withCredentials: true
});
      if (res?.data?.success) {
        setJob(res?.data?.job);
        dispatch(setSingleJob(res?.data?.job));
      }
    } catch (error) {
      toast.error(error?.response?.data?.message || error?.message);
    }
  };

  useEffect(() => {
    jobHandler();
  }, [id]);

  if (!job) {
    return (
      <div className='min-h-screen flex flex-col'>
        <Navebar />
        <div className="flex-1 flex items-center justify-center text-gray-500">Loading job details...</div>
        <Footer />
      </div>
    );
  }

  return (
    <div className='min-h-screen flex flex-col bg-gray-50/50'>
      <Navebar />
      
      <main className='flex-1 max-w-7xl mx-auto my-10 px-4 sm:px-6 lg:px-8 w-full'>
        
        {/* Header Section */}
        <div className='bg-white p-6 sm:p-8 rounded-2xl border shadow-sm mb-6'>
          <div className='flex flex-col sm:flex-row justify-between items-start gap-6'>
            <div className='flex-1'>
              <h1 className='font-bold text-2xl sm:text-3xl text-gray-900 mb-3'>{job?.title}</h1>
              <div className='flex flex-wrap items-center gap-2'>
                <Badge className="bg-blue-50 text-blue-700 font-medium border-0" variant="outline">
                  <Briefcase size={12} className="mr-1"/> {job.position} Positions
                </Badge>
                <Badge className="bg-red-50 text-red-600 font-medium border-0" variant="outline">
                  {job.jobType}
                </Badge>
                <Badge className="bg-purple-50 text-purple-700 font-medium border-0" variant="outline">
                  <IndianRupee size={12} className="mr-1"/> {job.salary} LPA
                </Badge>
              </div>
            </div>

            <div className='flex flex-col sm:flex-row w-full sm:w-auto gap-3 shrink-0'>
              {user?.role === 'student' && (
                <Button onClick={() => setOpenChat(true)} variant="outline" className="border-indigo-600 text-indigo-600 hover:bg-indigo-50">
                  <MessageCircle size={16} className='mr-2'/> Message
                </Button>
              )}
              <Button
                onClick={() => setOpenApply(true)}
                disabled={isApplied}
                className={`rounded-lg ${isApplied ? 'bg-gray-600 cursor-not-allowed' : 'bg-[#7209b7] hover:bg-[#5f32ad] cursor-pointer'}`}
              >
                {isApplied ? 'Already Applied' : 'Apply Now'}
              </Button>
            </div>
          </div>
        </div>

        <div className='grid grid-cols-1 lg:grid-cols-3 gap-6'>
          {/* Main Details */}
          <div className='lg:col-span-2 bg-white p-6 sm:p-8 rounded-2xl border shadow-sm'>
            <h2 className='border-b pb-4 font-bold text-lg text-gray-900'>Job Description</h2>
            
            <div className='my-6 space-y-4 text-sm sm:text-base'>
              <div className='flex items-start gap-3'>
                <MapPin className='text-gray-400 mt-1 shrink-0' size={18} />
                <div><span className='font-semibold text-gray-800'>Location:</span> <span className='text-gray-600'>{job.location}</span></div>
              </div>
              <div className='flex items-start gap-3'>
                <Briefcase className='text-gray-400 mt-1 shrink-0' size={18} />
                <div><span className='font-semibold text-gray-800'>Experience:</span> <span className='text-gray-600'>{job.experienceLevel} Years</span></div>
              </div>
              <div className='flex items-start gap-3'>
                <IndianRupee className='text-gray-400 mt-1 shrink-0' size={18} />
                <div><span className='font-semibold text-gray-800'>Salary:</span> <span className='text-gray-600'>{job.salary} LPA</span></div>
              </div>
              <div className='flex items-start gap-3'>
                <Users className='text-gray-400 mt-1 shrink-0' size={18} />
                <div><span className='font-semibold text-gray-800'>Total Applicants:</span> <span className='text-gray-600'>{job.applicant?.length || 0}</span></div>
              </div>
              <div className='flex items-start gap-3'>
                <CalendarDays className='text-gray-400 mt-1 shrink-0' size={18} />
                <div><span className='font-semibold text-gray-800'>Posted Date:</span> <span className='text-gray-600'>{new Date(job?.createdAt).toLocaleDateString()}</span></div>
              </div>
            </div>

            <div className='mt-6'>
              <h3 className='font-semibold text-gray-800 mb-2'>About the role</h3>
              <p className='text-gray-600 leading-relaxed whitespace-pre-line'>{job.description}</p>
            </div>

            {job?.requirements?.length > 0 && (
              <div className='mt-6'>
                <h3 className='font-semibold text-gray-800 mb-3'>Requirements</h3>
                <div className='flex flex-wrap gap-2'>
                  {job.requirements.map((req, index) => (
                    <Badge key={index} variant="outline" className="text-gray-700 border-gray-300 py-1 px-3">{req}</Badge>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Sidebar - Match Score */}
          <div className='lg:col-span-1 space-y-6'>
            {user?.role === 'student' && job?.requirements && (
              <MatchScore jobRequirements={job.requirements} />
            )}
          </div>
        </div>
      </main>

      {/* Dialogs */}
      {openChat && (
        <ChatDialog open={openChat} setOpen={setOpenChat} receiverId={job?.created_by} receiverName="Recruiter" jobId={job?._id} />
      )}
      {openApply && (
        <ApplyJobDialog open={openApply} setOpen={setOpenApply} jobId={job?._id} onApplied={() => { setIsApplied(true); jobHandler(); }} />
      )}

      <Footer />
    </div>
  );
}