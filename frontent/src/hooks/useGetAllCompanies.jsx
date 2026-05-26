
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