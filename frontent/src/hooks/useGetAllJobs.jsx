// import axios from 'axios';
// import { useEffect } from 'react';
// import { useDispatch } from 'react-redux';
// import { setJob } from '../redux/JobSlice'; // 🔥 CHANGED to setJob to match your slice

// const useGetAllJobs = () => {
//     const dispatch = useDispatch();

//     useEffect(() => {
//         const fetchAllJobs = async () => {
//             try {
//                 const res = await axios.get(
//                     "http://localhost:8000/job/get",
//                     { withCredentials: true }
//                 );
//                 if (res.data.success) {
//                     dispatch(setJob(res.data.jobs)); // 🔥 CHANGED to setJob
//                 }
//             } catch (error) {
//                 console.log("Error fetching all jobs:", error);
//             }
//         };

//         fetchAllJobs();
//     }, [dispatch]);
// };

// export default useGetAllJobs;
import axios from 'axios';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setJob } from '../redux/JobSlice';

const useGetAllJobs = () => {
  const dispatch = useDispatch();
  // ■ Get the flag from Redux so we know when to refetch!
  const jobListUpdateFlag = useSelector(store => store?.jobs?.jobListUpdateFlag);

  useEffect(() => {
    const fetchAllJobs = async () => {
      try {
        const res = await axios.get("http://localhost:8000/job/get", { withCredentials: true });
        if (res.data.success) {
          dispatch(setJob(res.data.jobs));
        }
      } catch (error) {
        console.log("Error fetching all jobs:", error);
      }
    };
    fetchAllJobs();
  }, [dispatch, jobListUpdateFlag]); // ■ Added jobListUpdateFlag dependency!
};

export default useGetAllJobs;