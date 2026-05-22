
// import React from 'react';
// import Navebar from './shared/Navebar';
// import Job from './Job';
// import JobSkeleton from './shared/JobSkeleton';
// import useGetAllJobs from '../hooks/useGetAllJobs';
// import { useSelector } from 'react-redux';
// import { useNavigate } from 'react-router-dom';
// import { Button } from '@/components/ui/button';
// import { Search, Briefcase, Users, Star, Building2, PlusCircle, LayoutDashboard } from 'lucide-react';
// import RecommendedJobs from './RecommendedJobs';
// import SearchWithAutocomplete from './SearchWithAutocomplete';
// import Footer from './Footer';

// export default function Home() {
//   useGetAllJobs();
//   // ■ FIX: Removed the extra parenthesis here
//   const { user } = useSelector(store => store?.user) || {}; 
//   const { jobs } = useSelector(store => store?.jobs);
//   const [loading, setLoading] = React.useState(true);
//   const navigate = useNavigate();

//   React.useEffect(() => {
//     if (jobs) setLoading(false);
//   }, [jobs]);

//   // ■■■ RECRUITER HOME PAGE ■■■
//   if (user?.role === 'recruiter') {
//     return (
//       <div className='min-h-screen flex flex-col bg-gray-50/50'>
//         <Navebar />
//         <main className='flex-1'>
//           <section className='relative overflow-hidden py-16 sm:py-24 bg-gradient-to-br from-white to-indigo-50 border-b'>
//             <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center'>
//               <div className='flex justify-center mb-6'>
//                 <span className='inline-flex items-center gap-2 bg-indigo-100 text-indigo-700 px-4 py-1.5 rounded-full text-sm font-semibold'>
//                   <Star size={14} /> Recruiter Dashboard
//                 </span>
//               </div>
//               <h1 className='text-3xl sm:text-5xl font-extrabold tracking-tight text-gray-900 mb-6'>
//                 Welcome back, <span className='text-[#6A38C2]'>{user?.fullname?.split(' ')[0] || 'Recruiter'}</span>!
//               </h1>
//               <p className='text-lg text-gray-600 max-w-2xl mx-auto mb-10'>
//                 Find the best talent, manage your company pipeline, and post new opportunities today.
//               </p>
//             </div>
//           </section>

//           <div className='max-w-7xl mx-auto my-16 px-4 sm:px-6 lg:px-8'>
//             <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6'>
//               <div onClick={() => navigate('/admin/jobs/create')} className='bg-white p-8 rounded-2xl border shadow-sm hover:shadow-lg transition-shadow cursor-pointer group'>
//                 <div className='bg-indigo-100 p-3 rounded-full w-fit mb-4 group-hover:bg-indigo-200 transition-colors'>
//                   <PlusCircle className='text-indigo-600' size={28} />
//                 </div>
//                 <h3 className='font-bold text-xl text-gray-900 mb-2'>Post a New Job</h3>
//                 <p className='text-gray-500 text-sm'>Create a new job listing and start receiving applications from top talent.</p>
//               </div>

//               <div onClick={() => navigate('/admin/jobs')} className='bg-white p-8 rounded-2xl border shadow-sm hover:shadow-lg transition-shadow cursor-pointer group'>
//                 <div className='bg-green-100 p-3 rounded-full w-fit mb-4 group-hover:bg-green-200 transition-colors'>
//                   <Briefcase className='text-green-600' size={28} />
//                 </div>
//                 <h3 className='font-bold text-xl text-gray-900 mb-2'>Manage Jobs</h3>
//                 <p className='text-gray-500 text-sm'>View your active job postings, track applicants, and update statuses.</p>
//               </div>

//               <div onClick={() => navigate('/admin/companies')} className='bg-white p-8 rounded-2xl border shadow-sm hover:shadow-lg transition-shadow cursor-pointer group'>
//                 <div className='bg-purple-100 p-3 rounded-full w-fit mb-4 group-hover:bg-purple-200 transition-colors'>
//                   <Building2 className='text-purple-600' size={28} />
//                 </div>
//                 <h3 className='font-bold text-xl text-gray-900 mb-2'>Manage Companies</h3>
//                 <p className='text-gray-500 text-sm'>Update your company profile, add logos, and set up company details.</p>
//               </div>
//             </div>
//           </div>
//         </main>
//         <Footer />
//       </div>
//     );
//   }

//   // ■■■ STUDENT HOME PAGE ■■■
//   return (
//     <div className='min-h-screen flex flex-col bg-gray-50/50'>
//       <Navebar />
      
