
// import React, { useEffect, useState } from 'react';
// import Navebar from '../shared/Navebar';
// import { Button } from '../ui/button';
// import { Input } from '../ui/input';
// import { useNavigate } from 'react-router-dom';
// import { useSelector, useDispatch } from 'react-redux';
// import { setSearchJobByText } from '../../redux/JobSlice';
// import AdminJobsTable from './AdminJobsTable';
// import useGetAllAdminJobs from '../../hooks/useGetAllAdminJobs';
// import axios from 'axios';
// import { Briefcase, Users, TrendingUp, BarChart3 } from 'lucide-react'; // Premium Icons
// import { PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';

// export default function AdminJobs() {
//   const dispatch = useDispatch();
//   useGetAllAdminJobs();
//   const { allAdminJobs } = useSelector(Store => Store?.jobs);
//   const [value, setValue] = useState("");
//   const [analytics, setAnalytics] = useState(null);
//   const navigate = useNavigate();

//   useEffect(() => {
//     dispatch(setSearchJobByText(value));
//   }, [value]);

//   // Fetch Analytics Data from Backend Pipeline
//   useEffect(() => {
//     const fetchAnalytics = async () => {
//       try {
//         const res = await axios.get('http://localhost:8000/api/v1/analytics/dashboard', { withCredentials: true });
//         if (res.data.success) {
//           setAnalytics(res.data.analytics);
//         }
//       } catch (error) {
//         console.log("Analytics fetch error:", error);
//       }
//     };
//     fetchAnalytics();
//   }, [allAdminJobs]); // Re-fetch when jobs change

//   // Colors for Pie Chart Funnel
//   const FUNNEL_COLORS = ['#f59e0b', '#22c55e', '#ef4444']; // Yellow, Green, Red

//   return (
//     <div>
//       <Navebar />
//       <div className='max-w-7xl mx-auto my-10'>
        
//         {/* ■ PREMIUM ANALYTICS DASHBOARD ■ */}
//         <div className='mb-12'>
//           <h1 className='text-2xl font-bold text-gray-800 mb-6 flex items-center gap-2'>
//             <BarChart3 size={24} className="text-indigo-600" /> Hiring Analytics
//           </h1>

//           {/* Top Stats Cards */}
//           <div className='grid grid-cols-1 md:grid-cols-4 gap-4 mb-8'>
//             <div className='bg-white p-5 rounded-xl border shadow-sm flex items-center gap-4'>
//               <div className='bg-indigo-100 p-3 rounded-full'>
//                 <Briefcase className='text-indigo-600' size={22} />
//               </div>
//               <div>
//                 <p className='text-xs text-gray-500'>Total Jobs</p>
//                 <h2 className='text-xl font-bold text-gray-800'>{analytics?.totalJobs || 0}</h2>
//               </div>
//             </div>
//             <div className='bg-white p-5 rounded-xl border shadow-sm flex items-center gap-4'>
//               <div className='bg-green-100 p-3 rounded-full'>
//                 <Users className='text-green-600' size={22} />
//               </div>
//               <div>
//                 <p className='text-xs text-gray-500'>Total Applicants</p>
//                 <h2 className='text-xl font-bold text-gray-800'>{analytics?.totalApplicants || 0}</h2>
//               </div>
//             </div>
//             <div className='bg-white p-5 rounded-xl border shadow-sm flex items-center gap-4'>
//               <div className='bg-purple-100 p-3 rounded-full'>
//                 <TrendingUp className='text-purple-600' size={22} />
//               </div>
//               <div>
//                 <p className='text-xs text-gray-500'>Avg Applicants/Job</p>
//                 <h2 className='text-xl font-bold text-gray-800'>{analytics?.avgApplicantsPerJob || 0}</h2>
//               </div>
//             </div>
//           </div>

