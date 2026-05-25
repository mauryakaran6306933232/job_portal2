
// import axios from 'axios'
// import { useEffect } from 'react'
// import { useDispatch, useSelector } from 'react-redux'
// import { setAllAdminJobs } from '../redux/JobSlice'

// const useGetAllAdminJobs = () => {
//   const dispatch = useDispatch();
//   const { user } = useSelector(store => store?.user);

//   useEffect(() => {
//     // Only run if the user is a recruiter
//     if (user?.role === 'recruiter') {
//       const fetchAllAdminJobs = async () => {
//         try {
//           const res = await axios.get("http://localhost:8000/job/getAdminJob", { withCredentials: true });
//           if (res.data.success) {
//             dispatch(setAllAdminJobs(res.data.jobs));
//           }
//         } catch (error) {
//           console.log("Fetch admin jobs error:", error);
//           // If 401, wipe the Redux array so we don't show the previous user's jobs
//           if (error.response?.status === 401) {
//             dispatch(setAllAdminJobs([]));
//           }
//         }
//       };
//       fetchAllAdminJobs();
//     } else {
//       // If the user is a student or logged out, ensure admin jobs are empty
//       dispatch(setAllAdminJobs([]));
//     }
//   }, [user, dispatch]);
// };

// export default useGetAllAdminJobs;
import axios from 'axios'; import { useEffect } from 'react'; import { useDispatch } from 'react-redux'; import { setAllCompanies } from '../redux/CompanySlice'; import { COMPANY_API_END_POINT } from '../utils/constant'; // ✅ ADD
const useGetAllCompanies = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    const fetchCompanies = async () => {
      try { const res = await axios.get(`${COMPANY_API_END_POINT}/get`, { withCredentials: true }); if (res?.data?.success) dispatch(setAllCompanies(res?.data?.companies)); } catch (error) { console.log(error); }
    }; fetchCompanies();
  }, [dispatch]);
};
export default useGetAllCompanies;