//       <main className='flex-1'>
//         {/* Hero Section */}
//         <section className='relative overflow-hidden py-16 sm:py-24 lg:py-32 bg-gradient-to-br from-white to-indigo-50 border-b'>
//           <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center'>
//             <div className='flex justify-center mb-6'>
//               <span className='inline-flex items-center gap-2 bg-indigo-100 text-indigo-700 px-4 py-1.5 rounded-full text-sm font-semibold'>
//                 <Star size={14} /> #1 Job Portal for Top Talent
//               </span>
//             </div>

//             <h1 className='text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-gray-900 mb-6'>
//               Search, Apply & <br className='hidden sm:block'/>
//               Get Your <span className='text-transparent bg-clip-text bg-gradient-to-r from-[#6A38C2] to-indigo-500'>Dream Job</span>
//             </h1>

//             <p className='text-base sm:text-lg text-gray-600 max-w-2xl mx-auto mb-10'>
//               Find the best jobs according to your skills. Join thousands of professionals who are accelerating their careers.
//             </p>

//             {/* Smart Search */}
//             <div className="max-w-2xl mx-auto">
//               <SearchWithAutocomplete />
//             </div>

//             <div className='mt-12 flex flex-wrap justify-center gap-8 sm:gap-12 text-gray-600'>
//               <div className='flex items-center gap-2'>
//                 <Briefcase className='text-[#6A38C2]' size={20} />
//                 <span className='font-semibold text-gray-800'>10k+</span> Jobs
//               </div>
//               <div className='flex items-center gap-2'>
//                 <Users className='text-[#6A38C2]' size={20} />
//                 <span className='font-semibold text-gray-800'>5k+</span> Companies
//               </div>
//               <div className='flex items-center gap-2'>
//                 <Star className='text-[#6A38C2]' size={20} />
//                 <span className='font-semibold text-gray-800'>50k+</span> Hires
//               </div>
//             </div>
//           </div>
//         </section>

//         {/* Recommendation Engine */}
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//           <RecommendedJobs />
//         </div>

//         {/* Latest Jobs Section */}
//         <div className='max-w-7xl mx-auto my-16 px-4 sm:px-6 lg:px-8'>
//           <div className='flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4'>
//             <h2 className='text-2xl font-bold text-gray-900'>
//               Latest & Top <span className='text-[#6A38C2]'>Job Openings</span>
//             </h2>
//             <Button variant="outline" onClick={() => navigate('/browse')} className="border-[#6A38C2] text-[#6A38C2] hover:bg-[#6A38C2] hover:text-white shrink-0">
//               View All Jobs
//             </Button>
//           </div>

//           <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6'>
//             {loading || !jobs ? (
//               Array.from({ length: 6 }).map((_, index) => <JobSkeleton key={index} />)
//             ) : jobs?.length <= 0 ? (
//               <div className='col-span-full text-center py-10 text-gray-500'>No Jobs Found</div>
//             ) : (
//               jobs?.slice(0, 6).map((job) => <Job key={job._id} item={job} />)
//             )}
//           </div>
//         </div>
//       </main>

//       <Footer />
//     </div>
//   );
// }
import React from 'react';
import Navebar from './shared/Navebar';
import Job from './Job';
import JobSkeleton from './shared/JobSkeleton';
import useGetAllJobs from '../hooks/useGetAllJobs';
import useGetAllAdminJobs from '../hooks/useGetAllAdminJobs'; // ■ NEW IMPORT
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Search, Briefcase, Users, Star, Building2, PlusCircle, MapPin, IndianRupee, Clock } from 'lucide-react';
import RecommendedJobs from './RecommendedJobs';
import SearchWithAutocomplete from './SearchWithAutocomplete';
import Footer from './Footer';
import { Badge } from './ui/badge';

