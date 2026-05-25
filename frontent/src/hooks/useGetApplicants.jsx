// import axios from 'axios';
// import { useEffect } from 'react';
// import { useDispatch } from 'react-redux';
// import { setAllApplicants } from '../redux/ApplicationSlice'; // We will create/update this next

// const useGetApplicants = (jobId) => {
//     const dispatch = useDispatch();

//     useEffect(() => {
//         const fetchApplicants = async () => {
//             try {
//                 const res = await axios.get(
//                     `http://localhost:8000/api/v1/application/${jobId}/applicants`,
//                     { withCredentials: true }
//                 );
                
//                 if (res.data.success) {
//                     // Your backend returns the Job document with the applications populated inside it
//                     dispatch(setAllApplicants(res.data.job));
//                 }
//             } catch (error) {
//                 console.log("Error fetching applicants:", error);
//             }
//         };

//         // Only fetch if jobId is available
//         if (jobId) {
//             fetchApplicants();
//         }
//     }, [jobId, dispatch]);
// };

// export default useGetApplicants;
import axios from 'axios'; import { useEffect } from 'react'; import { useDispatch } from 'react-redux'; import { setAllApplicants } from '../redux/ApplicationSlice'; import { API_V1 } from '../utils/constant'; // ✅ ADD
const useGetApplicants = (jobId) => {
  const dispatch = useDispatch();
  useEffect(() => {
    const fetchApplicants = async () => {
      try { const res = await axios.get(`${API_V1}/application/${jobId}/applicants`, { withCredentials: true }); if (res.data.success) dispatch(setAllApplicants(res.data.job)); } catch (error) { console.log(error); }
    }; if (jobId) fetchApplicants();
  }, [jobId, dispatch]);
};
export default useGetApplicants;