
// import React, { useState, useEffect } from 'react';
// import { Link, useNavigate } from 'react-router-dom';
// import { useSelector, useDispatch } from 'react-redux';
// import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover';
// import { LogOut, User2, Menu, X, Bell, CheckCircle } from "lucide-react";
// import { Button } from '../ui/button';
// import { Avatar, AvatarImage, AvatarFallback } from '../ui/avatar';
// import axios from 'axios';
// import toast from 'react-hot-toast';
// import { setUserSlice } from '../../redux/userSlice';

// export default function Navebar() {
//   const dispatch = useDispatch();
//   const user = useSelector(Store => Store?.user?.user);
//   const navigate = useNavigate();
//   const [mobileOpen, setMobileOpen] = useState(false);

//   // Notification State
//   const [notifications, setNotifications] = useState([]);
//   const [unreadCount, setUnreadCount] = useState(0);

//   // Sync Notifications from Redux
//   useEffect(() => {
//     if (user?.notifications) {
//       setNotifications(user.notifications.slice().reverse());
//       setUnreadCount(user.notifications.filter(n => !n.read).length);
//     }
//   }, [user]);

//   const profileHandler = () => {
//     navigate('/profile');
//   };

//   const logoutHandler = async () => {
//     try {
//       const res = await axios.get("http://localhost:8000/user/logout", {
//         headers: { "Content-Type": 'application/json' },
//         withCredentials: true
//       });
//       if (res?.data?.success) {
//         toast.success(res?.data?.message);
//         dispatch(setUserSlice(null));
//         navigate('/');
//       }
//     } catch (error) {
//       const mes_err = error?.response?.data?.message || `Logout failed`;
//       toast.error(mes_err);
//     }
//   };

//   const markAsRead = async () => {
//     try {
//       await axios.post('http://localhost:8000/api/v1/user/notifications/read', {}, { withCredentials: true });
//       setUnreadCount(0);
//       dispatch(setUserSlice({ ...user, notifications: user.notifications.map(n => ({ ...n, read: true })) }));
//     } catch (error) {
//       console.log("Mark read error:", error);
//     }
//   };

//   const navLinks = user && user.role === 'recruiter'
//     ? [
//       { label: 'Companies', to: '/admin/companies' },
//       { label: 'Jobs', to: '/admin/jobs' }
//     ]
//     : [
//       { label: 'Home', to: '/' },
//       { label: 'Jobs', to: '/jobs' },
//       { label: 'Browse', to: '/browse' }
//     ];

//   return (
//     <nav className='bg-white font-bold px-4 md:px-8 lg:px-12 h-16 shadow-sm sticky top-0 z-50'>
//       <div className='max-w-7xl mx-auto h-full flex items-center justify-between'>
//         {/* Logo */}
//         <Link to='/' className='text-2xl text-black font-bold shrink-0'>
//           job<span className='text-[#6A38C2]'>Portal</span>
//         </Link>

//         {/* Desktop Navigation (Hidden on Mobile) */}
//         <div className='hidden md:flex items-center gap-8'>
//           <ul className='flex items-center gap-6 text-base text-slate-800'>
//             {navLinks.map(link => (
//               <li key={link.label} className='hover:text-[#6A38C2] transition-colors cursor-pointer'>
//                 <Link to={link.to}>{link.label}</Link>
//               </li>
//             ))}
//           </ul>

//           {!user ? (
//             <div className='flex items-center gap-3'>
//               <Link to='/login'><Button variant="outline" className="cursor-pointer">Login</Button></Link>
//               <Link to='/signup'><Button className="bg-[#6A38C2] hover:bg-[#5b30a6] cursor-pointer">Signup</Button></Link>
//             </div>
//           ) : (
//             <div className='flex items-center gap-4'>
//               {/* Desktop Notification Bell */}
//               {user.role === 'student' && (
//                 <Popover>
//                   <PopoverTrigger asChild>
//                     <Button variant="ghost" size="icon" className="relative cursor-pointer">
//                       <Bell size={20} className="text-gray-600" />
//                       {unreadCount > 0 && (
//                         <span className='absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-red-500 text-[10px] font-bold text-white'>
//                           {unreadCount}
//                         </span>
//                       )}
//                     </Button>
//                   </PopoverTrigger>
//                   <PopoverContent className="w-80 p-0">
//                     <div className='p-3 border-b flex justify-between items-center'>
//                       <h3 className='font-bold text-gray-900'>Notifications</h3>
//                       {unreadCount > 0 && (
//                         <button onClick={markAsRead} className='text-xs text-indigo-600 hover:underline flex items-center gap-1'>
//                           <CheckCircle size={12} /> Mark all read
//                         </button>
//                       )}
//                     </div>
//                     <div className='max-h-[300px] overflow-y-auto divide-y'>
//                       {notifications.length === 0 ? (
//                         <p className='p-4 text-sm text-gray-500 text-center'>No notifications yet</p>
//                       ) : (
//                         notifications.map((notif, idx) => (
//                           <div key={idx} className={`p-3 hover:bg-gray-50 transition-colors ${!notif.read ? 'bg-indigo-50/50' : ''}`}>
//                             <p className='text-sm text-gray-800'>{notif.message}</p>
//                             <p className='text-xs text-gray-400 mt-1'>
//                               {new Date(notif.createdAt || Date.now()).toLocaleString()}
//                             </p>
//                           </div>
//                         ))
//                       )}
//                     </div>
//                   </PopoverContent>
//                 </Popover>
//               )}

