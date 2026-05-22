// import React, { useState, useEffect } from 'react'
// import Navebar from './shared/Navebar'
// import Job from './Job';
// import { useSelector } from 'react-redux';
// import axios from 'axios';
// import { JOB_API_END_POINT } from '../utils/constant';
// import { Input } from '@/components/ui/input';
// import { Button } from '@/components/ui/button';
// import { debounce } from 'lodash';
// import { SearchX, DollarSign } from 'lucide-react'; // 🔥 ADDED DOLLAR SIGN

// export default function Browse() {
//   const defaultJobs = useSelector(Store => Store?.jobs?.jobs);
  
//   const [filteredJobs, setFilteredJobs] = useState([]);
//   const [isFiltering, setIsFiltering] = useState(false);

//   const [keyword, setKeyword] = useState("");
//   const [location, setLocation] = useState("");
//   const [jobType, setJobType] = useState("");
//   const [salaryMin, setSalaryMin] = useState("");
//   const [salaryMax, setSalaryMax] = useState("");

//   // 🔥 SALARY INSIGHTS: Preset Brackets 💰
//   const salaryBrackets = [
//     { label: "< 5 LPA", min: "0", max: "5" },
//     { label: "5 - 10 LPA", min: "5", max: "10" },
//     { label: "10 - 20 LPA", min: "10", max: "20" },
//     { label: "20 - 50 LPA", min: "20", max: "50" },
//     { label: "50+ LPA", min: "50", max: "" }
//   ];

//   const fetchAdvancedJobs = async (filters) => {
//     try {
//       setIsFiltering(true);
//       const queryParams = new URLSearchParams(filters).toString();
//       const res = await axios.get(`${JOB_API_END_POINT}/advancedSearch?${queryParams}`, {
//         withCredentials: true
//       });
//       if (res.data.success) {
//         setFilteredJobs(res.data.jobs);
//       }
//     } catch (error) {
//       console.log(error);
//     } finally {
//       setIsFiltering(false);
//     }
//   };

//   const debouncedFetch = debounce((filters) => fetchAdvancedJobs(filters), 300);

//   useEffect(() => {
//     if (keyword || location || jobType || salaryMin || salaryMax) {
//       const filters = {};
//       if (keyword) filters.keyword = keyword;
//       if (location) filters.location = location;
//       if (jobType) filters.jobType = jobType;
//       if (salaryMin) filters.salaryMin = salaryMin;
//       if (salaryMax) filters.salaryMax = salaryMax;

//       if (keyword) {
//         debouncedFetch(filters);
//       } else {
//         fetchAdvancedJobs(filters);
//       }
//     } else {
//       setFilteredJobs([]);
//     }

//     return () => debouncedFetch.cancel();
//   }, [keyword, location, jobType, salaryMin, salaryMax]);

//   const jobsToDisplay = (keyword || location || jobType || salaryMin || salaryMax) ? filteredJobs : (defaultJobs || []);

//   // 🔥 HELPER: Check if a salary bracket is currently active
//   const isSalaryActive = (bracket) => {
//     return salaryMin === bracket.min && salaryMax === bracket.max;
//   };

//   // 🔥 HANDLER: Click a salary bracket
//   const handleSalaryBracketClick = (bracket) => {
//     if (isSalaryActive(bracket)) {
//       // If already active, deselect it
//       setSalaryMin("");
//       setSalaryMax("");
//     } else {
//       // Apply the bracket values
//       setSalaryMin(bracket.min);
//       setSalaryMax(bracket.max);
//     }
//   };

//   return (
//     <div>
//       <Navebar />
//       <div className='max-w-7xl mx-auto my-10 flex gap-8'>
        
//         {/* FILTER SIDEBAR */}
//         <div className='w-1/4 bg-white p-6 rounded-2xl border h-fit sticky top-24'>
//           <h2 className='font-bold text-lg mb-4'>Filter Jobs</h2>
          
//           <div className='mb-4'>
//             <label className='text-sm font-medium text-gray-600'>Keyword</label>
//             <Input 
//               placeholder="React, Node, Designer..." 
//               value={keyword}
//               onChange={(e) => setKeyword(e.target.value)}
//               className="mt-1"
//             />
//           </div>

//           <div className='mb-4'>
//             <label className='text-sm font-medium text-gray-600'>Location</label>
//             <Input 
//               placeholder="Remote, Bangalore..." 
//               value={location}
//               onChange={(e) => setLocation(e.target.value)}
//               className="mt-1"
//             />
//           </div>

