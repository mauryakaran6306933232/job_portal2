
import axios from 'axios'; import { useEffect } from 'react'; import { useDispatch, useSelector } from 'react-redux'; import { setAppliedJob } from '../redux/JobSlice'; import { APPLICATION_API_END_POINT } from '../utils/constant'; // ✅ ADD
const useGetAppliedJobs = () => {
  const dispatch = useDispatch(); const { user } = useSelector(store => store?.user);
  useEffect(() => {
    if (user?.role === 'student') {
      const fetchAppliedJobs = async () => {
        try { const res = await axios.get(`${APPLICATION_API_END_POINT}/get`, { withCredentials: true }); if (res.data.success) dispatch(setAppliedJob(res.data.application)); } catch (error) { if (error.response?.status === 401) dispatch(setAppliedJob(null)); }
      }; fetchAppliedJobs();
    } else { dispatch(setAppliedJob(null)); }
  }, [user, dispatch]);
};
export default useGetAppliedJobs;