// import React from 'react'
// import LatestJobCard from './LatestJobCard'
// import {useSelector} from 'react-redux'
// import Store from '../redux/Store';

// export default function LatestJob() {
//    const randomJobs1 = useSelector(Store=>Store?.jobs?.jobs);
//    if(randomJobs1.length == null){
//     return (
//       <div className='max-w-7xl mx-[100px] my-20'> 
//       <h1 className='text-4xl font-bold'><span className='text-[#6A38C2]'>Latest & Top</span> Job Openings</h1>
//       </div>
//     )
//    }
//   return (
//     <div className='max-w-7xl mx-[100px] my-20'> 
//       <h1 className='text-4xl font-bold'><span className='text-[#6A38C2]'>Latest & Top</span> Job Openings</h1>
//       <div className='grid grid-cols-3 gap-4 my-5'>
//               {
//         (randomJobs1.length!= null &&    randomJobs1.length <= 6 )? randomJobs1?.map((item , index)=><LatestJobCard job={item}/>)  :randomJobs1.slice(0,6).map((item , index)=><LatestJobCard job={item}/>)     
//       }  
//       </div>
     
//     </div>
//   )
// }
import React from 'react';
import LatestJobCard from './LatestJobCard';
import { useSelector } from 'react-redux';
import Store from '../redux/Store';
export default function LatestJob() {
  const jobs = useSelector(Store => Store?.jobs?.jobs);
    console.log('jobs is' , jobs) 
  if (!jobs || jobs.length === 0) {
    return (
      <div className='max-w-7xl mx-[100px] my-20'> 
        <h1 className='text-4xl font-bold'>
          <span className='text-[#6A38C2]'>Latest & Top</span> Job Openings
        </h1>
        <p className="text-gray-500 mt-2">No jobs available at the moment.</p>
      </div>
    );
  }

  const jobsToShow = jobs.length <= 6 ? jobs : jobs.slice(0, 6);

  return (
    <div className='max-w-7xl mx-[100px] my-20'> 
      <h1 className='text-4xl font-bold'>
        <span className='text-[#6A38C2]'>Latest & Top</span> Job Openings
      </h1>
      <div className='grid grid-cols-3 gap-4 my-5'>
        {jobsToShow.map((item, index) => (
          <LatestJobCard key={item._id || index} item={item} />
        ))}
      </div>
    </div>
  );
}