//               {/* Desktop Profile Avatar */}
//               <Popover>
//                 <PopoverTrigger asChild>
//                   <Avatar className="cursor-pointer h-9 w-9">
//                     <AvatarImage src={user?.profile?.profilePhoto || "https://github.com/shadcn.png"} />
//                     <AvatarFallback className="bg-[#6A38C2] text-white text-sm">{user?.fullname?.charAt(0)?.toUpperCase()}</AvatarFallback>
//                   </Avatar>
//                 </PopoverTrigger>
//                 <PopoverContent className="w-80">
//                   <div className='flex gap-4'>
//                     <Avatar className="cursor-pointer h-10 w-10">
//                       <AvatarImage src={user?.profile?.profilePhoto || "https://github.com/shadcn.png"} />
//                       <AvatarFallback className="bg-[#6A38C2] text-white">{user?.fullname?.charAt(0)?.toUpperCase()}</AvatarFallback>
//                     </Avatar>
//                     <div>
//                       <h4 className='font-medium text-gray-900'>{user?.fullname}</h4>
//                       <p className='text-sm text-gray-500'>{user?.profile?.bio || "No bio set"}</p>
//                     </div>
//                   </div>
//                   <div className='flex flex-col text-gray-600 my-4 gap-2'>
//                     {user?.role === 'student' && (
//                       <button className='flex items-center gap-2 text-left text-sm text-slate-700 hover:text-[#6A38C2] hover:bg-gray-50 p-2 rounded-md transition-colors' onClick={profileHandler}>
//                         <User2 size={16} /> View Profile
//                       </button>
//                     )}
//                     <button className='flex items-center gap-2 text-left text-sm text-slate-700 hover:text-red-600 hover:bg-red-50 p-2 rounded-md transition-colors' onClick={logoutHandler}>
//                       <LogOut size={16} /> Logout
//                     </button>
//                   </div>
//                 </PopoverContent>
//               </Popover>
//             </div>
//           )}
//         </div>

//         {/* Mobile Right Section (Always visible on mobile, hidden on desktop) */}
//         <div className='flex items-center gap-1 md:hidden'>
//           {user && user.role === 'student' && (
//             <Popover>
//               <PopoverTrigger asChild>
//                 <Button variant="ghost" size="icon" className="relative cursor-pointer">
//                   <Bell size={22} className="text-gray-600" />
//                   {unreadCount > 0 && (
//                     <span className='absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-red-500 text-[10px] font-bold text-white'>
//                       {unreadCount}
//                     </span>
//                   )}
//                 </Button>
//               </PopoverTrigger>
//               <PopoverContent className="w-80 p-0">
//                 <div className='p-3 border-b flex justify-between items-center'>
//                   <h3 className='font-bold text-gray-900'>Notifications</h3>
//                   {unreadCount > 0 && (
//                     <button onClick={markAsRead} className='text-xs text-indigo-600 hover:underline flex items-center gap-1'>
//                       <CheckCircle size={12} /> Mark all read
//                     </button>
//                   )}
//                 </div>
//                 <div className='max-h-[300px] overflow-y-auto divide-y'>
//                   {notifications.length === 0 ? (
//                     <p className='p-4 text-sm text-gray-500 text-center'>No notifications yet</p>
//                   ) : (
//                     notifications.map((notif, idx) => (
//                       <div key={idx} className={`p-3 hover:bg-gray-50 transition-colors ${!notif.read ? 'bg-indigo-50/50' : ''}`}>
//                         <p className='text-sm text-gray-800'>{notif.message}</p>
//                         <p className='text-xs text-gray-400 mt-1'>
//                           {new Date(notif.createdAt || Date.now()).toLocaleString()}
//                         </p>
//                       </div>
//                     ))
//                   )}
//                 </div>
//               </PopoverContent>
//             </Popover>
//           )}
          
