
import axios from 'axios';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setAllAdminJobs } from '../redux/JobSlice';
import { JOB_API_END_POINT } from '../utils/constant'; // ✅ MUST BE IMPORTED

const useGetAllAdminJobs = () => {
  const dispatch = useDispatch();
  const { user } = useSelector(store => store?.user);

  useEffect(() => {
    if (user?.role === 'recruiter') {
      const fetchAllAdminJobs = async () => {
        try {
          // ✅ MUST USE JOB_API_END_POINT, NOT LOCALHOST
          const res = await axios.get(`${JOB_API_END_POINT}/getAdminJob`, { withCredentials: true });
          if (res.data.success) {
            dispatch(setAllAdminJobs(res.data.jobs));
          }
        } catch (error) {
          console.log("Fetch admin jobs error:", error);
          if (error.response?.status === 401) {
            dispatch(setAllAdminJobs([]));
          }
        }
      };
      fetchAllAdminJobs();
    } else {
      dispatch(setAllAdminJobs([]));
    }
  }, [user, dispatch]);
};

export default useGetAllAdminJobs;