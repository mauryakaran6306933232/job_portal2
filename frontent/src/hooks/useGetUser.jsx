import axios from 'axios'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setUserSlice } from '../redux/userSlice'

const useGetUser = () => {
  const dispatch = useDispatch();
  const { user } = useSelector(store => store?.user);

  useEffect(() => {
    // Only fetch if the user is logged in
    if (user?._id) {
      const fetchUserProfile = async () => {
        try {
          const res = await axios.get("http://localhost:8000/user/profile", { 
            withCredentials: true 
          });
          if (res.data.success) {
            // ■ OVERWRITE Redux state with fresh DB data (including latest notifications!)
            dispatch(setUserSlice(res.data.user));
          }
        } catch (error) {
          console.log("Error fetching user profile:", error);
          // If 401, token is bad, wipe Redux
          if (error.response?.status === 401) {
            dispatch(setUserSlice(null));
          }
        }
      };
      fetchUserProfile();
    }
  }, [dispatch]); // We intentionally only run this on mount/refresh, not on every user change
};

export default useGetUser;