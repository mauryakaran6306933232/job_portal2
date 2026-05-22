// import React, { useState } from 'react';
// import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from './ui/dialog';
// import { Input } from './ui/input';
// import { Label } from './ui/label';
// import { Button } from './ui/button';
// import { useSelector } from 'react-redux';
// import axios from 'axios';
// import toast from 'react-hot-toast';
// import { Loader2, FileText, CheckCircle2, Upload } from 'lucide-react';

// export default function ApplyJobDialog({ open, setOpen, jobId, onApplied }) {
//     const { user } = useSelector(store => store?.user) || {};
//     const [loading, setLoading] = useState(false);
//     const [selectedFile, setSelectedFile] = useState(null); // ■ NEW: For file upload

//     // Pre-fill form with current user data from Redux
//     const [formData, setFormData] = useState({
//         name: user?.fullname || '',
//         email: user?.email || '',
//         phone: user?.phoneNumber || '',
//         skills: user?.profile?.skills?.join(', ') || '',
//         coverLetter: '',
//         resumeLink: user?.profile?.resume || '' // Keeps the old URL as fallback
//     });

//     const handleChange = (e) => {
//         setFormData({ ...formData, [e.target.name]: e.target.value });
//     };

//     const submitHandler = async (e) => {
//         e.preventDefault();
//         setLoading(true);
//         try {
//             // Format skills back into an array
//             const payload = {
//                 ...formData,
//                 skills: formData.skills.split(',').map(skill => skill.trim()).filter(skill => skill)
//             };

//             // ■ SWITCH TO FORMDATA: Required for file uploads
//             const formDataObj = new FormData();
//             formDataObj.append('applicationData', JSON.stringify(payload)); // Append JSON as string
            
//             // If a new file was selected, append it
//             if (selectedFile) {
//                 formDataObj.append('resume', selectedFile);
//             }

//             const res = await axios.post(`http://localhost:8000/application/apply/${jobId}`, 
//                 formDataObj, 
//                 { 
//                     headers: { 'Content-Type': 'multipart/form-data' }, // ■ IMPORTANT
//                     withCredentials: true 
//                 }
//             );

//             if (res.data.success) {
//                 toast.success("Application Submitted!");
//                 onApplied(); 
//                 setOpen(false);
//             }
//         } catch (error) {
//             toast.error(error?.response?.data?.message || "Failed to apply");
//         } finally {
//             setLoading(false);
//         }
//     };

//     return (
//         <Dialog open={open} onOpenChange={setOpen}>
//             <DialogContent className="sm:max-w-[500px] max-h-[90vh] overflow-y-auto">
//                 <DialogHeader>
//                     <DialogTitle className="text-2xl font-bold">Confirm Application</DialogTitle>
//                     <p className="text-sm text-gray-500">This data will be saved as your application snapshot for the recruiter.</p>
//                 </DialogHeader>
//                 <form onSubmit={submitHandler} className="mt-4 space-y-4">
//                     <div className="space-y-2">
//                         <Label>Full Name</Label>
//                         <Input name="name" value={formData.name} onChange={handleChange} required />
//                     </div>
//                     <div className="space-y-2">
//                         <Label>Email</Label>
//                         <Input name="email" type="email" value={formData.email} onChange={handleChange} required />
//                     </div>
//                     <div className="space-y-2">
//                         <Label>Phone Number</Label>
//                         <Input name="phone" value={formData.phone} onChange={handleChange} required />
//                     </div>
//                     <div className="space-y-2">
//                         <Label>Skills (comma separated)</Label>
//                         <Input name="skills" value={formData.skills} onChange={handleChange} required />
//                     </div>
//                     <div className="space-y-2">
//                         <Label>Cover Letter / Notes</Label>
//                         <textarea 
//                             name="coverLetter" 
//                             rows="4" 
//                             className="flex w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
//                             value={formData.coverLetter} 
//                             onChange={handleChange} 
//                             placeholder="Why are you a good fit for this role?"
//                         />
//                     </div>

//                     {/* ■ PREMIUM RESUME UPLOAD SECTION */}
//                     <div className="space-y-2">
//                         <Label className="flex items-center gap-1">Resume</Label>
                        
//                         {/* Show current profile resume if it exists and no new file is selected */}
//                         {user?.profile?.resume && !selectedFile && (
//                             <div className="flex items-center gap-2 text-sm text-gray-600 bg-gray-50 p-2 rounded-md border border-dashed">
//                                 <FileText size={16} className="text-indigo-500"/> 
//                                 <span className="truncate">{user.profile.resumeOriginalName || "Current Profile Resume"}</span>
//                             </div>
//                         )}

//                         {/* Custom file upload button */}
//                         <div className="flex items-center gap-3">
//                             <Button type="button" variant="outline" onClick={() => document.getElementById('resumeUpload').click()} className="text-gray-500">
//                                 <Upload size={14} className='mr-2'/> {selectedFile ? "Change File" : "Upload New Resume"}
//                             </Button>
//                             <Input 
//                                 id="resumeUpload"
//                                 type="file" 
//                                 accept="application/pdf" 
//                                 className="hidden"
//                                 onChange={(e) => setSelectedFile(e.target.files[0])} 
//                             />
//                         </div>

