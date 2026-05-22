// import CustomEmailDialog from './CustomEmailDialog'; // ■ NEW
// import { Mail } from 'lucide-react'; // ■ NEW ICON
// import React, { useState } from 'react';
// import { DragDropContext, Droppable, Draggable } from '@hello-pangea/dnd';
// import { useSelector } from 'react-redux';
// import axios from 'axios';
// import { APPLICATION_API_END_POINT } from '../../utils/constant';
// import { Avatar, AvatarImage } from '@/components/ui/avatar';
// import toast from 'react-hot-toast';
// import { GripVertical, ExternalLink, CalendarPlus, MessageCircle, Eye } from 'lucide-react';
// import ScheduleInterviewDialog from './ScheduleInterviewDialog';
// import ChatDialog from '../shared/ChatDialog';
// import ViewApplicationDialog from './ViewApplicationDialog';

// const ApplicantsTable = () => {
//     const { applicants } = useSelector(store => store.application);
//     const [scheduleApplicant, setScheduleApplicant] = useState(null);
//     const [chatApplicant, setChatApplicant] = useState(null);
//     const [viewAppData, setViewAppData] = useState(null);
//     const [emailApplicant, setEmailApplicant] = useState(null); // ■ NEW STATE
//     // ■ UPDATED: Added 'interview' column
//     const [columns, setColumns] = useState({
//         pending: { name: "Pending", items: applicants?.application?.filter(a => a.status === 'pending') || [] },
//         accepted: { name: "Accepted", items: applicants?.application?.filter(a => a.status === 'accepted') || [] },
//         interview: { name: "Interview", items: applicants?.application?.filter(a => a.status === 'interview') || [] }, // ■ NEW
//         rejected: { name: "Rejected", items: applicants?.application?.filter(a => a.status === 'rejected') || [] }
//     });

//     React.useEffect(() => {
//         if (applicants?.application) {
//             setColumns({
//                 pending: { name: "Pending", items: applicants.application.filter(a => a.status === 'pending') },
//                 accepted: { name: "Accepted", items: applicants.application.filter(a => a.status === 'accepted') },
//                 interview: { name: "Interview", items: applicants.application.filter(a => a.status === 'interview') }, // ■ NEW
//                 rejected: { name: "Rejected", items: applicants.application.filter(a => a.status === 'rejected') }
//             });
//         }
//     }, [applicants]);

//     const onDragEnd = async (result) => {
//         if (!result.destination) return;
//         const { source, destination } = result;
//         if (source.droppableId === destination.droppableId && source.index === destination.index) return;

//         const sourceCol = columns[source.droppableId];
//         const destCol = columns[destination.droppableId];

//         if (sourceCol === destCol) {
//             const newItems = Array.from(sourceCol.items);
//             const [reorderedItem] = newItems.splice(source.index, 1);
//             newItems.splice(destination.index, 0, reorderedItem);
//             setColumns({ ...columns, [source.droppableId]: { ...sourceCol, items: newItems } });
//             return;
//         }

//         const sourceItems = Array.from(sourceCol.items);
//         const destItems = Array.from(destCol.items);
//         const [movedItem] = sourceItems.splice(source.index, 1);
//         destItems.splice(destination.index, 0, movedItem);

//         const newStatus = destination.droppableId;

//         setColumns({
//             ...columns,
//             [source.droppableId]: { ...sourceCol, items: sourceItems },
//             [destination.droppableId]: { ...destCol, items: destItems }
//         });

//         try {
//             const res = await axios.post(
//                 `${APPLICATION_API_END_POINT}/status/${movedItem._id}/update`,
//                 { status: newStatus },
//                 { headers: { 'Content-Type': 'application/json' }, withCredentials: true }
//             );
//             if (res.data.success) {
//                 toast.success(`Applicant moved to ${newStatus}`);
//             }
//         } catch (error) {
//             toast.error("Failed to update status");
//             setColumns({
//                 ...columns,
//                 [source.droppableId]: { ...sourceCol, items: sourceCol.items },
//                 [destination.droppableId]: { ...destCol, items: destCol.items }
//             });
//         }
//     };

//     // ■ UPDATED: Added blue for interview
//     const getColumnColor = (columnId) => {
//         switch (columnId) {
//             case 'pending': return 'bg-yellow-500';
//             case 'accepted': return 'bg-green-500';
//             case 'interview': return 'bg-blue-500'; // ■ NEW
//             case 'rejected': return 'bg-red-500';
//             default: return 'bg-gray-500';
//         }
//     }

