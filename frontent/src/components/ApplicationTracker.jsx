
// import React from 'react';
// import { useSelector } from 'react-redux';
// import { motion } from 'framer-motion';
// import { Avatar, AvatarImage } from './ui/avatar';
// import { CheckCircle2, XCircle, Eye, Briefcase, MessageCircle } from 'lucide-react'; // ■ ADDED MessageCircle
// import { useState } from 'react'; 
// import ViewApplicationDialog from './Admin/ViewApplicationDialog'; 
// import ChatDialog from './shared/ChatDialog'; // ■ NEW IMPORT

// // ■ HELPER: Map backend status to a 4-step visual timeline
// const getSteps = (status) => {
//     const steps = [
//         { name: "Applied", icon: CheckCircle2 },
//         { name: "In Review", icon: Eye },
//         { name: "Interview", icon: Briefcase },
//         { name: "Decision", icon: Briefcase }
//     ];

//     if (status === 'pending') {
//         return [
//             { ...steps[0], state: 'completed' },
//             { ...steps[1], state: 'current' },
//             { ...steps[2], state: 'upcoming' },
//             { ...steps[3], state: 'upcoming' }
//         ];
//     }
//     if (status === 'interview') {
//         return [
//             { ...steps[0], state: 'completed' },
//             { ...steps[1], state: 'completed' },
//             { ...steps[2], state: 'current' },
//             { ...steps[3], state: 'upcoming' }
//         ];
//     }
//     if (status === 'accepted') {
//         return [
//             { ...steps[0], state: 'completed' },
//             { ...steps[1], state: 'completed' },
//             { ...steps[2], state: 'completed' },
//             { ...steps[3], name: "Offered", icon: CheckCircle2, state: 'completed' }
//         ];
//     }
//     if (status === 'rejected') {
//         return [
//             { ...steps[0], state: 'completed' },
//             { ...steps[1], state: 'completed' },
//             { ...steps[2], state: 'failed' },
//             { ...steps[3], name: "Rejected", icon: XCircle, state: 'failed' }
//         ];
//     }
//     return steps.map(s => ({ ...s, state: 'upcoming' }));
// };

// export default function ApplicationTracker() {
//     const appliedJob = useSelector(Store => Store?.jobs?.appliedJob);
//     const [viewAppData, setViewAppData] = useState(null); 
//     const [chatRecipient, setChatRecipient] = useState(null); // ■ NEW STATE FOR CHAT

//     if (!appliedJob || appliedJob.length === 0) {
//         return (
//             <div className='text-center py-10 text-gray-500'>
//                 <Briefcase size={48} className='mx-auto mb-3 text-gray-300' />
//                 <h3 className='text-xl font-bold text-gray-800 mb-1'>No Applications Yet</h3>
//                 <p className='text-sm'>Start applying to jobs to track your progress here!</p>
//             </div>
//         );
//     }

//     const containerVariants = {
//         hidden: { opacity: 0 },
//         visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
//     };

//     const itemVariants = {
//         hidden: { opacity: 0, y: 20 },
//         visible: { opacity: 1, y: 0 }
//     };

//     return (
//         <>
//             <motion.div 
//                 className='space-y-6'
//                 variants={containerVariants}
//                 initial="hidden"
//                 animate="visible"
//             >
//                 {appliedJob.map((item, index) => {
//                     const steps = getSteps(item.status);
//                     // ■ EXTRACT RECRUITER DATA from the newly populated field
//                     const recruiterId = item?.job?.created_by?._id;
//                     const recruiterName = item?.job?.created_by?.fullname || "Recruiter";

//                     return (
//                         <motion.div 
//                             key={index} 
//                             variants={itemVariants}
//                             className='bg-white border border-gray-100 rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow'
//                         >
//                             {/* Job Header */}
//                             <div className='flex items-center justify-between mb-6'>
//                                 <div className='flex items-center gap-4'>
//                                     <Avatar className="h-12 w-12 rounded-lg border">
//                                         <AvatarImage src={item?.job?.company?.logo || "https://github.com/shadcn.png"} />
//                                     </Avatar>
//                                     <div>
//                                         <h3 className='font-bold text-gray-900 text-lg'>{item?.job?.title || "Unknown Job"}</h3>
//                                         <p className='text-sm text-gray-500'>{item?.job?.company?.name || "Unknown Company"}</p>
//                                     </div>
//                                 </div>
//                                 <div className='text-right'>
//                                     <p className='text-xs text-gray-400'>Applied on</p>
//                                     <p className='text-sm font-medium text-gray-600'>{new Date(item?.createdAt).toLocaleDateString()}</p>
                                    
