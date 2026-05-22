// import React, { useEffect, useState } from 'react';
// import { useParams, Link } from 'react-router-dom';
// import axios from 'axios';
// import Navebar from './shared/Navebar';
// import Job from './Job';
// import { Button } from '@/components/ui/button';
// import { Avatar, AvatarImage } from '@/components/ui/avatar';
// import { Badge } from '@/components/ui/badge';
// import { Building2, ExternalLink, MapPin, Briefcase, Globe } from 'lucide-react';
// import Skeleton from 'react-loading-skeleton';

// export default function CompanyProfile() {
//     const { id } = useParams();
//     const [company, setCompany] = useState(null);
//     const [jobs, setJobs] = useState([]);
//     const [loading, setLoading] = useState(true);

//     useEffect(() => {
//         const fetchCompanyData = async () => {
//             try {
//                 setLoading(true);
//                 // Fetch Company Details
//                 const companyRes = await axios.get(`http://localhost:8000/company/get/${id}`, { withCredentials: true });
//                 if (companyRes.data.success) setCompany(companyRes.data.company);

//                 // Fetch Company Jobs
//                 const jobsRes = await axios.get(`http://localhost:8000/api/v1/company/${id}/jobs`, { withCredentials: true });
//                 if (jobsRes.data.success) setJobs(jobsRes.data.jobs);

//             } catch (error) {
//                 console.log("Error fetching company profile:", error);
//             } finally {
//                 setLoading(false);
//             }
//         };
//         fetchCompanyData();
//     }, [id]);

//     if (loading) {
//         return (
//             <div>
//                 <Navebar />
//                 <div className='max-w-5xl mx-auto my-10 p-6'>
//                     <Skeleton height={150} className="mb-6"/>
//                     <Skeleton count={3} className="mb-4"/>
//                     <Skeleton height={100} count={3}/>
//                 </div>
//             </div>
//         );
//     }

//     if (!company) {
//         return (
//             <div>
//                 <Navebar />
//                 <div className='text-center py-20'>
//                     <h2 className='text-2xl font-bold text-gray-800'>Company not found</h2>
//                     <Link to="/browse"><Button className="mt-4 bg-[#6A38C2]">Browse Jobs</Button></Link>
//                 </div>
//             </div>
//         );
//     }

//     return (
//         <div className='bg-gray-50 min-h-screen'>
//             <Navebar />
            
//             {/* Company Hero Banner */}
//             <div className='bg-gradient-to-br from-indigo-50 to-white border-b'>
//                 <div className='max-w-5xl mx-auto px-6 py-12'>
//                     <div className='flex flex-col md:flex-row items-center gap-8'>
//                         <Avatar className="h-28 w-28 rounded-2xl shadow-md ring-4 ring-white">
//                             <AvatarImage src={company.logo || "https://th.bing.com/th/id/OIP.4rZ4ZPxFnT6vMCad7bnPugHaHa?w=193&h=193"} />
//                         </Avatar>
//                         <div className='flex-1 text-center md:text-left'>
//                             <h1 className='text-4xl font-extrabold text-gray-900 tracking-tight'>{company.name}</h1>
//                             <div className='flex flex-wrap justify-center md:justify-start gap-3 mt-3 text-gray-600'>
//                                 {company.location && (
//                                     <span className='flex items-center gap-1 text-sm'><MapPin size={14}/> {company.location}</span>
//                                 )}
//                                 {company.website && (
//                                     <a href={company.website} target='_blank' rel="noopener noreferrer" className='flex items-center gap-1 text-sm text-[#6A38C2] hover:underline'>
//                                         <Globe size={14}/> Website <ExternalLink size={12}/>
//                                     </a>
//                                 )}
//                                 <span className='flex items-center gap-1 text-sm'><Briefcase size={14}/> {jobs.length} Open Jobs</span>
//                             </div>
//                         </div>
//                     </div>
//                 </div>
//             </div>

//             {/* Company Description & Jobs */}
//             <div className='max-w-5xl mx-auto px-6 my-10'>
//                 <div className='bg-white p-8 rounded-2xl shadow-sm border mb-10'>
//                     <h2 className='text-xl font-bold text-gray-900 mb-3'>About {company.name}</h2>
//                     <p className='text-gray-700 leading-relaxed'>
//                         {company.description || "This company hasn't added a description yet. Stay tuned for updates!"}
//                     </p>
//                 </div>

//                 <h2 className='text-2xl font-bold text-gray-900 mb-6'>Open Positions at {company.name}</h2>
                
