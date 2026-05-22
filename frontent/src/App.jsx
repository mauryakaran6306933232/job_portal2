
// import { Button } from "@/components/ui/button"
// import Navebar from "./components/shared/Navebar"
// import { createBrowserRouter, RouterProvider, useLocation } from "react-router-dom" // 🔥 ADDED useLocation
// import Login from "./components/auth/Login";
// import Signup from "./components/auth/Signup";
// import Home from "./components/Home";
// import Job from "./components/Jobs";
// import Browse from "./components/Browse";
// import {Toaster}  from "react-hot-toast"
// import Profile from "./components/Profile";
// import AdminCompanies from "./components/Admin/AdminCompanies";
// import AdminJobs from "./components/Admin/AdminJobs"
// import JobDescription from "./components/JobDescription";
// import AdminCompanyCreate from "./components/Admin/AdminCompanyCreate";
// import AdminJobsCreate from "./components/Admin/AdminJobsCreate";
// import AdminCompanySetUp from "./components/Admin/AdminCompanySetUp"; 
// import Applicants from "./components/Admin/Applicants";
// import ProtectedRoute from './components/ProtectedRoute'; 

// // 🔥 NEW IMPORTS FOR REAL-TIME 🔥
// import { useEffect } from 'react';
// import { io } from 'socket.io-client';
// import { useSelector } from 'react-redux';
// import toast from 'react-hot-toast';
// import CompanyProfile from './components/CompanyProfile';
// // 🔥 NEW IMPORTS FOR POLISH 🔥
// import { motion } from 'framer-motion';
// import NotFound from './components/NotFound';
// import { setUserSlice } from './redux/userSlice';
// import { useDispatch } from "react-redux";
// // 🔥 FIXED PAGE TRANSITION WRAPPER 🔥
// const PageWrapper = ({ children }) => {
//     const location = useLocation(); // Get current URL
    
//     return (
//         <motion.div
//             key={location.pathname} // 🔥 FORCES RE-MOUNT ON ROUTE CHANGE!
//             initial={{ opacity: 0, y: 20 }} // Start slightly lower and invisible
//             animate={{ opacity: 1, y: 0 }}   // Slide up and fade in
//             exit={{ opacity: 0, y: -20 }}    // Slide up and fade out
//             transition={{ duration: 0.4, ease: "easeInOut" }} // Smooth and visible
//         >
//             {children}
//         </motion.div>
//     );
// };

// // 🔥 REAL-TIME SOCKET LISTENER COMPONENT 🔥
// const SocketListener = () => {
//     const { user } = useSelector(store => store?.user) || {};
//     const dispatch = useDispatch();

//     useEffect(() => {
//         if (user?._id) {
//             const socket = io("http://localhost:8000");
//             socket.emit("joinRoom", user._id);
            
//             socket.on("applicationStatusUpdated", (data) => {
//                 console.log("■ Real-time notification received:", data);
//                 toast.success(data.message, { /* existing toast config */ });

//                 // ■ NEW: Push to Redux Notifications Array Instantly
//                 dispatch(setUserSlice({ 
//                     ...user, 
//                     notifications: [...(user.notifications || []), { 
//                         message: data.message, 
//                         status: data.status, 
//                         jobId: data.jobId, 
//                         read: false, 
//                         createdAt: new Date() 
//                     }]
//                 }));
//             });

//             return () => socket.disconnect();
//         }
//     }, [user]);

//     return null; 
// };

// const appRouter  = createBrowserRouter([
//    { path : '/', element : <PageWrapper><Home/></PageWrapper> },
//    { path : '/login', element : <PageWrapper><Login/></PageWrapper> },
//    { path : '/signup', element : <PageWrapper><Signup/></PageWrapper> },
//    { path : '/jobs', element : <PageWrapper><Job/></PageWrapper> },
//    { path : '/browse', element : <PageWrapper><Browse/></PageWrapper> },
//    { path : '/profile', element : <PageWrapper><Profile/></PageWrapper> },
//    { path : '/description/:id', element : <PageWrapper><JobDescription/></PageWrapper> },