//           {/* Charts Section */}
//           <div className='grid grid-cols-1 lg:grid-cols-2 gap-6'>
//             {/* Application Funnel Pie Chart */}
//             <div className='bg-white p-6 rounded-xl border shadow-sm'>
//               <h2 className='text-lg font-semibold text-gray-800 mb-4'>Application Funnel</h2>
//               <div className='h-[300px] flex items-center'>
//                 <ResponsiveContainer width="100%" height="100%">
//                   <PieChart>
//                     <Pie 
//                       data={analytics?.funnelData || []} 
//                       cx="50%" 
//                       cy="50%" 
//                       outerRadius={100} 
//                       fill="#8884d8" 
//                       dataKey="value"
//                       label={({ name, percent }) => percent > 0 ? `${name} (${(percent * 100).toFixed(0)}%)` : ''}
//                     >
//                       {analytics?.funnelData?.map((entry, index) => (
//                         <Cell key={`cell-${index}`} fill={FUNNEL_COLORS[index % FUNNEL_COLORS.length]} />
//                       ))}
//                     </Pie>
//                     <Tooltip />
//                     <Legend />
//                   </PieChart>
//                 </ResponsiveContainer>
//               </div>
//             </div>

//             {/* Job Performance Bar Chart */}
//             <div className='bg-white p-6 rounded-xl border shadow-sm'>
//               <h2 className='text-lg font-semibold text-gray-800 mb-4'>Top Performing Jobs</h2>
//               <div className='h-[300px]'>
//                 <ResponsiveContainer width="100%" height="100%">
//                   <BarChart data={analytics?.jobPerfData || []}>
//                     <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#eee" />
//                     <XAxis dataKey="name" fontSize={12} tickLine={false} axisLine={false} />
//                     <YAxis fontSize={12} tickLine={false} axisLine={false} />
//                     <Tooltip />
//                     <Bar dataKey="applicants" fill="#6A38C2" radius={[4, 4, 0, 0]} />
//                   </BarChart>
//                 </ResponsiveContainer>
//               </div>
//             </div>
//           </div>
//         </div>