//                 {jobs.length <= 0 ? (
//                     <div className='text-center py-10 bg-white rounded-xl border'>
//                         <p className='text-gray-500'>No open positions right now. Check back later!</p>
//                     </div>
//                 ) : (
//                     <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
//                         {jobs.map(job => (
//                             <Job key={job._id} item={job} />
//                         ))}
//                     </div>
//                 )}
//             </div>
//         </div>
//     );
// }
import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import Navebar from './shared/Navebar';
import Job from './Job';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarImage } from '@/components/ui/avatar';
import { Building2, ExternalLink, MapPin, Briefcase, Globe } from 'lucide-react';
import Skeleton from 'react-loading-skeleton';
import Footer from './Footer';

export default function CompanyProfile() {
  const { id } = useParams();
  const [company, setCompany] = useState(null);
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCompanyData = async () => {
      try {
        setLoading(true);
        const companyRes = await axios.get(`http://localhost:8000/company/get/${id}`, { withCredentials: true });
        if (companyRes.data.success) setCompany(companyRes.data.company);
        
        const jobsRes = await axios.get(`http://localhost:8000/api/v1/company/${id}/jobs`, { withCredentials: true });
        if (jobsRes.data.success) setJobs(jobsRes.data.jobs);
      } catch (error) {
        console.log("Error fetching company profile:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchCompanyData();
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navebar />
        <div className='max-w-5xl mx-auto my-10 p-6 w-full'>
          <Skeleton height={150} className="mb-6"/>
          <Skeleton count={3} className="mb-4"/>
          <Skeleton height={100} count={3}/>
        </div>
      </div>
    );
  }

  if (!company) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navebar />
        <div className='flex-1 flex flex-col items-center justify-center py-20 px-4'>
          <h2 className='text-2xl font-bold text-gray-800 mb-4'>Company not found</h2>
          <Link to="/browse"><Button className="bg-[#6A38C2] hover:bg-[#5b30a6]">Browse Jobs</Button></Link>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className='min-h-screen flex flex-col bg-gray-50'>
      <Navebar />

      <main className='flex-1'>
        {/* Company Hero Banner */}
        <div className='bg-gradient-to-br from-indigo-50 to-white border-b'>
          <div className='max-w-5xl mx-auto px-4 sm:px-6 py-10 sm:py-12'>
            <div className='flex flex-col sm:flex-row items-center gap-6 sm:gap-8'>
              <Avatar className="h-24 w-24 sm:h-28 sm:w-28 rounded-2xl shadow-md ring-4 ring-white shrink-0">
                <AvatarImage src={company.logo || "https://github.com/shadcn.png"} />
              </Avatar>
              <div className='flex-1 text-center sm:text-left'>
                <h1 className='text-3xl sm:text-4xl font-extrabold text-gray-900 tracking-tight'>{company.name}</h1>
                <div className='flex flex-wrap justify-center sm:justify-start gap-3 mt-3 text-gray-600'>
                  {company.location && (
                    <span className='flex items-center gap-1 text-sm'><MapPin size={14}/> {company.location}</span>
                  )}
                  {company.website && (
                    <a href={company.website} target='_blank' rel="noopener noreferrer" className='flex items-center gap-1 text-sm text-indigo-600 hover:underline'>
                      <Globe size={14}/> Website <ExternalLink size={12}/>
                    </a>
                  )}
                  <span className='flex items-center gap-1 text-sm'><Briefcase size={14}/> {jobs.length} Open Jobs</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Company Description & Jobs */}
        <div className='max-w-5xl mx-auto px-4 sm:px-6 my-10'>
          <div className='bg-white p-6 sm:p-8 rounded-2xl shadow-sm border mb-10'>
            <h2 className='text-xl font-bold text-gray-900 mb-3'>About {company.name}</h2>
            <p className='text-gray-700 leading-relaxed'>
              {company.description || "This company hasn't added a description yet. Stay tuned for updates!"}
            </p>
          </div>
          
          <h2 className='text-2xl font-bold text-gray-900 mb-6'>Open Positions at {company.name}</h2>

          {jobs.length <= 0 ? (
            <div className='text-center py-10 bg-white rounded-xl border'>
              <p className='text-gray-500'>No open positions right now. Check back later!</p>
            </div>
          ) : (
            <div className='grid grid-cols-1 sm:grid-cols-2 gap-6'>
              {jobs.map(job => (
                <Job key={job._id} item={job} />
              ))}
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
}