//  ////admin navigate (Protected so students can't access!)   
//     { path : '/admin/companies', element : <ProtectedRoute requiredRole="recruiter"><PageWrapper><AdminCompanies/></PageWrapper></ProtectedRoute> },
//     { path : '/admin/jobs', element : <ProtectedRoute requiredRole="recruiter"><PageWrapper><AdminJobs/></PageWrapper></ProtectedRoute> },
//     { path : '/admin/jobs/create', element : <ProtectedRoute requiredRole="recruiter"><PageWrapper><AdminJobsCreate/></PageWrapper></ProtectedRoute> },
//     { path : '/admin/companies/create', element : <ProtectedRoute requiredRole="recruiter"><PageWrapper><AdminCompanyCreate/></PageWrapper></ProtectedRoute> },
//     { path : '/admin/companies/:id', element : <ProtectedRoute requiredRole="recruiter"><PageWrapper><AdminCompanySetUp/></PageWrapper></ProtectedRoute> },
//     { path : '/admin/jobs/:id/applicants', element : <ProtectedRoute requiredRole="recruiter"><PageWrapper><Applicants/></PageWrapper></ProtectedRoute> },
//     { path : '/company/:id', element : <PageWrapper><CompanyProfile/></PageWrapper> },
//    // 🔥 404 CATCH-ALL ROUTE 🔥
//    { path : '*', element : <PageWrapper><NotFound/></PageWrapper> }
//  ]);

//  function App() {
//   return (
//     <div className="">
//       <SocketListener /> 
//       <Toaster position="top-right" richColors />
//       <RouterProvider router={appRouter}> 
//       </RouterProvider>
//     </div>
//   )
// }

// export default App
import { Button } from "@/components/ui/button"
import Navebar from "./components/shared/Navebar"
import { createBrowserRouter, RouterProvider, useLocation } from "react-router-dom"
import Login from "./components/auth/Login";
import Signup from "./components/auth/Signup";
import Home from "./components/Home";
import Job from "./components/Jobs";
import Browse from "./components/Browse";
import { Toaster } from "react-hot-toast"
import Profile from "./components/Profile";
import AdminCompanies from "./components/Admin/AdminCompanies";
import AdminJobs from "./components/Admin/AdminJobs"
import JobDescription from "./components/JobDescription";
import AdminCompanyCreate from "./components/Admin/AdminCompanyCreate";
import AdminJobsCreate from "./components/Admin/AdminJobsCreate";
import AdminCompanySetUp from "./components/Admin/AdminCompanySetUp";
import Applicants from "./components/Admin/Applicants";
import ProtectedRoute from './components/ProtectedRoute';
import PublicRoute from './components/PublicRoute';

// REAL-TIME IMPORTS
import { useEffect } from 'react';
import { io } from 'socket.io-client';
import { useSelector } from 'react-redux';
import toast from 'react-hot-toast';
import CompanyProfile from './components/CompanyProfile';

// POLISH IMPORTS
import { motion } from 'framer-motion';
import NotFound from './components/NotFound';
import { setUserSlice, toggleInterviewUpdate } from './redux/userSlice'; // ■ ADDED toggleInterviewUpdate
import { updateAppliedJobStatus, toggleJobListUpdate } from './redux/JobSlice'; // ■ ADDED Job actions
import { useDispatch } from "react-redux";

// PAGE TRANSITION WRAPPER
const PageWrapper = ({ children }) => {
  const location = useLocation();
  return (
    <motion.div
      key={location.pathname}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.4, ease: "easeInOut" }}
    >
      {children}
    </motion.div>
  );
};