//                                     <div className="flex items-center gap-3 justify-end mt-1">
//                                         {/* View Submitted Details */}
//                                         {item?.applicationData && (
//                                             <button 
//                                                 onClick={() => setViewAppData(item.applicationData)}
//                                                 className="text-xs text-indigo-600 hover:underline flex items-center gap-1"
//                                             >
//                                                 <Eye size={12}/> View Details
//                                             </button>
//                                         )}

//                                         {/* ■ NEW: Message Recruiter Button */}
//                                         {recruiterId && (
//                                             <button 
//                                                 onClick={() => setChatRecipient({ id: recruiterId, name: recruiterName, jobId: item?.job?._id })}
//                                                 className="text-xs text-green-600 hover:underline flex items-center gap-1"
//                                             >
//                                                 <MessageCircle size={12}/> Message
//                                             </button>
//                                         )}
//                                     </div>
//                                 </div>
//                             </div>

//                             {/* The Visual Timeline Stepper */}
//                             <div className='flex items-center justify-between relative'>
//                                 <div className='absolute top-5 left-0 w-full h-0.5 bg-gray-200 z-0'></div>

//                                 {steps.map((step, idx) => {
//                                     const Icon = step.icon;
                                    
//                                     const circleStyles = {
//                                         completed: "bg-green-500 text-white border-green-500",
//                                         current: "bg-white text-indigo-600 border-indigo-500 ring-4 ring-indigo-100",
//                                         failed: "bg-red-500 text-white border-red-500",
//                                         upcoming: "bg-white text-gray-400 border-gray-300"
//                                     };
                                    
//                                     const textStyles = {
//                                         completed: "text-green-600",
//                                         current: "text-indigo-600 font-bold",
//                                         failed: "text-red-600",
//                                         upcoming: "text-gray-400"
//                                     };

//                                     const lineStyle = {
//                                         completed: "bg-green-500",
//                                         current: "bg-indigo-500",
//                                         failed: "bg-red-500",
//                                         upcoming: "bg-gray-200"
//                                     };

//                                     return (
//                                         <div key={idx} className='relative z-10 flex flex-col items-center w-1/4'>
//                                             <div className={`w-10 h-10 rounded-full border-2 flex items-center justify-center transition-all duration-500 ${circleStyles[step.state]}`}>
//                                                 <Icon size={18} />
//                                             </div>
//                                             <p className={`mt-2 text-xs text-center ${textStyles[step.state]}`}>
//                                                 {step.name}
//                                             </p>
                                            
//                                             {idx < steps.length - 1 && step.state !== 'upcoming' && (
//                                                 <div className={`absolute top-5 left-1/2 w-full h-0.5 z-[-1] ${lineStyle[step.state]}`}></div>
//                                             )}
//                                         </div>
//                                     );
//                                 })}
//                             </div>
//                         </motion.div>
//                     );
//                 })}
//             </motion.div>

//             {/* VIEW APPLICATION SNAPSHOT DIALOG */}
//             {viewAppData && (
//                 <ViewApplicationDialog 
//                     open={!!viewAppData} 
//                     setOpen={() => setViewAppData(null)}
//                     applicationData={viewAppData}
//                 />
//             )}

//             {/* ■■■ REAL-TIME CHAT DIALOG ■■■ */}
//             {chatRecipient && (
//                 <ChatDialog 
//                     open={!!chatRecipient} 
//                     setOpen={() => setChatRecipient(null)}
//                     receiverId={chatRecipient.id}
//                     receiverName={chatRecipient.name}
//                     jobId={chatRecipient.jobId}
//                 />
//             )}
//         </>
//     );
// }
import React from 'react';
import { useSelector } from 'react-redux';
import { motion } from 'framer-motion';
import { Avatar, AvatarImage } from './ui/avatar';
import { CheckCircle2, XCircle, Eye, Briefcase, MessageCircle } from 'lucide-react';
import { useState } from 'react';
import ViewApplicationDialog from './Admin/ViewApplicationDialog';
import ChatDialog from './shared/ChatDialog';

const getSteps = (status) => {
  const steps = [
    { name: "Applied", icon: CheckCircle2 },
    { name: "In Review", icon: Eye },
    { name: "Interview", icon: Briefcase },
    { name: "Decision", icon: Briefcase }
  ];
  if (status === 'pending') return [{ ...steps[0], state: 'completed' }, { ...steps[1], state: 'current' }, { ...steps[2], state: 'upcoming' }, { ...steps[3], state: 'upcoming' }];
  if (status === 'interview') return [{ ...steps[0], state: 'completed' }, { ...steps[1], state: 'completed' }, { ...steps[2], state: 'current' }, { ...steps[3], state: 'upcoming' }];
  if (status === 'accepted') return [{ ...steps[0], state: 'completed' }, { ...steps[1], state: 'completed' }, { ...steps[2], state: 'completed' }, { ...steps[3], name: "Offered", icon: CheckCircle2, state: 'completed' }];
  if (status === 'rejected') return [{ ...steps[0], state: 'completed' }, { ...steps[1], state: 'completed' }, { ...steps[2], state: 'failed' }, { ...steps[3], name: "Rejected", icon: XCircle, state: 'failed' }];
  return steps.map(s => ({ ...s, state: 'upcoming' }));
};