//           {user && (
//              <Button variant="ghost" size="icon" onClick={profileHandler} className="cursor-pointer">
//                <Avatar className="h-8 w-8">
//                  <AvatarImage src={user?.profile?.profilePhoto || "https://github.com/shadcn.png"} />
//                  <AvatarFallback className="bg-[#6A38C2] text-white text-xs">{user?.fullname?.charAt(0)?.toUpperCase()}</AvatarFallback>
//                </Avatar>
//              </Button>
//           )}

//           <Button variant="ghost" size="icon" onClick={() => setMobileOpen(prev => !prev)}>
//             {mobileOpen ? <X size={24} /> : <Menu size={24} />}
//           </Button>
//         </div>
//       </div>

//       {/* Mobile Menu Dropdown */}
//       {mobileOpen && (
//         <div className='md:hidden absolute top-16 left-0 right-0 bg-white border-b shadow-lg z-40 p-4 space-y-4'>
//           <ul className='flex flex-col gap-2 text-base text-slate-800'>
//             {navLinks.map(link => (
//               <li key={link.label}>
//                 <Link to={link.to} className='block rounded-lg px-3 py-2 hover:bg-gray-100 transition-colors' onClick={() => setMobileOpen(false)}>
//                   {link.label}
//                 </Link>
//               </li>
//             ))}
//           </ul>
          
//           <div className='border-t pt-4'>
//             {!user ? (
//               <div className='flex flex-col gap-3'>
//                 <Link to='/login' className='block' onClick={() => setMobileOpen(false)}><Button variant="outline" className="w-full">Login</Button></Link>
//                 <Link to='/signup' className='block' onClick={() => setMobileOpen(false)}><Button className="w-full bg-[#6A38C2] hover:bg-[#5b30a6]">Signup</Button></Link>
//               </div>
//             ) : (
//               <div className='space-y-2'>
//                 {user.role === 'student' && (
//                   <button className='flex w-full items-center gap-2 rounded-lg px-3 py-2 text-left hover:bg-gray-100 transition-colors' onClick={() => { profileHandler(); setMobileOpen(false); }}>
//                     <User2 size={18} /> View Profile
//                   </button>
//                 )}
//                 <button className='flex w-full items-center gap-2 rounded-lg px-3 py-2 text-left text-red-600 hover:bg-red-50 transition-colors' onClick={() => { logoutHandler(); setMobileOpen(false); }}>
//                   <LogOut size={18} /> Logout
//                 </button>
//               </div>
//             )}
//           </div>
//         </div>
//       )}
//     </nav>
//   );
// }
import useGetUser from '../../hooks/useGetUser'; // ■ NEW IMPORT
import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover';
import { LogOut, User2, Menu, X, Bell, CheckCircle } from "lucide-react";
import { Button } from '../ui/button';
import { Avatar, AvatarImage, AvatarFallback } from '../ui/avatar';
import axios from 'axios';
import toast from 'react-hot-toast';
import { setUserSlice } from '../../redux/userSlice';