// ■ REAL-TIME SOCKET LISTENER COMPONENT ■
const SocketListener = () => {
  const { user } = useSelector(store => store?.user) || {};
  const dispatch = useDispatch();

  useEffect(() => {
    if (user?._id) {
      const socket = io("http://localhost:8000");
      socket.emit("joinRoom", user._id);

      // 1. Application Status Update
      socket.on("applicationStatusUpdated", (data) => {
        console.log("■ Real-time notification received:", data);
        toast.success(data.message);
        
        // A. Update Notifications Array
        dispatch(setUserSlice({
          ...user,
          notifications: [...(user.notifications || []), {
            message: data.message,
            status: data.status,
            jobId: data.jobId,
            read: false,
            createdAt: new Date()
          }]
        }));

        // B. ■ NEW: Update Application Tracker instantly!
        dispatch(updateAppliedJobStatus({ jobId: data.jobId, status: data.status }));
      });

      // 2. ■ NEW: New Job Posted (Refetch job list)
      socket.on("jobListUpdated", () => {
        console.log("■ Job list updated trigger received");
        dispatch(toggleJobListUpdate());
      });

      // 3. ■ NEW: Interview Scheduled (Refetch interviews)
      socket.on("interviewScheduled", () => {
        console.log("■ Interview scheduled trigger received");
        dispatch(toggleInterviewUpdate());
      });

      return () => socket.disconnect();
    }
  }, [user]);

  return null;
};

// ■■■ ROUTING WITH AUTH PROTECTION ■■■
const appRouter = createBrowserRouter([
  // PUBLIC ROUTES (Accessible only when LOGGED OUT)
  { path: '/login', element: <PublicRoute><PageWrapper><Login/></PageWrapper></PublicRoute> },
  { path: '/signup', element: <PublicRoute><PageWrapper><Signup/></PageWrapper></PublicRoute> },

  // PROTECTED ROUTES (Accessible only when LOGGED IN)
  { path: '/', element: <ProtectedRoute><PageWrapper><Home/></PageWrapper></ProtectedRoute> },
  { path: '/jobs', element: <ProtectedRoute><PageWrapper><Job/></PageWrapper></ProtectedRoute> },
  { path: '/browse', element: <ProtectedRoute><PageWrapper><Browse/></PageWrapper></ProtectedRoute> },
  { path: '/profile', element: <ProtectedRoute><PageWrapper><Profile/></PageWrapper></ProtectedRoute> },
  { path: '/description/:id', element: <ProtectedRoute><PageWrapper><JobDescription/></PageWrapper></ProtectedRoute> },
  { path: '/company/:id', element: <ProtectedRoute><PageWrapper><CompanyProfile/></PageWrapper></ProtectedRoute> },

  // ADMIN PROTECTED ROUTES (Accessible only for RECRUITERS)
  { path: '/admin/companies', element: <ProtectedRoute requiredRole="recruiter"><PageWrapper><AdminCompanies/></PageWrapper></ProtectedRoute> },
  { path: '/admin/jobs', element: <ProtectedRoute requiredRole="recruiter"><PageWrapper><AdminJobs/></PageWrapper></ProtectedRoute> },
  { path: '/admin/jobs/create', element: <ProtectedRoute requiredRole="recruiter"><PageWrapper><AdminJobsCreate/></PageWrapper></ProtectedRoute> },
  { path: '/admin/companies/create', element: <ProtectedRoute requiredRole="recruiter"><PageWrapper><AdminCompanyCreate/></PageWrapper></ProtectedRoute> },
  { path: '/admin/companies/:id', element: <ProtectedRoute requiredRole="recruiter"><PageWrapper><AdminCompanySetUp/></PageWrapper></ProtectedRoute> },
  { path: '/admin/jobs/:id/applicants', element: <ProtectedRoute requiredRole="recruiter"><PageWrapper><Applicants/></PageWrapper></ProtectedRoute> },

  // 404 CATCH-ALL (Also protected - must be logged in to see 404)
  { path: '*', element: <ProtectedRoute><PageWrapper><NotFound/></PageWrapper></ProtectedRoute> }
]);

function App() {
  return (
    <div className="">
      <SocketListener />
      <Toaster position="top-right" richColors />
      <RouterProvider router={appRouter}>
      </RouterProvider>
    </div>
  )
}

export default App;