export default function ApplicationTracker() {
  const appliedJob = useSelector(Store => Store?.jobs?.appliedJob);
  const [viewAppData, setViewAppData] = useState(null);
  const [chatRecipient, setChatRecipient] = useState(null);

  if (!appliedJob || appliedJob.length === 0) {
    return (
      <div className='text-center py-10 text-gray-500'>
        <Briefcase size={48} className='mx-auto mb-3 text-gray-300' />
        <h3 className='text-xl font-bold text-gray-800 mb-1'>No Applications Yet</h3>
        <p className='text-sm'>Start applying to jobs to track your progress here!</p>
      </div>
    );
  }

  const containerVariants = { hidden: { opacity: 0 }, visible: { opacity: 1, transition: { staggerChildren: 0.1 } } };
  const itemVariants = { hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } };

  return (
    <>
      <motion.div className='space-y-6' variants={containerVariants} initial="hidden" animate="visible">
        {appliedJob.map((item, index) => {
          const steps = getSteps(item.status);
          const recruiterId = item?.job?.created_by?._id;
          const recruiterName = item?.job?.created_by?.fullname || "Recruiter";

          return (
            <motion.div key={index} variants={itemVariants} className='bg-white border border-gray-100 rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow'>
              <div className='flex flex-col sm:flex-row items-start sm:items-center justify-between mb-6 gap-4'>
                <div className='flex items-center gap-4'>
                  <Avatar className="h-12 w-12 rounded-lg border shrink-0">
                    <AvatarImage src={item?.job?.company?.logo || "https://github.com/shadcn.png"} />
                  </Avatar>
                  <div>
                    <h3 className='font-bold text-gray-900 text-lg'>{item?.job?.title || "Unknown Job"}</h3>
                    <p className='text-sm text-gray-500'>{item?.job?.company?.name || "Unknown Company"}</p>
                  </div>
                </div>
                <div className='text-left sm:text-right flex flex-col items-start sm:items-end gap-1'>
                  <p className='text-xs text-gray-400'>Applied on {new Date(item?.createdAt).toLocaleDateString()}</p>
                  <div className="flex items-center gap-3">
                    {item?.applicationData && (
                      <button onClick={() => setViewAppData(item.applicationData)} className="text-xs text-indigo-600 hover:underline flex items-center gap-1">
                        <Eye size={12}/> View Details
                      </button>
                    )}
                    {recruiterId && (
                      <button onClick={() => setChatRecipient({ id: recruiterId, name: recruiterName, jobId: item?.job?._id })} className="text-xs text-green-600 hover:underline flex items-center gap-1">
                        <MessageCircle size={12}/> Message
                      </button>
                    )}
                  </div>
                </div>
              </div>

              {/* The Visual Timeline Stepper */}
              <div className='flex items-center justify-between relative px-2'>
                <div className='absolute top-5 left-2 right-2 h-0.5 bg-gray-200 z-0'></div>
                {steps.map((step, idx) => {
                  const Icon = step.icon;
                  const circleStyles = {
                    completed: "bg-green-500 text-white border-green-500",
                    current: "bg-white text-indigo-600 border-indigo-500 ring-4 ring-indigo-100",
                    failed: "bg-red-500 text-white border-red-500",
                    upcoming: "bg-white text-gray-400 border-gray-300"
                  };
                  const textStyles = { completed: "text-green-600", current: "text-indigo-600 font-bold", failed: "text-red-600", upcoming: "text-gray-400" };

                  return (
                    <div key={idx} className='relative z-10 flex flex-col items-center flex-1 min-w-0'>
                      <div className={`w-10 h-10 rounded-full border-2 flex items-center justify-center mb-2 ${circleStyles[step.state]}`}>
                        <Icon size={18} />
                      </div>
                      <p className={`mt-0 text-xs text-center truncate w-full ${textStyles[step.state]}`}>
                        {step.name}
                      </p>
                    </div>
                  );
                })}
              </div>
            </motion.div>
          );
        })}
      </motion.div>

      {viewAppData && (<ViewApplicationDialog open={!!viewAppData} setOpen={() => setViewAppData(null)} applicationData={viewAppData} />)}
      {chatRecipient && (<ChatDialog open={!!chatRecipient} setOpen={() => setChatRecipient(null)} receiverId={chatRecipient.id} receiverName={chatRecipient.name} jobId={chatRecipient.jobId} />)}
    </>
  );
}