//     return (
//         <div className="relative">
//             <div className="flex gap-4 h-[70vh]"> {/* ■ Changed gap to 4 to fit 4 columns */}
//                 <DragDropContext onDragEnd={onDragEnd}>
//                     {Object.entries(columns).map(([columnId, column]) => (
//                         <div className="flex-1 bg-gray-50 rounded-xl p-4 border" key={columnId}>
//                             <h2 className="font-bold text-lg mb-4 flex items-center gap-2">
//                                 <span className={`w-3 h-3 rounded-full ${getColumnColor(columnId)}`}></span>
//                                 {column.name}
//                                 <span className="text-sm font-normal text-gray-500 ml-auto">{column.items.length}</span>
//                             </h2>

//                             <Droppable droppableId={columnId}>
//                                 {(provided, snapshot) => (
//                                     <div
//                                         ref={provided.innerRef}
//                                         {...provided.droppableProps}
//                                         className={`min-h-[100px] transition-colors duration-200 rounded-lg p-2 ${snapshot.isDraggingOver ? 'bg-indigo-50' : ''
//                                             }`}
//                                     >
//                                         {column.items.map((item, index) => (
//                                             <Draggable key={item._id} draggableId={item._id} index={index}>
//                                                 {(provided, snapshot) => (
//                                                     <div
//                                                         ref={provided.innerRef}
//                                                         {...provided.draggableProps}
//                                                         className={`bg-white p-4 rounded-lg mb-3 border shadow-sm hover:shadow-md transition-all ${snapshot.isDragging ? 'shadow-xl ring-2 ring-indigo-400' : ''
//                                                             }`}
//                                                     >
//                                                         <div className='flex items-start gap-3'>
//                                                             <div {...provided.dragHandleProps} className="mt-1 text-gray-400 hover:text-gray-600 cursor-grab">
//                                                                 <GripVertical size={18} />
//                                                             </div>
//                                                             <div className="flex-1">
//                                                                 <div className='flex items-center gap-2 mb-1'>
//                                                                     <Avatar className="h-8 w-8">
//                                                                         <AvatarImage src={item?.applicant?.profile?.profilePhoto} />
//                                                                     </Avatar>
//                                                                     <h3 className='font-semibold text-gray-900'>{item?.applicant?.fullname}</h3>
//                                                                 </div>
//                                                                 <p className='text-xs text-gray-500 mb-2'>{item?.applicant?.email}</p>

//                                                                 <div className="flex flex-col gap-1">
//                                                                     {item?.applicant?.profile?.resume && (
//                                                                         <a href={item.applicant.profile.resume} target='_blank' rel="noopener noreferrer" className='text-xs text-indigo-600 hover:underline flex items-center gap-1'>
//                                                                             <ExternalLink size={12} /> View Resume
//                                                                         </a>
//                                                                     )}

//                                                                     <button onClick={() => setViewAppData(item.applicationData)} className='text-xs text-gray-600 hover:underline flex items-center gap-1 mt-1'>
//                                                                         <Eye size={12} /> View Application
//                                                                     </button>

//                                                                     <button onClick={() => setChatApplicant(item.applicant)} className='text-xs text-indigo-600 hover:underline flex items-center gap-1 mt-1'>
//                                                                         <MessageCircle size={12} /> Message
//                                                                     </button>
//                                                                     {/* ■ NEW: Send Custom Email Button */}
//                                                                     <button
//                                                                         onClick={() => setEmailApplicant(item)}
//                                                                         className='text-xs text-purple-600 hover:underline flex items-center gap-1 mt-1'
//                                                                     >
//                                                                         <Mail size={12} /> Send Email
//                                                                     </button>
//                                                                     {/* ■ UPDATED: Show Schedule in Accepted OR Interview column */}
//                                                                     {(columnId === 'accepted' || columnId === 'interview') && (
//                                                                         <button onClick={() => setScheduleApplicant(item.applicant)} className='text-xs text-blue-600 hover:underline flex items-center gap-1 mt-1'>
//                                                                             <CalendarPlus size={12} /> Schedule Interview
//                                                                         </button>
//                                                                     )}
//                                                                 </div>
//                                                             </div>
//                                                         </div>
//                                                     </div>
//                                                 )}
//                                             </Draggable>
//                                         ))}
//                                         {provided.placeholder}
//                                     </div>
//                                 )}
//                             </Droppable>
//                         </div>
//                     ))}
//                 </DragDropContext>
//             </div>