export default function Navebar() {
  const dispatch = useDispatch();
  const user = useSelector(Store => Store?.user?.user);
  const navigate = useNavigate();
  const [mobileOpen, setMobileOpen] = useState(false);

  // ■ NEW: Fetch fresh user data (with latest notifications) on mount/refresh!
  useGetUser(); 

  // Notification State
  const [notifications, setNotifications] = useState([]);
  const [unreadCount, setUnreadCount] = useState(0);

  // Sync Notifications from Redux
  useEffect(() => {
    if (user?.notifications) {
      setNotifications(user.notifications.slice().reverse());
      setUnreadCount(user.notifications.filter(n => !n.read).length);
    }
  }, [user]);

  const profileHandler = () => {
    navigate('/profile');
  };

    const logoutHandler = async () => {
    try {
      const res = await axios.get("http://localhost:8000/user/logout", {
        headers: { "Content-Type": 'application/json' },
        withCredentials: true
      });
      if (res?.data?.success) {
        toast.success(res?.data?.message);
        dispatch(setUserSlice(null));
        // ■■■ CRITICAL FIX: Clear all persisted Redux data on logout! ■■■
        dispatch({ type: 'job/clearAllJobData' });
        dispatch({ type: 'company/clearAllCompanyData' });
        navigate('/');
      }
    } catch (error) {
      const mes_err = error?.response?.data?.message || `Logout failed`;
      toast.error(mes_err);
    }
  };

  const markAsRead = async () => {
    try {
      await axios.post('http://localhost:8000/api/v1/user/notifications/read', {}, { withCredentials: true });
      setUnreadCount(0);
      dispatch(setUserSlice({ ...user, notifications: user.notifications.map(n => ({ ...n, read: true })) }));
    } catch (error) {
      console.log("Mark read error:", error);
    }
  };

  // ■ UPDATED: Removed 'Jobs' link for students
  const navLinks = user && user.role === 'recruiter'
    ? [
      { label: 'Companies', to: '/admin/companies' },
      { label: 'Jobs', to: '/admin/jobs' }
    ]
    : [
      { label: 'Home', to: '/' },
      { label: 'Browse', to: '/browse' }
    ];

  return (
    <nav className='bg-white font-bold px-4 md:px-8 lg:px-12 h-16 shadow-sm sticky top-0 z-50'>
      <div className='max-w-7xl mx-auto h-full flex items-center justify-between'>
        {/* Logo */}
        <Link to='/' className='text-2xl text-black font-bold shrink-0'>
          job<span className='text-[#6A38C2]'>Portal</span>
        </Link>

        {/* Desktop Navigation */}
        <div className='hidden md:flex items-center gap-8'>
          <ul className='flex items-center gap-6 text-base text-slate-800'>
            {navLinks.map(link => (
              <li key={link.label} className='hover:text-[#6A38C2] transition-colors cursor-pointer'>
                <Link to={link.to}>{link.label}</Link>
              </li>
            ))}
          </ul>

          {!user ? (
            <div className='flex items-center gap-3'>
              <Link to='/login'><Button variant="outline" className="cursor-pointer">Login</Button></Link>
              <Link to='/signup'><Button className="bg-[#6A38C2] hover:bg-[#5b30a6] cursor-pointer">Signup</Button></Link>
            </div>
          ) : (
            <div className='flex items-center gap-4'>
              {/* Notification Bell (Students Only) */}
              {user.role === 'student' && (
                <Popover>
                  <PopoverTrigger asChild>
                    <Button variant="ghost" size="icon" className="relative cursor-pointer">
                      <Bell size={20} className="text-gray-600" />
                      {unreadCount > 0 && (
                        <span className='absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-red-500 text-[10px] font-bold text-white'>
                          {unreadCount}
                        </span>
                      )}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-80 p-0">
                    <div className='p-3 border-b flex justify-between items-center'>
                      <h3 className='font-bold text-gray-900'>Notifications</h3>
                      {unreadCount > 0 && (
                        <button onClick={markAsRead} className='text-xs text-indigo-600 hover:underline flex items-center gap-1'>
                          <CheckCircle size={12} /> Mark all read
                        </button>
                      )}
                    </div>
                    <div className='max-h-[300px] overflow-y-auto divide-y'>
                      {notifications.length === 0 ? (
                        <p className='p-4 text-sm text-gray-500 text-center'>No notifications yet</p>
                      ) : (
                        notifications.map((notif, idx) => (
                          <div key={idx} className={`p-3 hover:bg-gray-50 transition-colors ${!notif.read ? 'bg-indigo-50/50' : ''}`}>
                            <p className='text-sm text-gray-800'>{notif.message}</p>
                            <p className='text-xs text-gray-400 mt-1'>
                              {new Date(notif.createdAt || Date.now()).toLocaleString()}
                            </p>
                          </div>
                        ))
                      )}
                    </div>
                  </PopoverContent>
                </Popover>
              )}

              {/* Profile Avatar (Both Students & Recruiters) */}
              <Popover>
                <PopoverTrigger asChild>
                  <Avatar className="cursor-pointer h-9 w-9">
                    <AvatarImage src={user?.profile?.profilePhoto || "https://github.com/shadcn.png"} />
                    <AvatarFallback className="bg-[#6A38C2] text-white text-sm">{user?.fullname?.charAt(0)?.toUpperCase()}</AvatarFallback>
                  </Avatar>
                </PopoverTrigger>
                <PopoverContent className="w-80">
                  <div className='flex gap-4'>
                    <Avatar className="cursor-pointer h-10 w-10">
                      <AvatarImage src={user?.profile?.profilePhoto || "https://github.com/shadcn.png"} />
                      <AvatarFallback className="bg-[#6A38C2] text-white">{user?.fullname?.charAt(0)?.toUpperCase()}</AvatarFallback>
                    </Avatar>
                    <div>
                      <h4 className='font-medium text-gray-900'>{user?.fullname}</h4>
                      <p className='text-sm text-gray-500'>{user?.profile?.bio || "No bio set"}</p>
                    </div>
                  </div>
                  <div className='flex flex-col text-gray-600 my-4 gap-2'>
                    <button className='flex items-center gap-2 text-left text-sm text-slate-700 hover:text-[#6A38C2] hover:bg-gray-50 p-2 rounded-md transition-colors' onClick={profileHandler}>
                      <User2 size={16} /> View Profile
                    </button>
                    <button className='flex items-center gap-2 text-left text-sm text-slate-700 hover:text-red-600 hover:bg-red-50 p-2 rounded-md transition-colors' onClick={logoutHandler}>
                      <LogOut size={16} /> Logout
                    </button>
                  </div>
                </PopoverContent>
              </Popover>
            </div>
          )}
        </div>

        {/* Mobile Right Section (Always visible on mobile, hidden on desktop) */}
        <div className='flex items-center gap-1 md:hidden'>
          {user && user.role === 'student' && (
            <Popover>
              <PopoverTrigger asChild>
                <Button variant="ghost" size="icon" className="relative cursor-pointer">
                  <Bell size={22} className="text-gray-600" />
                  {unreadCount > 0 && (
                    <span className='absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-red-500 text-[10px] font-bold text-white'>
                      {unreadCount}
                    </span>
                  )}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-80 p-0">
                <div className='p-3 border-b flex justify-between items-center'>
                  <h3 className='font-bold text-gray-900'>Notifications</h3>
                  {unreadCount > 0 && (
                    <button onClick={markAsRead} className='text-xs text-indigo-600 hover:underline flex items-center gap-1'>
                      <CheckCircle size={12} /> Mark all read
                    </button>
                  )}
                </div>
                <div className='max-h-[300px] overflow-y-auto divide-y'>
                  {notifications.length === 0 ? (
                    <p className='p-4 text-sm text-gray-500 text-center'>No notifications yet</p>
                  ) : (
                    notifications.map((notif, idx) => (
                      <div key={idx} className={`p-3 hover:bg-gray-50 transition-colors ${!notif.read ? 'bg-indigo-50/50' : ''}`}>
                        <p className='text-sm text-gray-800'>{notif.message}</p>
                        <p className='text-xs text-gray-400 mt-1'>
                          {new Date(notif.createdAt || Date.now()).toLocaleString()}
                        </p>
                      </div>
                    ))
                  )}
                </div>
              </PopoverContent>
            </Popover>
          )}
          
          {user && (
             <Button variant="ghost" size="icon" onClick={profileHandler} className="cursor-pointer">
               <Avatar className="h-8 w-8">
                 <AvatarImage src={user?.profile?.profilePhoto || "https://github.com/shadcn.png"} />
                 <AvatarFallback className="bg-[#6A38C2] text-white text-xs">{user?.fullname?.charAt(0)?.toUpperCase()}</AvatarFallback>
               </Avatar>
             </Button>
          )}

          <Button variant="ghost" size="icon" onClick={() => setMobileOpen(prev => !prev)}>
            {mobileOpen ? <X size={24} /> : <Menu size={24} />}
          </Button>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileOpen && (
        <div className='md:hidden absolute top-16 left-0 right-0 bg-white border-b shadow-lg z-40 p-4 space-y-4'>
          <ul className='flex flex-col gap-2 text-base text-slate-800'>
            {navLinks.map(link => (
              <li key={link.label}>
                <Link to={link.to} className='block rounded-lg px-3 py-2 hover:bg-gray-100 transition-colors' onClick={() => setMobileOpen(false)}>
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
          
          <div className='border-t pt-4'>
            {!user ? (
              <div className='flex flex-col gap-3'>
                <Link to='/login' className='block' onClick={() => setMobileOpen(false)}><Button variant="outline" className="w-full">Login</Button></Link>
                <Link to='/signup' className='block' onClick={() => setMobileOpen(false)}><Button className="w-full bg-[#6A38C2] hover:bg-[#5b30a6]">Signup</Button></Link>
              </div>
            ) : (
              <div className='space-y-2'>
                <button className='flex w-full items-center gap-2 rounded-lg px-3 py-2 text-left hover:bg-gray-100 transition-colors' onClick={() => { profileHandler(); setMobileOpen(false); }}>
                  <User2 size={18} /> View Profile
                </button>
                <button className='flex w-full items-center gap-2 rounded-lg px-3 py-2 text-left text-red-600 hover:bg-red-50 transition-colors' onClick={() => { logoutHandler(); setMobileOpen(false); }}>
                  <LogOut size={18} /> Logout
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}