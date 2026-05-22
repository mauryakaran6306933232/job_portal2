// import React from 'react';
// import { Dialog, DialogContent, DialogHeader, DialogTitle } from '../ui/dialog';
// import { Badge } from '../ui/badge';
// import { User, Mail, Phone, FileText, MessageSquare } from 'lucide-react';

// export default function ViewApplicationDialog({ open, setOpen, applicationData }) {
//     if (!applicationData) return null;

//     return (
//         <Dialog open={open} onOpenChange={setOpen}>
//             <DialogContent className="sm:max-w-[500px]">
//                 <DialogHeader>
//                     <DialogTitle className="text-2xl font-bold">Application Details</DialogTitle>
//                     <p className="text-xs text-gray-400">Data snapshot from the time of application</p>
//                 </DialogHeader>
                
//                 <div className="mt-4 space-y-4">
//                     <div className="flex items-center gap-3">
//                         <User className="text-gray-400" size={18} />
//                         <div>
//                             <p className="text-xs text-gray-500">Name</p>
//                             <p className="font-medium">{applicationData.name || 'N/A'}</p>
//                         </div>
//                     </div>
//                     <div className="flex items-center gap-3">
//                         <Mail className="text-gray-400" size={18} />
//                         <div>
//                             <p className="text-xs text-gray-500">Email</p>
//                             <p className="font-medium">{applicationData.email || 'N/A'}</p>
//                         </div>
//                     </div>
//                     <div className="flex items-center gap-3">
//                         <Phone className="text-gray-400" size={18} />
//                         <div>
//                             <p className="text-xs text-gray-500">Phone</p>
//                             <p className="font-medium">{applicationData.phone || 'N/A'}</p>
//                         </div>
//                     </div>

//                     <div>
//                         <p className="text-xs text-gray-500 mb-2">Skills at time of application</p>
//                         <div className="flex flex-wrap gap-2">
//                             {applicationData.skills?.map((skill, idx) => (
//                                 <Badge key={idx} variant="outline" className="text-indigo-600 border-indigo-200">{skill}</Badge>
//                             ))}
//                         </div>
//                     </div>

//                     {applicationData.coverLetter && (
//                         <div>
//                             <p className="text-xs text-gray-500 mb-2 flex items-center gap-1"><MessageSquare size={14}/> Cover Letter / Notes</p>
//                             <div className="bg-gray-50 p-3 rounded-md text-sm text-gray-700 border">
//                                 {applicationData.coverLetter}
//                             </div>
//                         </div>
//                     )}

//                     {applicationData.resumeLink && (
//                         <a href={applicationData.resumeLink} target="_blank" className="text-sm text-indigo-600 hover:underline flex items-center gap-1">
//                             <FileText size={14}/> View Submitted Resume
//                         </a>
//                     )}
//                 </div>
//             </DialogContent>
//         </Dialog>
//     );
// }
import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '../ui/dialog';
import { Badge } from '../ui/badge';
import { User, Mail, Phone, FileText, MessageSquare } from 'lucide-react';

export default function ViewApplicationDialog({ open, setOpen, applicationData }) {
  if (!applicationData) return null;

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="sm:max-w-[500px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold">Application Details</DialogTitle>
          <p className="text-xs text-gray-400">Data snapshot from the time of application</p>
        </DialogHeader>

        <div className="mt-4 space-y-4">
          <div className="flex items-center gap-3">
            <User className="text-gray-400 shrink-0" size={18} />
            <div><p className="text-xs text-gray-500">Name</p><p className="font-medium">{applicationData.name || 'N/A'}</p></div>
          </div>
          <div className="flex items-center gap-3">
            <Mail className="text-gray-400 shrink-0" size={18} />
            <div><p className="text-xs text-gray-500">Email</p><p className="font-medium truncate">{applicationData.email || 'N/A'}</p></div>
          </div>
          <div className="flex items-center gap-3">
            <Phone className="text-gray-400 shrink-0" size={18} />
            <div><p className="text-xs text-gray-500">Phone</p><p className="font-medium">{applicationData.phone || 'N/A'}</p></div>
          </div>
          
          <div>
            <p className="text-xs text-gray-500 mb-2">Skills at time of application</p>
            <div className="flex flex-wrap gap-2">
              {applicationData.skills?.map((skill, idx) => (
                <Badge key={idx} variant="outline" className="text-indigo-600 border-indigo-200">{skill}</Badge>
              ))}
            </div>
          </div>

          {applicationData.coverLetter && (
            <div>
              <p className="text-xs text-gray-500 mb-2 flex items-center gap-1"><MessageSquare size={14}/> Cover Letter</p>
              <div className="bg-gray-50 p-3 rounded-md text-sm text-gray-700 border whitespace-pre-wrap">{applicationData.coverLetter}</div>
            </div>
          )}
          
          {applicationData.resumeLink && (
            <a href={applicationData.resumeLink} target="_blank" rel="noopener noreferrer" className="text-sm text-indigo-600 hover:underline flex items-center gap-1 mt-2">
              <FileText size={14}/> View Submitted Resume
            </a>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}