//             {scheduleApplicant && (<ScheduleInterviewDialog open={!!scheduleApplicant} setOpen={() => setScheduleApplicant(null)} applicant={scheduleApplicant} jobId={applicants?._id} />)}
//             {chatApplicant && (<ChatDialog open={!!chatApplicant} setOpen={() => setChatApplicant(null)} receiverId={chatApplicant._id} receiverName={chatApplicant.fullname} jobId={applicants?._id} />)}
//             {viewAppData && (<ViewApplicationDialog open={!!viewAppData} setOpen={() => setViewAppData(null)} applicationData={viewAppData} />)}
//              {/* ■ NEW: Custom Email Dialog */}
// {emailApplicant && (
//     <CustomEmailDialog 
//         open={!!emailApplicant} 
//         setOpen={() => setEmailApplicant(null)}
//         applicantEmail={emailApplicant.applicant?.email}
//         applicantName={emailApplicant.applicant?.fullname}
//         jobTitle={applicants?.title}
//         applicationId={emailApplicant._id}
//     />
// )}   
//         </div>
//     );
// }

// export default ApplicantsTable;
import CustomEmailDialog from './CustomEmailDialog';
import { Mail } from 'lucide-react';
import React, { useState } from 'react';
import { DragDropContext, Droppable, Draggable } from '@hello-pangea/dnd';
import { useSelector } from 'react-redux';
import axios from 'axios';
import { APPLICATION_API_END_POINT } from '../../utils/constant';
import { Avatar, AvatarImage } from '@/components/ui/avatar';
import toast from 'react-hot-toast';
import { GripVertical, ExternalLink, CalendarPlus, MessageCircle, Eye } from 'lucide-react';
import ScheduleInterviewDialog from './ScheduleInterviewDialog';
import ChatDialog from '../shared/ChatDialog';
import ViewApplicationDialog from './ViewApplicationDialog';

