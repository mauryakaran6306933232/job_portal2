import { Button } from "@/components/ui/button";
import Navebar from "./components/shared/Navebar";
import { createBrowserRouter, RouterProvider, useLocation } from "react-router-dom";
import Login from "./components/auth/Login";
import Signup from "./components/auth/Signup";
import Home from "./components/Home";
import Job from "./components/Jobs";
import Browse from "./components/Browse";
import { Toaster } from "react-hot-toast";
import Profile from "./components/Profile";
import AdminCompanies from "./components/Admin/AdminCompanies";
import AdminJobs from "./components/Admin/AdminJobs";
import JobDescription from "./components/JobDescription";
import AdminCompanyCreate from "./components/Admin/AdminCompanyCreate";
import AdminJobsCreate from "./components/Admin/AdminJobsCreate";
import AdminCompanySetUp from "./components/Admin/AdminCompanySetUp";
import Applicants from "./components/Admin/Applicants";
import ProtectedRoute from './components/ProtectedRoute';
import PublicRoute from './components/PublicRoute';
import { useEffect } from 'react';
import { io } from 'socket.io-client';
import { useSelector } from 'react-redux';
import toast from 'react-hot-toast';
import CompanyProfile from './components/CompanyProfile';
import { motion } from 'framer-motion';
import NotFound from './components/NotFound';
import { setUserSlice, toggleInterviewUpdate } from './redux/userSlice';
import { updateAppliedJobStatus, toggleJobListUpdate } from './redux/JobSlice';
import { useDispatch } from "react-redux";
import { SOCKET_URL } from './utils/constant'; // ✅ IMPORT

const PageWrapper = ({ children }) => {
  const location = useLocation();
  return (
    <motion.div key={location.pathname} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} transition={{ duration: 0.4, ease: "easeInOut" }}>
      {children}
    </motion.div>
  );
};

const SocketListener = () => {
  const { user } = useSelector(store => store?.user) || {};
  const dispatch = useDispatch();

  useEffect(() => {
    if (user?._id) {
      // ✅ USE DYNAMIC SOCKET URL
      const socket = io(SOCKET_URL, { 
    withCredentials: true  // Required for cross-origin cookies/auth
});
      socket.emit("joinRoom", user._id);

      socket.on("applicationStatusUpdated", (data) => {
        toast.success(data.message);
        dispatch(setUserSlice({ ...user, notifications: [...(user.notifications || []), { message: data.message, status: data.status, jobId: data.jobId, read: false, createdAt: new Date() }] }));
        dispatch(updateAppliedJobStatus({ jobId: data.jobId, status: data.status }));
      });

      socket.on("jobListUpdated", () => dispatch(toggleJobListUpdate()));
      socket.on("interviewScheduled", () => dispatch(toggleInterviewUpdate()));

      return () => socket.disconnect();
    }
  }, [user]);

  return null;
};

const appRouter = createBrowserRouter([
  { path: '/login', element: <PublicRoute><PageWrapper><Login/></PageWrapper></PublicRoute> },
  { path: '/signup', element: <PublicRoute><PageWrapper><Signup/></PageWrapper></PublicRoute> },
  { path: '/', element: <ProtectedRoute><PageWrapper><Home/></PageWrapper></ProtectedRoute> },
  { path: '/jobs', element: <ProtectedRoute><PageWrapper><Job/></PageWrapper></ProtectedRoute> },
  { path: '/browse', element: <ProtectedRoute><PageWrapper><Browse/></PageWrapper></ProtectedRoute> },
  { path: '/profile', element: <ProtectedRoute><PageWrapper><Profile/></PageWrapper></ProtectedRoute> },
  { path: '/description/:id', element: <ProtectedRoute><PageWrapper><JobDescription/></PageWrapper></ProtectedRoute> },
  { path: '/company/:id', element: <ProtectedRoute><PageWrapper><CompanyProfile/></PageWrapper></ProtectedRoute> },
  { path: '/admin/companies', element: <ProtectedRoute requiredRole="recruiter"><PageWrapper><AdminCompanies/></PageWrapper></ProtectedRoute> },
  { path: '/admin/jobs', element: <ProtectedRoute requiredRole="recruiter"><PageWrapper><AdminJobs/></PageWrapper></ProtectedRoute> },
  { path: '/admin/jobs/create', element: <ProtectedRoute requiredRole="recruiter"><PageWrapper><AdminJobsCreate/></PageWrapper></ProtectedRoute> },
  { path: '/admin/companies/create', element: <ProtectedRoute requiredRole="recruiter"><PageWrapper><AdminCompanyCreate/></PageWrapper></ProtectedRoute> },
  { path: '/admin/companies/:id', element: <ProtectedRoute requiredRole="recruiter"><PageWrapper><AdminCompanySetUp/></PageWrapper></ProtectedRoute> },
  { path: '/admin/jobs/:id/applicants', element: <ProtectedRoute requiredRole="recruiter"><PageWrapper><Applicants/></PageWrapper></ProtectedRoute> },
  { path: '*', element: <ProtectedRoute><PageWrapper><NotFound/></PageWrapper></ProtectedRoute> }
]);

function App() {
  return (
    <div className="">
      <SocketListener />
      <Toaster position="top-right" richColors />
      <RouterProvider router={appRouter}></RouterProvider>
    </div>
  );
}

export default App;