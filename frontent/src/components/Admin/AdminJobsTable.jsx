
// import React from 'react'
// import { Table, TableCaption, TableHead, TableRow, TableHeader, TableBody, TableCell } from '../ui/table'
// import { Avatar, AvatarImage } from '../ui/avatar'
// import { Button } from '../ui/button'
// import { useNavigate } from 'react-router-dom'
// import { useSelector } from 'react-redux'
// import { useEffect, useState } from 'react'
// import axios from 'axios';
// import toast from 'react-hot-toast';
// import { Badge } from '../ui/badge'; // 🔥 IMPORT BADGE

// export default function AdminJobsTable() {
//   const { allAdminJobs = [] } = useSelector(Store => Store?.jobs)
//   const { searchJobByText } = useSelector(Store => Store?.jobs);
//   const [filterJob, setFilterJob] = useState(allAdminJobs);
//   const navigate = useNavigate();

//   useEffect(() => {
//     if (!Array.isArray(allAdminJobs)) {
//       setFilterJob([]);
//       return;
//     }

//     const filteredCompany = allAdminJobs?.filter((company) => {
//       if (!searchJobByText) return true;
//       return company?.company?.name?.toLowerCase()?.includes(searchJobByText.toLowerCase());
//     });

//     setFilterJob(filteredCompany);
//   }, [searchJobByText, allAdminJobs]);

//   // 🔥 JOB STATUS UPDATE HANDLER 🔥
//   const statusHandler = async (jobId, newStatus) => {
//       try {
//           const res = await axios.post(`http://localhost:8000/api/v1/job/status/${jobId}/update`, 
//               { status: newStatus },
//               { withCredentials: true }
//           );
//           if (res.data.success) {
//               toast.success(res.data.message);
//               // Optionally trigger a refresh of admin jobs here
//           }
//       } catch (error) {
//           toast.error("Failed to update status");
//       }
//   };

//   // 🔥 STATUS BADGE CONFIG 🔥
//   const statusConfig = {
//       draft: { color: "bg-yellow-100 text-yellow-800", label: "Draft" },
//       published: { color: "bg-green-100 text-green-800", label: "Published" },
//       archived: { color: "bg-gray-100 text-gray-800", label: "Archived" }
//   };

//   return (
//     <div>
//       <Table>
//         <TableCaption>A list of your recent registered jobs</TableCaption>
//         <TableHeader>
//           <TableRow>
//             <TableHead>Company Name</TableHead>
//             <TableHead>Role</TableHead>
//             <TableHead>Status</TableHead> {/* 🔥 NEW COLUMN */}
//             <TableHead>Date</TableHead>
//             <TableHead className="text-right">Action</TableHead>
//           </TableRow>
//         </TableHeader>

//         {
//           filterJob?.map((item, index) => {
//             const currentStatus = item.status || 'draft';
//             const config = statusConfig[currentStatus];

//             return (
//               <TableBody key={item?._id || index}>
//                 <TableCell>
//                   <div className="flex items-center gap-3">
//                     <Avatar>
//                       <AvatarImage src={item?.company?.logo || "https://th.bing.com/th/id/OIP.4rZ4ZPxFnT6vMCad7bnPugHaHa?w=193&h=193"} />
//                     </Avatar>
//                     <span className="font-medium">{item?.company?.name || "Unknown Company"}</span>
//                   </div>
//                 </TableCell>
//                 <TableCell>{item?.title}</TableCell>
                
//                 {/* 🔥 STATUS BADGE & DROPDOWN 🔥 */}
//                 <TableCell>
//                   <select 
//                     value={currentStatus}
//                     onChange={(e) => statusHandler(item._id, e.target.value)}
//                     className={`${config.color} text-xs font-semibold py-1 px-2 rounded-md border-0 cursor-pointer outline-none`}
//                   >
//                     <option value="draft">Draft</option>
//                     <option value="published">Published</option>
//                     <option value="archived">Archived</option>
//                   </select>
//                 </TableCell>