const ApplicantsTable = () => {
  const { applicants } = useSelector(store => store.application);
  const [scheduleApplicant, setScheduleApplicant] = useState(null);
  const [chatApplicant, setChatApplicant] = useState(null);
  const [viewAppData, setViewAppData] = useState(null);
  const [emailApplicant, setEmailApplicant] = useState(null);

  const [columns, setColumns] = useState({
    pending: { name: "Pending", items: applicants?.application?.filter(a => a.status === 'pending') || [] },
    accepted: { name: "Accepted", items: applicants?.application?.filter(a => a.status === 'accepted') || [] },
    interview: { name: "Interview", items: applicants?.application?.filter(a => a.status === 'interview') || [] },
    rejected: { name: "Rejected", items: applicants?.application?.filter(a => a.status === 'rejected') || [] }
  });

  React.useEffect(() => {
    if (applicants?.application) {
      setColumns({
        pending: { name: "Pending", items: applicants.application.filter(a => a.status === 'pending') },
        accepted: { name: "Accepted", items: applicants.application.filter(a => a.status === 'accepted') },
        interview: { name: "Interview", items: applicants.application.filter(a => a.status === 'interview') },
        rejected: { name: "Rejected", items: applicants.application.filter(a => a.status === 'rejected') }
      });
    }
  }, [applicants]);

  const onDragEnd = async (result) => {
    if (!result.destination) return;
    const { source, destination } = result;
    if (source.droppableId === destination.droppableId && source.index === destination.index) return;

    const sourceCol = columns[source.droppableId];
    const destCol = columns[destination.droppableId];

    if (sourceCol === destCol) {
      const newItems = Array.from(sourceCol.items);
      const [reorderedItem] = newItems.splice(source.index, 1);
      newItems.splice(destination.index, 0, reorderedItem);
      setColumns({ ...columns, [source.droppableId]: { ...sourceCol, items: newItems } });
      return;
    }

    const sourceItems = Array.from(sourceCol.items);
    const destItems = Array.from(destCol.items);
    const [movedItem] = sourceItems.splice(source.index, 1);
    destItems.splice(destination.index, 0, movedItem);
    const newStatus = destination.droppableId;

    setColumns({
      ...columns,
      [source.droppableId]: { ...sourceCol, items: sourceItems },
      [destination.droppableId]: { ...destCol, items: destItems }
    });

    try {
      const res = await axios.post(
        `${APPLICATION_API_END_POINT}/status/${movedItem._id}/update`,
        { status: newStatus },
        { headers: { 'Content-Type': 'application/json' }, withCredentials: true }
      );
      if (res.data.success) {
        toast.success(`Applicant moved to ${newStatus}`);
      }
    } catch (error) {
      toast.error("Failed to update status");
      setColumns({
        ...columns,
        [source.droppableId]: { ...sourceCol, items: sourceCol.items },
        [destination.droppableId]: { ...destCol, items: destCol.items }
      });
    }
  };

  const getColumnColor = (columnId) => {
    switch (columnId) {
      case 'pending': return 'bg-yellow-500';
      case 'accepted': return 'bg-green-500';
      case 'interview': return 'bg-blue-500';
      case 'rejected': return 'bg-red-500';
      default: return 'bg-gray-500';
    }
  }

  return (
    <div className="relative">
      {/* ■ RESPONSIVE KANBAN: Horizontal scroll on mobile, flex on desktop */}
      <div className="flex gap-4 h-[75vh] overflow-x-auto pb-4">
        <DragDropContext onDragEnd={onDragEnd}>
          {Object.entries(columns).map(([columnId, column]) => (
            <div className="flex-shrink-0 w-[280px] md:w-1/4 bg-gray-50 rounded-xl p-4 border flex flex-col" key={columnId}>
              <h2 className="font-bold text-lg mb-4 flex items-center gap-2 shrink-0">
                <span className={`w-3 h-3 rounded-full ${getColumnColor(columnId)}`}></span>
                {column.name}
                <span className="text-sm font-normal text-gray-500 ml-auto">{column.items.length}</span>
              </h2>
              
              <Droppable droppableId={columnId}>
                {(provided, snapshot) => (
                  <div
                    ref={provided.innerRef}
                    {...provided.droppableProps}
                    className={`flex-1 min-h-[100px] transition-colors duration-200 rounded-lg p-2 overflow-y-auto ${snapshot.isDraggingOver ? 'bg-indigo-50' : ''}`}
                  >
                    {column.items.map((item, index) => (
                      <Draggable key={item._id} draggableId={item._id} index={index}>
                        {(provided, snapshot) => (
                          <div
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            className={`bg-white p-4 rounded-lg mb-3 border shadow-sm ${snapshot.isDragging ? 'shadow-lg ring-2 ring-indigo-500' : ''}`}
                          >
                            <div className='flex items-start gap-3'>
                              <div {...provided.dragHandleProps} className="mt-1 text-gray-400 hover:text-gray-600 cursor-grab">
                                <GripVertical size={18} />
                              </div>
                              <div className="flex-1 min-w-0">
                                <div className='flex items-center gap-2 mb-1'>
                                  <Avatar className="h-7 w-7 shrink-0">
                                    <AvatarImage src={item?.applicant?.profile?.profilePhoto || "https://github.com/shadcn.png"} />
                                  </Avatar>
                                  <h3 className='font-semibold text-gray-900 truncate'>{item?.applicant?.fullname || "Applicant"}</h3>
                                </div>
                                <p className='text-xs text-gray-500 mb-2 truncate'>{item?.applicant?.email}</p>
                                
                                <div className="flex flex-col gap-1.5">
                                  {item?.applicant?.profile?.resume && (
                                    <a href={item.applicant.profile.resume} target="_blank" rel="noopener noreferrer" className='text-xs text-indigo-600 hover:underline flex items-center gap-1'>
                                      <ExternalLink size={12} /> View Resume
                                    </a>
                                  )}
                                  <button onClick={() => setViewAppData(item.applicationData || item.applicant)} className='text-xs text-gray-700 hover:text-indigo-600 hover:underline flex items-center gap-1 text-left'>
                                    <Eye size={12} /> View Application
                                  </button>
                                  <button onClick={() => setChatApplicant(item.applicant)} className='text-xs text-blue-600 hover:underline flex items-center gap-1'>
                                    <MessageCircle size={12} /> Message
                                  </button>
                                  <button onClick={() => setEmailApplicant(item)} className='text-xs text-purple-600 hover:underline flex items-center gap-1'>
                                    <Mail size={12} /> Send Email
                                  </button>
                                  {(columnId === 'accepted' || columnId === 'interview') && (
                                    <button onClick={() => setScheduleApplicant(item.applicant)} className='text-xs text-green-600 hover:underline flex items-center gap-1'>
                                      <CalendarPlus size={12} /> Schedule
                                    </button>
                                  )}
                                </div>
                              </div>
                            </div>
                          </div>
                        )}
                      </Draggable>
                    ))}
                    {provided.placeholder}
                  </div>
                )}
              </Droppable>
            </div>
          ))}
        </DragDropContext>
      </div>

      {scheduleApplicant && (<ScheduleInterviewDialog open={!!scheduleApplicant} setOpen={() => setScheduleApplicant(null)} applicant={scheduleApplicant} jobId={applicants?._id} />)}
      {chatApplicant && (<ChatDialog open={!!chatApplicant} setOpen={() => setChatApplicant(null)} receiverId={chatApplicant._id} receiverName={chatApplicant.fullname} />)}
      {viewAppData && (<ViewApplicationDialog open={!!viewAppData} setOpen={() => setViewAppData(null)} applicationData={viewAppData} />)}
      {emailApplicant && (
        <CustomEmailDialog
          open={!!emailApplicant}
          setOpen={() => setEmailApplicant(null)}
          applicantEmail={emailApplicant.applicant?.email}
          applicantName={emailApplicant.applicant?.fullname}
          jobTitle={applicants?.title}
          applicationId={emailApplicant._id}
        />
      )}
    </div>
  );
}

export default ApplicantsTable;