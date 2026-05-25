
import useGetAppliedJobs from '../hooks/useGetAppliedJobs';
import React, { useState } from 'react';
import UpcomingInterviews from './UpcomingInterviews';
import { Avatar, AvatarImage, AvatarFallback } from './ui/avatar';
import { Label } from './ui/label';
import { Button } from './ui/button';
import { Copy, Gift, Contact, Mail, Pen, FileText, Download, ShieldCheck, Building2, PlusCircle, Briefcase } from 'lucide-react'; // ■ FIX: Added PlusCircle & Briefcase
import UpdateProfileDialog from './UpdateProfileDialog';
import Navebar from './shared/Navebar';
import Footer from './Footer';
import { Badge } from './ui/badge';
import { useSelector } from 'react-redux';
import AppliedJobTable from './AppliedJobTable';
import toast from 'react-hot-toast';
import ApplicationTracker from './ApplicationTracker';
import { useNavigate } from 'react-router-dom';

export default function Profile() {
  const [open, setOpen] = useState(false);
  const user = useSelector(Store => Store?.user?.user);
  const navigate = useNavigate();
  
  // ■ FIX: Fetch applied jobs when the profile page loads!
  useGetAppliedJobs();
  // Profile Completion Algorithm (Only relevant for students)
  const calculateProfileStrength = () => {
    if (!user || !user.profile || user.role === 'recruiter') return 0;
    let score = 20;
    if (user.fullname) score += 15;
    if (user.email) score += 10;
    if (user.phoneNumber) score += 10;
    if (user.profile.bio) score += 15;
    if (user.profile.skills?.length > 0) score += 15;
    if (user.profile.profilePhoto) score += 5;
    if (user.profile.resume) score += 10;
    return Math.min(score, 100);
  };

  const profileStrength = calculateProfileStrength();

  const getProgressColor = () => {
    if (profileStrength <= 30) return "bg-red-500";
    if (profileStrength <= 70) return "bg-yellow-500";
    return "bg-green-500";
  };

  const copyReferralLink = () => {
    const referralLink = `${window.location.origin}/signup?ref=${user?.referralCode || ""}`; // ✅ CHANGE (Dynamic frontend URL)
    navigator.clipboard.writeText(referralLink);
    toast.success("Referral link copied to clipboard!");
  };

  return (
    <div className='min-h-screen flex flex-col bg-gray-50/50'>
      <Navebar />
      
      <main className='flex-1 max-w-4xl mx-auto my-10 px-4 w-full'>
        {/* Profile Header Card */}
        <div className='bg-white border border-gray-200 rounded-2xl p-6 sm:p-8 shadow-sm relative'>
          <div className='flex flex-col sm:flex-row justify-between items-start gap-4'>
            <div className='flex items-center gap-4 sm:gap-6 w-full'>
              <Avatar className="h-20 w-20 sm:h-24 sm:w-24 ring-4 ring-offset-2 ring-indigo-100 shrink-0">
                <AvatarImage src={user?.profile?.profilePhoto || "https://github.com/shadcn.png"} alt="Profile Photo" />
                <AvatarFallback className="bg-indigo-100 text-indigo-700 font-bold text-2xl">
                  {user?.fullname?.charAt(0)?.toUpperCase() || "U"}
                </AvatarFallback>
              </Avatar>
              <div className='flex-1 min-w-0'>
                <h1 className='font-bold text-xl sm:text-2xl text-gray-900 truncate'>{user?.fullname || "Full Name"}</h1>
                <p className='text-gray-500 mt-1 text-sm sm:text-base line-clamp-2'>{user?.profile?.bio || "Add a professional bio to increase your profile visibility."}</p>
                {/* Show Recruiter Badge */}
                {user?.role === 'recruiter' && (
                  <Badge className="mt-2 bg-indigo-50 text-indigo-700 hover:bg-indigo-100 border-0">
                    <Building2 size={12} className="mr-1"/> Recruiter
                  </Badge>
                )}
              </div>
            </div>
            <Button onClick={() => setOpen(true)} variant="outline" className="border-indigo-200 text-indigo-600 hover:bg-indigo-50 hover:text-indigo-700 shrink-0 self-end sm:self-start">
              <Pen size={16} className='mr-2' /> Edit
            </Button>
          </div>

          {/* Contact Info */}
          <div className='my-6 border-t pt-6 space-y-2'>
            <div className='flex items-center gap-3 text-gray-700 text-sm sm:text-base'>
              <Mail size={18} className='text-gray-400 shrink-0' />
              <span className='truncate'>{user?.email || "Email not provided"}</span>
            </div>
            <div className='flex items-center gap-3 text-gray-700 text-sm sm:text-base'>
              <Contact size={18} className='text-gray-400 shrink-0' />
              <span>{user?.phoneNumber || "Phone not provided"}</span>
            </div>
          </div>

          {/* ■ STUDENT SPECIFIC: Profile Strength Meter */}
          {user?.role === 'student' && (
            <div className='bg-gray-50 rounded-xl p-4 mb-6 border border-gray-100'>
              <div className='flex justify-between items-center mb-2'>
                <div className='flex items-center gap-2'>
                  <ShieldCheck size={16} className='text-indigo-600' />
                  <span className='text-sm font-semibold text-gray-700'>Profile Strength: {profileStrength}%</span>
                </div>
                {profileStrength < 100 && (
                  <span className='text-xs text-indigo-600 cursor-pointer hover:underline' onClick={() => setOpen(true)}>
                    Complete Profile
                  </span>
                )}
              </div>
              <div className='w-full bg-gray-200 rounded-full h-2'>
                <div className={`h-2 rounded-full transition-all duration-500 ${getProgressColor()}`} style={{ width: `${profileStrength}%` }}></div>
              </div>
            </div>
          )}

          {/* Skills Section (Visible to both, but mainly useful for students) */}
          <div className='my-6'>
            <h2 className='text-sm font-semibold text-gray-500 uppercase tracking-wider mb-3'>Skills</h2>
            <div className='flex flex-wrap gap-2'>
              {user?.profile?.skills?.length > 0 ? (
                user.profile.skills.map((item, index) => (
                  <Badge key={index} className="bg-indigo-50 text-indigo-700 hover:bg-indigo-100 font-medium border-0">{item}</Badge>
                ))
              ) : (
                <span className='text-sm text-gray-400'>No skills added yet.</span>
              )}
            </div>
          </div>

          {/* ■ STUDENT SPECIFIC: Resume Section */}
          {user?.role === 'student' && (
            <div className='my-4'>
              <h2 className='text-sm font-semibold text-gray-500 uppercase tracking-wider mb-3'>Resume</h2>
              {user?.profile?.resume ? (
                <a target='_blank' rel="noopener noreferrer" href={user?.profile?.resume} download={user?.profile?.resumeOriginalName || "Resume.pdf"} className='flex items-center gap-3 p-3 border border-dashed border-gray-300 rounded-lg hover:bg-gray-50 transition-colors group'>
                  <div className='bg-red-100 p-2 rounded-md'><FileText className='text-red-500' size={20} /></div>
                  <div className='flex-1 min-w-0'>
                    <p className='text-sm font-medium text-gray-800 group-hover:text-indigo-600 truncate'>{user?.profile?.resumeOriginalName || "My_Resume.pdf"}</p>
                    <p className='text-xs text-gray-400'>Click to download</p>
                  </div>
                  <Download size={16} className='text-gray-400 group-hover:text-indigo-600 shrink-0' />
                </a>
              ) : (
                <div className='flex items-center gap-3 p-3 bg-gray-50 rounded-lg text-gray-400'>
                  <FileText size={20} />
                  <span className='text-sm'>No resume uploaded</span>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Referral System Card (Visible to both) */}
        <div className='max-w-4xl mx-auto bg-gradient-to-r from-indigo-500 to-purple-600 rounded-2xl my-6 p-6 sm:p-8 text-white'>
          <div className='flex flex-col md:flex-row items-center justify-between gap-6'>
            <div className='flex items-center gap-4 text-center md:text-left'>
              <div className='bg-white/20 p-3 rounded-full shrink-0'><Gift size={28} /></div>
              <div>
                <h2 className='text-xl font-bold'>Refer & Earn</h2>
                <p className='text-indigo-100 text-sm'>Share your link with friends.</p>
                <p className='text-white font-bold mt-1'>Your Referrals: {user?.referralCount || 0}</p>
              </div>
            </div>
            <div className='flex items-center gap-2 bg-white/10 rounded-lg px-4 py-2 w-full md:w-auto shrink-0'>
              <code className='text-xs sm:text-sm truncate flex-1 text-center md:text-left'>
                {`http://localhost:5173/signup?ref=${user?.referralCode || "LOADING"}`}
              </code>
              <Button variant="ghost" size="icon" onClick={copyReferralLink} className="text-white hover:bg-white/20 shrink-0">
                <Copy size={18} />
              </Button>
            </div>
          </div>
        </div>

        {/* ■ STUDENT SPECIFIC: Upcoming Interviews & Application Tracker */}
        {user?.role === 'student' && (
          <>
            <UpcomingInterviews />
            <div className='bg-white rounded-2xl shadow-sm mt-6 p-6 sm:p-8 border border-gray-200'>
              <h1 className='font-bold text-xl text-gray-900 mb-5'>Application Tracker</h1>
              <ApplicationTracker />
            </div>
          </>
        )}

        {/* ■ RECRUITER SPECIFIC: Quick Links */}
        {user?.role === 'recruiter' && (
          <div className='bg-white rounded-2xl shadow-sm mt-6 p-6 sm:p-8 border border-gray-200'>
            <h1 className='font-bold text-xl text-gray-900 mb-5'>Recruiter Actions</h1>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Button onClick={() => navigate('/admin/jobs/create')} className="w-full bg-[#6A38C2] hover:bg-[#5b30a6] py-5">
                <PlusCircle size={16} className="mr-2"/> Post New Job
              </Button>
              <Button onClick={() => navigate('/admin/jobs')} variant="outline" className="w-full border-[#6A38C2] text-[#6A38C2] hover:bg-[#6A38C2] hover:text-white py-5">
                <Briefcase size={16} className="mr-2"/> Manage Jobs
              </Button>
            </div>
          </div>
        )}

        <UpdateProfileDialog open={open} setOpen={setOpen} />
      </main>

      <Footer />
    </div>
  );
}