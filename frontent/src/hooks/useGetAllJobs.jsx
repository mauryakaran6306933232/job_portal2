
import axios from 'axios'; import { useEffect } from 'react'; import { useDispatch, useSelector } from 'react-redux'; import { setJob } from '../redux/JobSlice'; import { JOB_API_END_POINT } from '../utils/constant'; // ✅ ADD
const useGetAllJobs = () => {
  const dispatch = useDispatch(); const jobListUpdateFlag = useSelector(store => store?.jobs?.jobListUpdateFlag);
  useEffect(() => {
    const fetchAllJobs = async () => {
      try { const res = await axios.get(`${JOB_API_END_POINT}/get`, { withCredentials: true }); if (res.data.success) dispatch(setJob(res.data.jobs)); } catch (error) { console.log(error); }
    }; fetchAllJobs();
  }, [dispatch, jobListUpdateFlag]);
};
export default useGetAllJobs;