//           <div className='mb-4'>
//             <label className='text-sm font-medium text-gray-600'>Job Type</label>
//             <select 
//               className='w-full border rounded-md h-10 px-2 mt-1 text-sm'
//               value={jobType}
//               onChange={(e) => setJobType(e.target.value)}
//             >
//               <option value="">All Types</option>
//               <option value="Full-time">Full-time</option>
//               <option value="Part-time">Part-time</option>
//               <option value="Internship">Internship</option>
//               <option value="Remote">Remote</option>
//             </select>
//           </div>

//           {/* 🔥 SALARY INSIGHTS BRACKETS 🔥 */}
//           <div className='mb-4'>
//             <label className='text-sm font-medium text-gray-600 flex items-center gap-1 mb-2'>
//               <DollarSign size={14}/> Salary Insights
//             </label>
//             <div className='flex flex-wrap gap-2'>
//               {salaryBrackets.map((bracket, index) => (
//                 <button
//                   key={index}
//                   type="button"
//                   onClick={() => handleSalaryBracketClick(bracket)}
//                   className={`px-3 py-1.5 rounded-full text-xs font-semibold border transition-colors cursor-pointer ${
//                     isSalaryActive(bracket) 
//                       ? 'bg-[#6A38C2] text-white border-[#6A38C2]' 
//                       : 'bg-gray-50 text-gray-700 border-gray-200 hover:border-indigo-300 hover:text-indigo-600'
//                   }`}
//                 >
//                   {bracket.label}
//                 </button>
//               ))}
//             </div>
//           </div>

//           <Button 
//             variant="outline" 
//             className="w-full border-[#6A38C2] text-[#6A38C2] hover:bg-[#6A38C2] hover:text-white" 
//             onClick={() => { setKeyword(""); setLocation(""); setJobType(""); setSalaryMin(""); setSalaryMax(""); }}
//           >
//             Clear Filters
//           </Button>
//         </div>

//         {/* JOB LISTINGS & PREMIUM EMPTY STATE */}
//         <div className='flex-1'>
//           <h1 className='font-bold text-xl my-10'>Search Results ({jobsToDisplay.length})</h1>
          
//           {!jobsToDisplay || jobsToDisplay.length === 0 ? (
//             <div className='flex flex-col items-center justify-center mt-20 text-gray-500'>
//               <SearchX size={64} strokeWidth={1.5} className='text-gray-300 mb-4' />
//               <h2 className='text-2xl font-bold text-gray-800 mb-2'>No Jobs Found</h2>
//               <p className='text-center max-w-sm'>We couldn't find any jobs matching your filters. Try broadening your search criteria.</p>
//             </div>
//           ) : (
//             <div className='grid grid-cols-2 gap-4'>
//               {jobsToDisplay.map((item, index) => (
//                 <Job key={item._id || index} item={item} />
//               ))}
//             </div>
//           )}
//         </div>

//       </div>
//     </div>
//   );
// }
import React, { useState, useEffect } from 'react'
import Navebar from './shared/Navebar'
import Job from './Job';
import { useSelector } from 'react-redux';
import axios from 'axios';
import { JOB_API_END_POINT } from '../utils/constant';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { debounce } from 'lodash';
import { SearchX, DollarSign } from 'lucide-react';
import Footer from './Footer';

