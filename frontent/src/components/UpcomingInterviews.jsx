
// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import { Calendar, MapPin, Download, User, ExternalLink } from 'lucide-react';
// import { Button } from './ui/button';
// import { useSelector } from 'react-redux';
// const generateGoogleCalendarLink = (interview) => {
//   const pad = (num) => (num < 10 ? '0' + num : num);
//   const dtStart = new Date(interview.scheduledAt);
//   const dtEnd = new Date(dtStart.getTime() + 60 * 60 * 1000);
//   const formatDT = (date) => `${date.getUTCFullYear()}${pad(date.getUTCMonth() + 1)}${pad(date.getUTCDate())}T${pad(date.getUTCHours())}${pad(date.getUTCMinutes())}00Z`;
//   const baseUrl = "https://calendar.google.com/calendar/render?action=TEMPLATE";
//   const title = `&text=${encodeURIComponent(`Interview for ${interview.job?.title || 'Job'}`)}`;
//   const dates = `&dates=${formatDT(dtStart)}/${formatDT(dtEnd)}`;
//   const location = `&location=${encodeURIComponent(interview.location || 'N/A')}`;
//   const details = `&details=${encodeURIComponent(interview.notes || 'No notes provided')}`;
//   return `${baseUrl}${title}${dates}${location}${details}`;
// };

// const generateICS = (interview) => {
//   const pad = (num) => (num < 10 ? '0' + num : num);
//   const dtStart = new Date(interview.scheduledAt);
//   const dtEnd = new Date(dtStart.getTime() + 60 * 60 * 1000);
//   const formatDT = (date) => `${date.getUTCFullYear()}${pad(date.getUTCMonth() + 1)}${pad(date.getUTCDate())}T${pad(date.getUTCHours())}${pad(date.getUTCMinutes())}00Z`;
//   return ['BEGIN:VCALENDAR', 'VERSION:2.0', 'BEGIN:VEVENT', `DTSTART:${formatDT(dtStart)}`, `DTEND:${formatDT(dtEnd)}`, `SUMMARY:Interview for ${interview.job?.title || 'Job'}`, `LOCATION:${interview.location || 'N/A'}`, `DESCRIPTION:${interview.notes || 'No notes provided'}`, 'END:VEVENT', 'END:VCALENDAR'].join('\r\n');
// };

// const downloadICS = (interview) => {
//   const icsString = generateICS(interview);
//   const blob = new Blob([icsString], { type: 'text/calendar;charset=utf-8;' });
//   const url = URL.createObjectURL(blob);
//   const link = document.createElement('a');
//   link.setAttribute('href', url);
//   link.setAttribute('download', `Interview_${interview.job?.title || 'Schedule'}.ics`);
//   document.body.appendChild(link);
//   link.click();
//   document.body.removeChild(link);
// };

// export default function UpcomingInterviews() {
//   const [interviews, setInterviews] = useState([]);

//   const { interviewUpdateFlag } = useSelector(store => store?.user);

//   useEffect(() => {
//     const fetchInterviews = async () => {
//       try {
//         const res = await axios.get('http://localhost:8000/api/v1/interview/get', { withCredentials: true });
//         if (res.data.success) setInterviews(res.data.interviews);
//       } catch (error) {
//         console.log("Fetch interviews error:", error);
//       }
//     };
//     fetchInterviews();
//   }, [interviewUpdateFlag]); // ■ Re-fetch when a new interview is scheduled!
//   if (interviews.length === 0) return null;

//   return (
//     <div className='bg-white rounded-2xl shadow-sm p-6 border border-gray-200 mt-8'>
//       <h2 className='font-bold text-xl text-gray-900 mb-5 flex items-center gap-2'>
//         <Calendar className='text-indigo-600' size={22} /> Upcoming Interviews
//       </h2>
//       <div className='space-y-4'>
//         {interviews.map((interview) => (
//           <div key={interview._id} className='p-4 border border-indigo-100 bg-indigo-50/50 rounded-xl flex flex-col sm:flex-row gap-4'>
//             <div className='flex-1'>
//               <h3 className='font-bold text-gray-900'>{interview.job?.title}</h3>
//               <p className='text-sm text-gray-500 mt-1 flex items-center gap-1'><User size={14} /> Interviewer: {interview.recruiter?.fullname}</p>
//               <p className='text-sm text-gray-600 mt-1 flex items-center gap-1'><Calendar size={14} /> {new Date(interview.scheduledAt).toLocaleString()}</p>
//               {interview.location && (
//                 <p className='text-sm text-gray-600 mt-1 flex items-center gap-1 truncate'><MapPin size={14} /> {interview.location}</p>
//               )}
//             </div>

//             <div className='flex flex-row sm:flex-col gap-2 shrink-0'>
//               <a href={generateGoogleCalendarLink(interview)} target="_blank" rel="noopener noreferrer" className="flex-1 sm:flex-none">
//                 <Button className="bg-indigo-600 hover:bg-indigo-700 text-white w-full text-sm py-2">
//                   <ExternalLink size={14} className='mr-1'/> Google
//                 </Button>
//               </a>
//               <Button variant="outline" className="flex-1 sm:flex-none border-gray-300 text-gray-600 hover:bg-gray-50 w-full text-sm py-2" onClick={() => downloadICS(interview)}>
//                 <Download size={14} className='mr-1'/> .ics
//               </Button>
//             </div>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// }
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Calendar, MapPin, Download, User, ExternalLink } from 'lucide-react';
import { Button } from './ui/button';
import { useSelector } from 'react-redux'; // ■ Required to get the flag

