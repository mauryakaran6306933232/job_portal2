
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