export default function Browse() {
  const defaultJobs = useSelector(Store => Store?.jobs?.jobs);

  const [filteredJobs, setFilteredJobs] = useState([]);
  const [isFiltering, setIsFiltering] = useState(false);
  const [keyword, setKeyword] = useState("");
  const [location, setLocation] = useState("");
  const [jobType, setJobType] = useState("");
  const [salaryMin, setSalaryMin] = useState("");
  const [salaryMax, setSalaryMax] = useState("");

  const salaryBrackets = [
    { label: "< 5 LPA", min: "0", max: "5" },
    { label: "5 - 10 LPA", min: "5", max: "10" },
    { label: "10 - 20 LPA", min: "10", max: "20" },
    { label: "20 - 50 LPA", min: "20", max: "50" },
    { label: "50+ LPA", min: "50", max: "" }
  ];

  const fetchAdvancedJobs = async (filters) => {
    try {
      setIsFiltering(true);
      const queryParams = new URLSearchParams(filters).toString();
      const res = await axios.get(`${JOB_API_END_POINT}/advancedSearch?${queryParams}`, {
        withCredentials: true
      });
      if (res.data.success) {
        setFilteredJobs(res.data.jobs);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setIsFiltering(false);
    }
  };

  const debouncedFetch = debounce((filters) => fetchAdvancedJobs(filters), 300);

  useEffect(() => {
    if (keyword || location || jobType || salaryMin || salaryMax) {
      const filters = {};
      if (keyword) filters.keyword = keyword;
      if (location) filters.location = location;
      if (jobType) filters.jobType = jobType;
      if (salaryMin) filters.salaryMin = salaryMin;
      if (salaryMax) filters.salaryMax = salaryMax;
      
      if (keyword) {
        debouncedFetch(filters);
      } else {
        fetchAdvancedJobs(filters);
      }
    } else {
      setFilteredJobs([]);
    }
    return () => debouncedFetch.cancel();
  }, [keyword, location, jobType, salaryMin, salaryMax]);

  const jobsToDisplay = (keyword || location || jobType || salaryMin || salaryMax) ? filteredJobs : (defaultJobs || []);

  const isSalaryActive = (bracket) => {
    return salaryMin === bracket.min && salaryMax === bracket.max;
  };

  const handleSalaryBracketClick = (bracket) => {
    if (isSalaryActive(bracket)) {
      setSalaryMin("");
      setSalaryMax("");
    } else {
      setSalaryMin(bracket.min);
      setSalaryMax(bracket.max);
    }
  };

  return (
    <div className='min-h-screen flex flex-col bg-gray-50/50'>
      <Navebar />
      
      <main className='flex-1 max-w-7xl mx-auto my-10 px-4 sm:px-6 lg:px-8 w-full'>
        <div className='flex flex-col md:flex-row gap-8'>
          
          {/* FILTER SIDEBAR */}
          <div className='w-full md:w-1/4 bg-white p-6 rounded-2xl border h-fit sticky top-24'>
            <div className='flex justify-between items-center mb-4'>
              <h2 className='font-bold text-lg'>Filter Jobs</h2>
              <Button variant="ghost" size="sm" className="text-[#6A38C2] text-xs" onClick={() => { setKeyword(""); setLocation(""); setJobType(""); setSalaryMin(""); setSalaryMax(""); }}>
                Clear all
              </Button>
            </div>

            <div className='mb-4'>
              <label className='text-sm font-medium text-gray-600'>Keyword</label>
              <Input placeholder="React, Node..." value={keyword} onChange={(e) => setKeyword(e.target.value)} className="mt-1" />
            </div>
            <div className='mb-4'>
              <label className='text-sm font-medium text-gray-600'>Location</label>
              <Input placeholder="Remote, Bangalore..." value={location} onChange={(e) => setLocation(e.target.value)} className="mt-1" />
            </div>
            <div className='mb-4'>
              <label className='text-sm font-medium text-gray-600'>Job Type</label>
              <select className='w-full border rounded-md h-10 px-2 mt-1 text-sm bg-white' value={jobType} onChange={(e) => setJobType(e.target.value)}>
                <option value="">All Types</option>
                <option value="Full-time">Full-time</option>
                <option value="Part-time">Part-time</option>
                <option value="Internship">Internship</option>
                <option value="Remote">Remote</option>
              </select>
            </div>
            
            {/* SALARY BRACKETS */}
            <div className='mb-4'>
              <label className='text-sm font-medium text-gray-600 flex items-center gap-1 mb-2'>
                <DollarSign size={14}/> Salary Insights
              </label>
              <div className='flex flex-wrap gap-2'>
                {salaryBrackets.map((bracket, index) => (
                  <button key={index} type="button" onClick={() => handleSalaryBracketClick(bracket)}
                    className={`px-3 py-1.5 rounded-full text-xs font-semibold border transition-colors cursor-pointer ${
                      isSalaryActive(bracket)
                        ? 'bg-[#6A38C2] text-white border-[#6A38C2]'
                        : 'bg-gray-50 text-gray-700 border-gray-200 hover:border-indigo-300 hover:text-indigo-600'
                    }`}>
                    {bracket.label}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* JOB LISTINGS */}
          <div className='flex-1'>
            <h1 className='font-bold text-xl my-2 md:my-10'>Search Results ({jobsToDisplay.length})</h1>

            {!jobsToDisplay || jobsToDisplay.length === 0 ? (
              <div className='flex flex-col items-center justify-center mt-20 text-gray-500'>
                <SearchX size={64} strokeWidth={1.5} className='text-gray-300 mb-4' />
                <h2 className='text-2xl font-bold text-gray-800 mb-2'>No Jobs Found</h2>
                <p className='text-center max-w-sm text-sm'>We couldn't find any jobs matching your filters. Try broadening your search.</p>
              </div>
            ) : (
              <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4'>
                {jobsToDisplay.map((item, index) => (
                  <Job key={item._id || index} item={item} />
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