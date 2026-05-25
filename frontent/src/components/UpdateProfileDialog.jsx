import { USER_API_END_POINT, API_V1 } from '../utils/constant';
import React, { useEffect } from 'react';
import { Dialog, DialogContent, DialogTitle, DialogHeader, DialogFooter } from './ui/dialog';
import { Label } from './ui/label';
import { Input } from './ui/input';
import { Button } from './ui/button';
import { useState } from 'react';
import { setEditUserProfile, setUserSlice } from '../redux/userSlice';
import { useSelector, useDispatch } from 'react-redux';
import axios from 'axios';
import toast from 'react-hot-toast';
import { Loader2, Sparkles, FileText } from 'lucide-react';

export default function UpdateProfileDialog({ open, setOpen }) {
  const [loading, setLoading] = useState(false);
  const [aiLoading, setAiLoading] = useState(false);
  const dispatch = useDispatch();

  const user = useSelector(Store => Store?.user?.user);
  const editUserProfile = useSelector(Store => Store?.user?.editUserProfile);
  
  const [fullname, setFullname] = useState('');
  const [email, setEmail] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [skills, setSkills] = useState('');
  const [bio, setBio] = useState('');
  const [resume, setResume] = useState(null);

  useEffect(() => {
    if (user) {
      setFullname(user.fullname || '');
      setEmail(user.email || '');
      setPhoneNumber(user.phoneNumber || '');
      setBio(user.profile?.bio || '');
      setSkills(user.profile?.skills?.join(', ') || '');
    }
  }, [user, open]);

  const handleFileChange = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setResume(file);
    
    if (file.type === 'application/pdf') {
      setAiLoading(true);
      try {
        const formData = new FormData();
        formData.append("resume", file);
        const res = await axios.post(`${API_V1}/ai/parse-resume`, formData, { headers: { 'Content-Type': 'multipart/form-data' } });
        if (res.data.success && res.data.analysis?.skills?.length > 0) {
          const existingSkills = skills ? skills.split(',').map(s => s.trim()) : [];
          const newSkills = [...new Set([...existingSkills, ...res.data.analysis.skills])];
          setSkills(newSkills.join(", "));
          toast.success("AI extracted skills from your resume!");
        }
      } catch (error) {
        toast.error("AI could not read this PDF.");
      } finally {
        setAiLoading(false);
      }
    }
  }

  const handleProfile = async (e) => {
    setLoading(true);
    e.preventDefault();
    const formData = new FormData();
    formData.append('fullName', fullname);
    formData.append('email', email);
    formData.append('phoneNumber', phoneNumber);
    formData.append('skills', skills);
    formData.append('bio', bio);
    if (resume) formData.append('resume', resume);

    try {
      const res = await axios.post(`${USER_API_END_POINT}/updateProfile`, formData, { // ✅ CHANGE
  headers: { 'Content-Type': 'multipart/form-data' }, withCredentials: true
});
      if (res?.data?.success) {
        toast.success(res?.data?.message);
        dispatch(setEditUserProfile(!editUserProfile));
        dispatch(setUserSlice(res?.data?.user));
        setOpen(false);
      }
    } catch (error) {
      toast.error(error?.response?.data?.message || "Update failed");
    } finally {
      setLoading(false);
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="sm:max-w-[500px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold">Edit Profile</DialogTitle>
        </DialogHeader>

        <form onSubmit={handleProfile} className="mt-4 space-y-5">
          <div className="space-y-2">
            <Label>Full Name</Label>
            <Input value={fullname} onChange={(e) => setFullname(e.target.value)} placeholder="e.g. Karan Maurya" />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Email</Label>
              <Input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
            </div>
            <div className="space-y-2">
              <Label>Phone Number</Label>
              <Input value={phoneNumber} onChange={(e) => setPhoneNumber(e.target.value)} />
            </div>
          </div>
          <div className="space-y-2">
            <Label>Bio</Label>
            <Input value={bio} onChange={(e) => setBio(e.target.value)} placeholder="A short description" />
          </div>
          
          <div className="space-y-2">
            <Label className="flex items-center gap-1 text-gray-700 font-semibold">
              Skills <Sparkles size={14} className="text-indigo-500"/>
            </Label>
            <Input
              value={skills}
              onChange={(e) => setSkills(e.target.value)}
              placeholder="e.g. React, Node.js"
              disabled={aiLoading}
              className={aiLoading ? "border-indigo-300 bg-indigo-50" : ""}
            />
            {aiLoading && (
              <div className="flex items-center gap-2 text-sm text-indigo-600 font-medium mt-1">
                <Loader2 size={14} className="animate-spin"/> AI is reading your resume...
              </div>
            )}
          </div>

          <div className="space-y-2">
            <Label className="flex items-center gap-1 text-gray-700 font-semibold">
              Resume <FileText size={14} className="text-gray-400"/>
            </Label>
            <Input type="file" accept="application/pdf" onChange={handleFileChange} className="cursor-pointer file:text-indigo-600 file:font-semibold" />
            <p className='text-xs text-gray-400 flex items-center gap-1'><Sparkles size={10}/> Upload a PDF to auto-extract skills</p>
          </div>

          <DialogFooter className="pt-4">
            <Button type="submit" className="w-full bg-[#6A38C2] hover:bg-[#5b30a6] text-base py-5" disabled={loading}>
              {loading ? <Loader2 className='mr-2 h-4 w-4 animate-spin'/> : null}
              {loading ? "Saving..." : "Save Changes"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}