const generateGoogleCalendarLink = (interview) => {
  const pad = (num) => (num < 10 ? '0' + num : num);
  const dtStart = new Date(interview.scheduledAt);
  const dtEnd = new Date(dtStart.getTime() + 60 * 60 * 1000);
  const formatDT = (date) => `${date.getUTCFullYear()}${pad(date.getUTCMonth() + 1)}${pad(date.getUTCDate())}T${pad(date.getUTCHours())}${pad(date.getUTCMinutes())}00Z`;
  const baseUrl = "https://calendar.google.com/calendar/render?action=TEMPLATE";
  const title = `&text=${encodeURIComponent(`Interview for ${interview.job?.title || 'Job'}`)}`;
  const dates = `&dates=${formatDT(dtStart)}/${formatDT(dtEnd)}`;
  const location = `&location=${encodeURIComponent(interview.location || 'N/A')}`;
  const details = `&details=${encodeURIComponent(interview.notes || 'No notes provided')}`;
  return `${baseUrl}${title}${dates}${location}${details}`;
};

const generateICS = (interview) => {
  const pad = (num) => (num < 10 ? '0' + num : num);
  const dtStart = new Date(interview.scheduledAt);
  const dtEnd = new Date(dtStart.getTime() + 60 * 60 * 1000);
  const formatDT = (date) => `${date.getUTCFullYear()}${pad(date.getUTCMonth() + 1)}${pad(date.getUTCDate())}T${pad(date.getUTCHours())}${pad(date.getUTCMinutes())}00Z`;
  return ['BEGIN:VCALENDAR', 'VERSION:2.0', 'BEGIN:VEVENT', `DTSTART:${formatDT(dtStart)}`, `DTEND:${formatDT(dtEnd)}`, `SUMMARY:Interview for ${interview.job?.title || 'Job'}`, `LOCATION:${interview.location || 'N/A'}`, `DESCRIPTION:${interview.notes || 'No notes provided'}`, 'END:VEVENT', 'END:VCALENDAR'].join('\r\n');
};

const downloadICS = (interview) => {
  const icsString = generateICS(interview);
  const blob = new Blob([icsString], { type: 'text/calendar;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.setAttribute('href', url);
  link.setAttribute('download', `Interview_${interview.job?.title || 'Schedule'}.ics`);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};

export default function UpcomingInterviews() {
  const [interviews, setInterviews] = useState([]);
  // ■ NEW: Get the flag from Redux so we know when to refetch!
  const { interviewUpdateFlag } = useSelector(store => store?.user);

  useEffect(() => {
    const fetchInterviews = async () => {
      try {
        const res = await axios.get('http://localhost:8000/api/v1/interview/get', { withCredentials: true });
        if (res.data.success) setInterviews(res.data.interviews);
      } catch (error) {
        console.log("Fetch interviews error:", error);
      }
    };
    fetchInterviews();
  }, [interviewUpdateFlag]); // ■ Triggers refetch when a new interview is scheduled!

  if (interviews.length === 0) return null;

  return (
    <div className='bg-white rounded-2xl shadow-sm p-6 border border-gray-200 mt-8'>
      <h2 className='font-bold text-xl text-gray-900 mb-5 flex items-center gap-2'>
        <Calendar className='text-indigo-600' size={22} /> Upcoming Interviews
      </h2>
      <div className='space-y-4'>
        {interviews.map((interview) => (
          <div key={interview._id} className='p-4 border border-indigo-100 bg-indigo-50/50 rounded-xl flex flex-col sm:flex-row gap-4'>
            <div className='flex-1'>
              <h3 className='font-bold text-gray-900'>{interview.job?.title}</h3>
              <p className='text-sm text-gray-500 mt-1 flex items-center gap-1'><User size={14} /> Interviewer: {interview.recruiter?.fullname}</p>
              <p className='text-sm text-gray-600 mt-1 flex items-center gap-1'><Calendar size={14} /> {new Date(interview.scheduledAt).toLocaleString()}</p>
              {interview.location && (
                <p className='text-sm text-gray-600 mt-1 flex items-center gap-1 truncate'><MapPin size={14} /> {interview.location}</p>
              )}
            </div>

            <div className='flex flex-row sm:flex-col gap-2 shrink-0'>
              <a href={generateGoogleCalendarLink(interview)} target="_blank" rel="noopener noreferrer" className="flex-1 sm:flex-none">
                <Button className="bg-indigo-600 hover:bg-indigo-700 text-white w-full text-sm py-2">
                  <ExternalLink size={14} className='mr-1'/> Google
                </Button>
              </a>
              <Button variant="outline" className="flex-1 sm:flex-none border-gray-300 text-gray-600 hover:bg-gray-50 w-full text-sm py-2" onClick={() => downloadICS(interview)}>
                <Download size={14} className='mr-1'/> .ics
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}