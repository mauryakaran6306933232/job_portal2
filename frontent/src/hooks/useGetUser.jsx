
import axios from 'axios'; import { useEffect } from 'react'; import { useDispatch, useSelector } from 'react-redux'; import { setUserSlice } from '../redux/userSlice'; import { USER_API_END_POINT } from '../utils/constant'; // ✅ ADD
const useGetUser = () => {
  const dispatch = useDispatch(); const { user } = useSelector(store => store?.user);
  useEffect(() => {
    if (user?._id) {
      const fetchUserProfile = async () => {
        try { const res = await axios.get(`${USER_API_END_POINT}/profile`, { withCredentials: true }); if (res.data.success) dispatch(setUserSlice(res.data.user)); } catch (error) { if (error.response?.status === 401) dispatch(setUserSlice(null)); }
      }; fetchUserProfile();
    }
  }, [dispatch]);
};
export default useGetUser;