//                         {/* Show newly selected file name */}
//                         {selectedFile && (
//                             <p className="text-xs text-green-600 flex items-center gap-1 mt-1">
//                                 <CheckCircle2 size={12}/> New resume: {selectedFile.name}
//                             </p>
//                         )}
//                         <p className='text-xs text-gray-400'>Leave empty to apply with your current profile resume.</p>
//                     </div>

//                     <DialogFooter>
//                         <Button type="submit" className="w-full bg-[#6A38C2] hover:bg-[#5b30a6] py-5" disabled={loading}>
//                             {loading ? <Loader2 className='mr-2 h-4 w-4 animate-spin'/> : null}
//                             Submit Application
//                         </Button>
//                     </DialogFooter>
//                 </form>
//             </DialogContent>
//         </Dialog>
//     );
// }
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from './ui/dialog';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Button } from './ui/button';
import { useSelector } from 'react-redux';
import axios from 'axios';
import toast from 'react-hot-toast';
import { Loader2, FileText, CheckCircle2, Upload } from 'lucide-react';

export default function ApplyJobDialog({ open, setOpen, jobId, onApplied }) {
  const { user } = useSelector(store => store?.user) || {};
  const [loading, setLoading] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);

  const [formData, setFormData] = useState({
    name: user?.fullname || '',
    email: user?.email || '',
    phone: user?.phoneNumber || '',
    skills: user?.profile?.skills?.join(', ') || '',
    coverLetter: '',
    resumeLink: user?.profile?.resume || ''
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const payload = {
        ...formData,
        skills: formData.skills.split(',').map(skill => skill.trim()).filter(skill => skill)
      };
      
      const formDataObj = new FormData();
      formDataObj.append('applicationData', JSON.stringify(payload));
      if (selectedFile) {
        formDataObj.append('resume', selectedFile);
      }

      const res = await axios.post(`http://localhost:8000/application/apply/${jobId}`, formDataObj, {
        headers: { 'Content-Type': 'multipart/form-data' },
        withCredentials: true
      });

      if (res.data.success) {
        toast.success("Application Submitted!");
        onApplied();
        setOpen(false);
      }
    } catch (error) {
      toast.error(error?.response?.data?.message || "Failed to apply");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="sm:max-w-[500px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold">Confirm Application</DialogTitle>
          <p className="text-sm text-gray-500">This data will be saved as your application snapshot.</p>
        </DialogHeader>
        
        <form onSubmit={submitHandler} className="mt-4 space-y-4">
          <div className="space-y-2">
            <Label>Full Name</Label>
            <Input name="name" value={formData.name} onChange={handleChange} required />
          </div>
          <div className="space-y-2">
            <Label>Email</Label>
            <Input name="email" type="email" value={formData.email} onChange={handleChange} required />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Phone Number</Label>
              <Input name="phone" value={formData.phone} onChange={handleChange} required />
            </div>
            <div className="space-y-2">
              <Label>Skills</Label>
              <Input name="skills" value={formData.skills} onChange={handleChange} required />
            </div>
          </div>
          
          <div className="space-y-2">
            <Label>Cover Letter / Notes</Label>
            <textarea
              name="coverLetter"
              rows="3"
              className="flex w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              value={formData.coverLetter}
              onChange={handleChange}
              placeholder="Why are you a good fit?"
            />
          </div>

          <div className="space-y-2">
            <Label className="flex items-center gap-1">Resume</Label>
            {user?.profile?.resume && !selectedFile && (
              <div className="flex items-center gap-2 text-sm text-gray-600 bg-gray-50 p-2 rounded-md border">
                <FileText size={16} className="text-indigo-500 shrink-0"/>
                <span className="truncate">{user.profile.resumeOriginalName || "Current Profile Resume"}</span>
              </div>
            )}
            <div className="flex items-center gap-3">
              <Button type="button" variant="outline" onClick={() => document.getElementById('resumeUpload').click()} className="shrink-0">
                <Upload size={14} className='mr-2'/> {selectedFile ? "Change File" : "Upload New"}
              </Button>
              <Input id="resumeUpload" type="file" accept="application/pdf" className="hidden" onChange={(e) => setSelectedFile(e.target.files[0])} />
            </div>
            {selectedFile && (
              <p className="text-xs text-green-600 flex items-center gap-1 mt-1">
                <CheckCircle2 size={12}/> New resume: {selectedFile.name}
              </p>
            )}
          </div>

          <DialogFooter className="pt-4">
            <Button type="submit" className="w-full bg-[#6A38C2] hover:bg-[#5b30a6] py-5" disabled={loading}>
              {loading ? <Loader2 className='mr-2 h-4 w-4 animate-spin'/> : null}
              Submit Application
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}