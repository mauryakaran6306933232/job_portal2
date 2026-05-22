// import FilterCard from './FilterCard'
// import Navebar from './shared/Navebar';
// import { useSelector } from 'react-redux';
// import Job from './Job';
// import Store from '../redux/Store';
// const jobsArray = [1,2,3,4,5,6,7,8];
// export default function Jobs() {
//  const job1 = useSelector(Store => Store?.jobs?.jobs);
//     console.log('jobs is' , job1) 
//   if (!job1 || job1.length === 0) {
//     return (
//       <div className='max-w-7xl mx-[100px] my-20'> 
//         <h1 className='text-4xl font-bold'>
//           <span className='text-[#6A38C2]'>Latest & Top</span> Job Openings
//         </h1>
//         <p className="text-gray-500 mt-2">No jobs available at the moment.</p>
//       </div>
//     );
//   }

  

//   return (
//     <div>
  
//       <Navebar/>
//       <div className='max-w-7xl mx-auto mt-5 ml-[30px]'>
//             <div className='flex gap-5'>
//                    <div className='w-20%'>
//                     <FilterCard/>
//                     </div>  
//            {
//             job1.length <0 ?  <span>Job not found</span>  : (
//               <div className='flex-1 h-[88vh] overflow-y-auto pb-5'>
//                 <div className='grid grid-cols-3 gap-4'>
//                  {
//                   job1.map((item , index)=>
//                     (<div>
//                         <Job item={item}/>
//                       </div>))}
//                  </div> 
//                 </div>
//             )
            
//           }
//        </div>
//       </div>
    
//     </div>
//   )
// }
import FilterCard from './FilterCard'
import Navebar from './shared/Navebar';
import { useSelector } from 'react-redux';
import Job from './Job';
import Footer from './Footer';

export default function Jobs() {
  const job1 = useSelector(Store => Store?.jobs?.jobs);

  if (!job1 || job1.length === 0) {
    return (
      <div className='min-h-screen flex flex-col bg-gray-50/50'>
        <Navebar />
        <main className='flex-1 max-w-7xl mx-auto my-20 px-4 sm:px-6 lg:px-8 text-center'>
          <h1 className='text-3xl sm:text-4xl font-bold text-gray-800'>
            No <span className='text-[#6A38C2]'>Jobs</span> Available Right Now
          </h1>
          <p className="text-gray-500 mt-3">Please check back later or try browsing.</p>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className='min-h-screen flex flex-col bg-gray-50/50'>
      <Navebar />
      <main className='flex-1 max-w-7xl mx-auto mt-5 px-4 sm:px-6 lg:px-8 w-full'>
        <div className='flex flex-col lg:flex-row gap-6 mb-10'>
          {/* Sidebar Filter - Stacks on top for mobile/tablet */}
          <div className='w-full lg:w-1/4'>
            <FilterCard />
          </div>
          
          {/* Job Listings Grid */}
          <div className='flex-1 h-[80vh] overflow-y-auto pb-5'>
            <div className='grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4'>
              {job1.map((item, index) => (
                <div key={item._id || index}>
                  <Job item={item} />
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}