//                 <TableCell>{new Date(item?.createdAt).toLocaleString()}</TableCell>
//                 <TableCell className='text-center cursor-pointer'>
//                    <Button 
//                      variant="outline" 
//                      size="sm" 
//                      className="flex items-center gap-1 border-[#6A38C2] text-[#6A38C2] hover:bg-[#6A38C2] hover:text-white"
//                      onClick={() => navigate(`/admin/jobs/${item._id}/applicants`)}
//                    >
//                      Applicants
//                    </Button>
//                 </TableCell>
//               </TableBody>
//             )
//           })
//         }

//       </Table>
//     </div>
//   )
// }
import React from 'react'
import { Table, TableCaption, TableHead, TableRow, TableHeader, TableBody, TableCell } from '../ui/table'
import { Avatar, AvatarImage } from '../ui/avatar'
import { Button } from '../ui/button'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { useEffect, useState } from 'react'
import axios from 'axios';
import toast from 'react-hot-toast';
import { Badge } from '../ui/badge';

export default function AdminJobsTable() {
  const { allAdminJobs = [] } = useSelector(Store => Store?.jobs)
  const { searchJobByText } = useSelector(Store => Store?.jobs);
  const [filterJob, setFilterJob] = useState(allAdminJobs);
  const navigate = useNavigate();

  useEffect(() => {
    if (!Array.isArray(allAdminJobs)) {
      setFilterJob([]);
      return;
    }
    const filteredCompany = allAdminJobs?.filter((company) => {
      if (!searchJobByText) return true;
      return company?.company?.name?.toLowerCase()?.includes(searchJobByText.toLowerCase());
    });
    setFilterJob(filteredCompany);
  }, [searchJobByText, allAdminJobs]);

  const statusHandler = async (jobId, newStatus) => {
    try {
      const res = await axios.post(`http://localhost:8000/api/v1/job/status/${jobId}/update`,
        { status: newStatus },
        { withCredentials: true }
      );
      if (res.data.success) {
        toast.success(res.data.message);
      }
    } catch (error) {
      toast.error("Failed to update status");
    }
  };

  const statusConfig = {
    draft: { color: "bg-yellow-100 text-yellow-800 border-yellow-300", label: "Draft" },
    published: { color: "bg-green-100 text-green-800 border-green-300", label: "Published" },
    archived: { color: "bg-gray-100 text-gray-800 border-gray-300", label: "Archived" }
  };

  return (
    <div className="w-full overflow-x-auto border rounded-lg bg-white">
      <Table>
        <TableCaption>A list of your recent registered jobs</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="min-w-[150px]">Company Name</TableHead>
            <TableHead className="min-w-[120px]">Role</TableHead>
            <TableHead className="min-w-[130px]">Status</TableHead>
            <TableHead className="min-w-[150px]">Date</TableHead>
            <TableHead className="text-right min-w-[120px]">Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {
            filterJob?.map((item, index) => {
              const currentStatus = item.status || 'draft';
              const config = statusConfig[currentStatus];
              return (
                <TableRow key={item?._id || index}>
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <Avatar className="h-8 w-8">
                        <AvatarImage src={item?.company?.logo || "https://github.com/shadcn.png"} />
                      </Avatar>
                      <span className="font-medium text-gray-900 truncate">{item?.company?.name || "Unknown Company"}</span>
                    </div>
                  </TableCell>
                  <TableCell className="font-medium">{item?.title}</TableCell>
                  <TableCell>
                    <select
                      value={currentStatus}
                      onChange={(e) => statusHandler(item._id, e.target.value)}
                      className={`${config.color} text-xs font-semibold py-1.5 px-3 rounded-md border cursor-pointer appearance-none focus:outline-none`}
                    >
                      <option value="draft">Draft</option>
                      <option value="published">Published</option>
                      <option value="archived">Archived</option>
                    </select>
                  </TableCell>
                  <TableCell className="text-gray-500 text-sm">{new Date(item?.createdAt).toLocaleDateString()}</TableCell>
                  <TableCell className='text-right'>
                    <Button
                      variant="outline"
                      size="sm"
                      className="flex items-center gap-1 border-[#6A38C2] text-[#6A38C2] hover:bg-[#6A38C2] hover:text-white ml-auto"
                      onClick={() => navigate(`/admin/jobs/${item._id}/applicants`)}
                    >
                      Applicants
                    </Button>
                  </TableCell>
                </TableRow>
              )
            })
          }
        </TableBody>
      </Table>
    </div>
  )
}