//         {/* EXISTING JOBS LIST */}
//         <div className='flex justify-between my-5 items-center'>
//           <Input
//             value={value}
//             onChange={(e) => setValue(e.target.value)}
//             className="w-fit"
//             placeholder="Filter By Job Name"
//           />
//           <Button onClick={() => { navigate('/admin/jobs/create') }} className="bg-[#6A38C2] hover:bg-[#5b30a6]">Post New Job</Button>
//         </div>
//         <AdminJobsTable />
//       </div>
//     </div>
//   );
// }
import React, { useEffect, useState } from 'react';
import Navebar from '../shared/Navebar';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { setSearchJobByText } from '../../redux/JobSlice';
import AdminJobsTable from './AdminJobsTable';
import useGetAllAdminJobs from '../../hooks/useGetAllAdminJobs';
import axios from 'axios';
import { Briefcase, Users, TrendingUp, BarChart3 } from 'lucide-react';
import { PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import Footer from '../Footer';

export default function AdminJobs() {
  const dispatch = useDispatch();
  useGetAllAdminJobs();
  const { allAdminJobs } = useSelector(Store => Store?.jobs);
  const [value, setValue] = useState("");
  const [analytics, setAnalytics] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(setSearchJobByText(value));
  }, [value]);

  useEffect(() => {
    const fetchAnalytics = async () => {
      try {
        const res = await axios.get('http://localhost:8000/api/v1/analytics/dashboard', { withCredentials: true });
        if (res.data.success) {
          setAnalytics(res.data.analytics);
        }
      } catch (error) {
        console.log("Analytics fetch error:", error);
      }
    };
    fetchAnalytics();
  }, [allAdminJobs]);

  const FUNNEL_COLORS = ['#f59e0b', '#22c55e', '#ef4444'];

  return (
    <div className='min-h-screen flex flex-col bg-gray-50/50'>
      <Navebar />
      
      <main className='flex-1 max-w-7xl mx-auto my-10 px-4 sm:px-6 lg:px-8 w-full'>
        {/* PREMIUM ANALYTICS DASHBOARD */}
        <div className='mb-12'>
          <h1 className='text-xl sm:text-2xl font-bold text-gray-800 mb-6 flex items-center gap-2'>
            <BarChart3 size={24} className="text-indigo-600" /> Hiring Analytics
          </h1>

          {/* Top Stats Cards - 2 cols on mobile, 4 on desktop */}
          <div className='grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8'>
            <div className='bg-white p-4 sm:p-5 rounded-xl border shadow-sm flex items-center gap-3 sm:gap-4'>
              <div className='bg-indigo-100 p-2 sm:p-3 rounded-full'>
                <Briefcase className='text-indigo-600' size={20} />
              </div>
              <div>
                <p className='text-xs text-gray-500'>Total Jobs</p>
                <h2 className='text-lg sm:text-xl font-bold text-gray-800'>{analytics?.totalJobs || 0}</h2>
              </div>
            </div>
            <div className='bg-white p-4 sm:p-5 rounded-xl border shadow-sm flex items-center gap-3 sm:gap-4'>
              <div className='bg-green-100 p-2 sm:p-3 rounded-full'>
                <Users className='text-green-600' size={20} />
              </div>
              <div>
                <p className='text-xs text-gray-500'>Applicants</p>
                <h2 className='text-lg sm:text-xl font-bold text-gray-800'>{analytics?.totalApplicants || 0}</h2>
              </div>
            </div>
            <div className='bg-white p-4 sm:p-5 rounded-xl border shadow-sm flex items-center gap-3 sm:gap-4'>
              <div className='bg-purple-100 p-2 sm:p-3 rounded-full'>
                <TrendingUp className='text-purple-600' size={20} />
              </div>
              <div>
                <p className='text-xs text-gray-500'>Avg/Job</p>
                <h2 className='text-lg sm:text-xl font-bold text-gray-800'>{analytics?.avgApplicantsPerJob || 0}</h2>
              </div>
            </div>
          </div>

          {/* Charts Section - Stack on mobile, side-by-side on desktop */}
          <div className='grid grid-cols-1 lg:grid-cols-2 gap-6'>
            <div className='bg-white p-6 rounded-xl border shadow-sm'>
              <h2 className='text-lg font-semibold text-gray-800 mb-4'>Application Funnel</h2>
              <div className='h-[300px] flex items-center'>
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie data={analytics?.funnelData || []} cx="50%" cy="50%" outerRadius={100} fill="#8884d8" dataKey="value" label={({ name, percent }) => percent > 0 ? `${name} (${(percent * 100).toFixed(0)}%)` : ''}>
                      {analytics?.funnelData?.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={FUNNEL_COLORS[index % FUNNEL_COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip />
                    <Legend />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </div>
            <div className='bg-white p-6 rounded-xl border shadow-sm'>
              <h2 className='text-lg font-semibold text-gray-800 mb-4'>Top Performing Jobs</h2>
              <div className='h-[300px]'>
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={analytics?.jobPerfData || []}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#eee" />
                    <XAxis dataKey="name" fontSize={12} tickLine={false} axisLine={false} />
                    <YAxis fontSize={12} tickLine={false} axisLine={false} />
                    <Tooltip />
                    <Bar dataKey="applicants" fill="#6A38C2" radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>
        </div>

        {/* EXISTING JOBS LIST */}
        <div className='flex flex-col sm:flex-row justify-between items-start sm:items-center my-5 gap-4'>
          <Input value={value} onChange={(e) => setValue(e.target.value)} className="w-full sm:w-fit" placeholder="Filter By Job Name" />
          <Button onClick={() => { navigate('/admin/jobs/create') }} className="w-full sm:w-auto bg-[#6A38C2] hover:bg-[#5b30a6]">Post New Job</Button>
        </div>
        <AdminJobsTable />
      </main>

      <Footer />
    </div>
  );
}