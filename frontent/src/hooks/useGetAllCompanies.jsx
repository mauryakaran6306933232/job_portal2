import axios from 'axios'
import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { setAllCompanies } from '../redux/CompanySlice'

const useGetAllCompanies = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchCompanies = async () => {
      try {
        const res = await axios.get('http://localhost:8000/company/get', {
          withCredentials: true
        });
        if (res?.data?.success) {
          dispatch(setAllCompanies(res?.data?.companies));
        }
      } catch (error) {
        console.log("Error fetching companies:", error);
      }
    };
    fetchCompanies();
  }, [dispatch]);
};

export default useGetAllCompanies;