export default function Home() {
  useGetAllJobs();
  useGetAllAdminJobs(); // ■ Fetch recruiter's jobs
  
  const { user } = useSelector(store => store?.user) || {};
  const { jobs } = useSelector(store => store?.jobs);
  const { allAdminJobs } = useSelector(store => store?.jobs); // ■ Get recruiter jobs
  const [loading, setLoading] = React.useState(true);
  const navigate = useNavigate();

  React.useEffect(() => {
    if (jobs) setLoading(false);
  }, [jobs]);

  // ■■■ RECRUITER HOME PAGE ■■■
  if (user?.role === 'recruiter') {
    return (
      <div className='min-h-screen flex flex-col bg-gray-50/50'>
        <Navebar />
        <main className='flex-1'>
          <section className='relative overflow-hidden py-16 sm:py-24 bg-gradient-to-br from-white to-indigo-50 border-b'>
            <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center'>
              <div className='flex justify-center mb-6'>
                <span className='inline-flex items-center gap-2 bg-indigo-100 text-indigo-700 px-4 py-1.5 rounded-full text-sm font-semibold'>
                  <Star size={14} /> Recruiter Dashboard
                </span>
              </div>
              <h1 className='text-3xl sm:text-5xl font-extrabold tracking-tight text-gray-900 mb-6'>
                Welcome back, <span className='text-[#6A38C2]'>{user?.fullname?.split(' ')[0] || 'Recruiter'}</span>!
              </h1>
              <p className='text-lg text-gray-600 max-w-2xl mx-auto mb-10'>
                Find the best talent, manage your company pipeline, and post new opportunities today.
              </p>
            </div>
          </section>

          <div className='max-w-7xl mx-auto my-16 px-4 sm:px-6 lg:px-8'>
            {/* Action Cards */}
            <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-12'>
              <div onClick={() => navigate('/admin/jobs/create')} className='bg-white p-8 rounded-2xl border shadow-sm hover:shadow-lg transition-shadow cursor-pointer group'>
                <div className='bg-indigo-100 p-3 rounded-full w-fit mb-4 group-hover:bg-indigo-200 transition-colors'>
                  <PlusCircle className='text-indigo-600' size={28} />
                </div>
                <h3 className='font-bold text-xl text-gray-900 mb-2'>Post a New Job</h3>
                <p className='text-gray-500 text-sm'>Create a new job listing and start receiving applications from top talent.</p>
              </div>

              <div onClick={() => navigate('/admin/jobs')} className='bg-white p-8 rounded-2xl border shadow-sm hover:shadow-lg transition-shadow cursor-pointer group'>
                <div className='bg-green-100 p-3 rounded-full w-fit mb-4 group-hover:bg-green-200 transition-colors'>
                  <Briefcase className='text-green-600' size={28} />
                </div>
                <h3 className='font-bold text-xl text-gray-900 mb-2'>Manage Jobs</h3>
                <p className='text-gray-500 text-sm'>View your active job postings, track applicants, and update statuses.</p>
              </div>

              <div onClick={() => navigate('/admin/companies')} className='bg-white p-8 rounded-2xl border shadow-sm hover:shadow-lg transition-shadow cursor-pointer group'>
                <div className='bg-purple-100 p-3 rounded-full w-fit mb-4 group-hover:bg-purple-200 transition-colors'>
                  <Building2 className='text-purple-600' size={28} />
                </div>
                <h3 className='font-bold text-xl text-gray-900 mb-2'>Manage Companies</h3>
                <p className='text-gray-500 text-sm'>Update your company profile, add logos, and set up company details.</p>
              </div>
            </div>

            {/* ■■■ NEW: RECRUITER'S POSTED JOOLS LIST ■■■ */}
            <div>
              <div className='flex justify-between items-center mb-6'>
                <h2 className='text-2xl font-bold text-gray-900'>Your Recent Jobs</h2>
                <Button variant="outline" onClick={() => navigate('/admin/jobs')} className="border-[#6A38C2] text-[#6A38C2] hover:bg-[#6A38C2] hover:text-white text-sm">
                  View All & Manage
                </Button>
              </div>

              {!allAdminJobs || allAdminJobs.length === 0 ? (
                <div className='text-center py-16 bg-white rounded-2xl border'>
                  <Briefcase size={48} className='mx-auto text-gray-300 mb-4' />
                  <h3 className='text-xl font-bold text-gray-800 mb-2'>No Jobs Posted Yet</h3>
                  <p className='text-gray-500 text-sm mb-6'>Start by posting your first job to see it here.</p>
                  <Button onClick={() => navigate('/admin/jobs/create')} className="bg-[#6A38C2] hover:bg-[#5b30a6]">Post a Job</Button>
                </div>
              ) : (
                <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5'>
                  {allAdminJobs.slice(0, 6).map(job => (
                    <div key={job._id} className='bg-white p-6 rounded-2xl border shadow-sm hover:shadow-md transition-shadow flex flex-col'>
                      <div className='flex items-center gap-3 mb-4'>
                        <div className='w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center font-bold text-indigo-600 shrink-0'>
                          {job?.company?.name?.charAt(0) || 'C'}
                        </div>
                        <div className='min-w-0'>
                          <h3 className='font-bold text-gray-900 truncate'>{job?.title}</h3>
                          <p className='text-sm text-gray-500 truncate'>{job?.company?.name || "Company"}</p>
                        </div>
                      </div>
                      
                      <div className='flex flex-wrap gap-2 mb-4'>
                        <Badge variant="outline" className="text-xs border-gray-200 text-gray-600"><MapPin size={12} className='mr-1'/> {job.location}</Badge>
                        <Badge variant="outline" className="text-xs border-gray-200 text-gray-600"><IndianRupee size={12} className='mr-1'/> {job.salary} LPA</Badge>
                        <Badge className={`text-xs ${job.status === 'published' ? 'bg-green-50 text-green-700' : job.status === 'draft' ? 'bg-yellow-50 text-yellow-700' : 'bg-gray-50 text-gray-700'}`}>
                          {job.status?.charAt(0).toUpperCase() + job.status?.slice(1)}
                        </Badge>
                      </div>

                      <div className='mt-auto flex items-center justify-between text-sm text-gray-500 pt-4 border-t'>
                        <div className='flex items-center gap-1'><Clock size={14}/> {new Date(job.createdAt).toLocaleDateString()}</div>
                        <span className='font-semibold text-indigo-600'>{job?.applicant?.length || 0} Applicants</span>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  // ■■■ STUDENT HOME PAGE ■■■
  return (
    <div className='min-h-screen flex flex-col bg-gray-50/50'>
      <Navebar />
      
      <main className='flex-1'>
        {/* Hero Section */}
        <section className='relative overflow-hidden py-16 sm:py-24 lg:py-32 bg-gradient-to-br from-white to-indigo-50 border-b'>
          <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center'>
            <div className='flex justify-center mb-6'>
              <span className='inline-flex items-center gap-2 bg-indigo-100 text-indigo-700 px-4 py-1.5 rounded-full text-sm font-semibold'>
                <Star size={14} /> #1 Job Portal for Top Talent
              </span>
            </div>

            <h1 className='text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-gray-900 mb-6'>
              Search, Apply & <br className='hidden sm:block'/>
              Get Your <span className='text-transparent bg-clip-text bg-gradient-to-r from-[#6A38C2] to-indigo-500'>Dream Job</span>
            </h1>

            <p className='text-base sm:text-lg text-gray-600 max-w-2xl mx-auto mb-10'>
              Find the best jobs according to your skills. Join thousands of professionals who are accelerating their careers.
            </p>

            {/* Smart Search */}
            <div className="max-w-2xl mx-auto">
              <SearchWithAutocomplete />
            </div>

            <div className='mt-12 flex flex-wrap justify-center gap-8 sm:gap-12 text-gray-600'>
              <div className='flex items-center gap-2'>
                <Briefcase className='text-[#6A38C2]' size={20} />
                <span className='font-semibold text-gray-800'>10k+</span> Jobs
              </div>
              <div className='flex items-center gap-2'>
                <Users className='text-[#6A38C2]' size={20} />
                <span className='font-semibold text-gray-800'>5k+</span> Companies
              </div>
              <div className='flex items-center gap-2'>
                <Star className='text-[#6A38C2]' size={20} />
                <span className='font-semibold text-gray-800'>50k+</span> Hires
              </div>
            </div>
          </div>
        </section>

        {/* Recommendation Engine */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <RecommendedJobs />
        </div>

        {/* Latest Jobs Section */}
        <div className='max-w-7xl mx-auto my-16 px-4 sm:px-6 lg:px-8'>
          <div className='flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4'>
            <h2 className='text-2xl font-bold text-gray-900'>
              Latest & Top <span className='text-[#6A38C2]'>Job Openings</span>
            </h2>
            <Button variant="outline" onClick={() => navigate('/browse')} className="border-[#6A38C2] text-[#6A38C2] hover:bg-[#6A38C2] hover:text-white shrink-0">
              View All Jobs
            </Button>
          </div>

          <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6'>
            {loading || !jobs ? (
              Array.from({ length: 6 }).map((_, index) => <JobSkeleton key={index} />)
            ) : jobs?.length <= 0 ? (
              <div className='col-span-full text-center py-10 text-gray-500'>No Jobs Found</div>
            ) : (
              jobs?.slice(0, 6).map((job) => <Job key={job._id} item={job} />)
            )}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}