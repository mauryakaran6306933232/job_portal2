
// import React from 'react'
// import Navebar from '../shared/Navebar'
// import ApplicantsTable from './ApplicantsTable'
// import { useParams } from 'react-router-dom'
// import useGetApplicants from '../../hooks/useGetApplicants'
// import { useSelector } from 'react-redux'
// import { Button } from '@/components/ui/button'
// import { Download } from 'lucide-react'
// import toast from 'react-hot-toast'

// export default function Applicants() {
//     const params = useParams();
//     const jobId = params.id;
//     useGetApplicants(jobId);

//     const { applicants } = useSelector(store => store.application);

//     // 🔥 ENTERPRISE FEATURE: EXPORT TO CSV 🔥
//     const exportToCSV = () => {
//         if (!applicants?.application || applicants.application.length === 0) {
//             toast.error("No applicants to export");
//             return;
//         }

//         // 1. Create CSV Headers
//         const headers = ["Name", "Email", "Phone", "Status", "Applied Date"];

//         // 2. Map applicant data to CSV rows
//         const csvRows = applicants.application.map(app => [
//             `"${app?.applicant?.fullname || 'N/A'}"`,
//             `"${app?.applicant?.email || 'N/A'}"`,
//             `"${app?.applicant?.phoneNumber || 'N/A'}"`,
//             `"${app?.status || 'pending'}"`,
//             `"${new Date(app?.createdAt).toLocaleDateString() || 'N/A'}"`
//         ]);

//         // 3. Join headers and rows into a single CSV string
//         const csvContent = [
//             headers.join(","),
//             ...csvRows.map(row => row.join(","))
//         ].join("\n");

//         // 4. Create a Blob (File object in browser)
//         const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
//         const url = URL.createObjectURL(blob);

//         // 5. Create a hidden link, trigger click to download, then clean up
//         const link = document.createElement("a");
//         link.setAttribute("href", url);
//         link.setAttribute("download", "Applicants_Report.csv");
//         document.body.appendChild(link);
//         link.click();
//         document.body.removeChild(link);

//         toast.success("CSV Exported Successfully!");
//     };

//     return (
//         <div>
//             <Navebar />
//             <div className='max-w-7xl mx-auto my-10'>
//                 <div className='flex justify-between items-center mb-5'>
//                     <h1 className='font-bold text-2xl'>Applicants Pipeline</h1>
                    
//                     {/* 🔥 EXPORT CSV BUTTON 🔥 */}
//                     <Button 
//                         variant="outline" 
//                         onClick={exportToCSV}
//                         className="border-[#6A38C2] text-[#6A38C2] hover:bg-[#6A38C2] hover:text-white"
//                     >
//                         <Download size={16} className="mr-2"/> Export CSV
//                     </Button>
//                 </div>
                
//                 <ApplicantsTable />
//             </div>
//         </div>
//     )
// }
import React from 'react';
import Navebar from '../shared/Navebar';
import ApplicantsTable from './ApplicantsTable';
import { useParams } from 'react-router-dom';
import useGetApplicants from '../../hooks/useGetApplicants';
import { useSelector } from 'react-redux';
import { Button } from '@/components/ui/button';
import { Download } from 'lucide-react';
import toast from 'react-hot-toast';
import Footer from '../Footer';

export default function Applicants() {
  const params = useParams();
  const jobId = params.id;
  useGetApplicants(jobId);
  const { applicants } = useSelector(store => store.application);

  const exportToCSV = () => {
    if (!applicants?.application || applicants.application.length === 0) {
      toast.error("No applicants to export");
      return;
    }
    const headers = ["Name", "Email", "Phone", "Status", "Applied Date"];
    const csvRows = applicants.application.map(app => [
      `"${app?.applicant?.fullname || 'N/A'}"`,
      `"${app?.applicant?.email || 'N/A'}"`,
      `"${app?.applicant?.phoneNumber || 'N/A'}"`,
      `"${app?.status || 'pending'}"`,
      `"${new Date(app?.createdAt).toLocaleDateString() || 'N/A'}"`
    ]);
    const csvContent = [headers.join(","), ...csvRows.map(row => row.join(","))].join("\n");
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.setAttribute("href", url);
    link.setAttribute("download", "Applicants_Report.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    toast.success("CSV Exported Successfully!");
  };

  return (
    <div className='min-h-screen flex flex-col bg-gray-50/50'>
      <Navebar />
      
      <main className='flex-1 max-w-7xl mx-auto my-10 px-4 sm:px-6 lg:px-8 w-full'>
        <div className='flex flex-col sm:flex-row justify-between items-start sm:items-center mb-5 gap-4'>
          <h1 className='font-bold text-xl sm:text-2xl text-gray-900'>Applicants Pipeline</h1>
          <Button variant="outline" onClick={exportToCSV} className="border-[#6A38C2] text-[#6A38C2] hover:bg-[#6A38C2] hover:text-white w-full sm:w-auto">
            <Download size={16} className="mr-2"/> Export CSV
          </Button>
        </div>
        <ApplicantsTable />
      </main>

      <Footer />
    </div>
  );
}