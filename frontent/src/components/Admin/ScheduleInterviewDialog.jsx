import { API_V1 } from '../../utils/constant';
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '../ui/dialog';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import axios from 'axios';
import toast from 'react-hot-toast';
import { Loader2, CalendarPlus } from 'lucide-react';

export default function ScheduleInterviewDialog({ open, setOpen, applicant, jobId }) {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({ scheduledAt: '', location: '', notes: '' });

  const handleChange = (e) => { setFormData({ ...formData, [e.target.name]: e.target.value }); };

  const submitHandler = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await axios.post(`${API_V1}/interview/schedule`, { // ✅ CHANGE
  jobId, applicantId: applicant?._id, scheduledAt: formData.scheduledAt, location: formData.location, notes: formData.notes
}, { withCredentials: true });
      
      if (res.data.success) {
        toast.success("Interview Scheduled!");
        setOpen(false);
      }
    } catch (error) {
      toast.error(error?.response?.data?.message || "Failed to schedule");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="sm:max-w-[425px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2"><CalendarPlus size={20} className="text-indigo-600" /> Schedule Interview</DialogTitle>
          <p className="text-sm text-gray-500">Scheduling for <span className="font-semibold">{applicant?.fullname || "Applicant"}</span></p>
        </DialogHeader>
        
        <form onSubmit={submitHandler} className="mt-4 space-y-4">
          <div className="space-y-2">
            <Label>Date & Time *</Label>
            <Input type="datetime-local" name="scheduledAt" value={formData.scheduledAt} onChange={handleChange} required />
          </div>
          <div className="space-y-2">
            <Label>Location / Meeting Link</Label>
            <Input name="location" value={formData.location} onChange={handleChange} placeholder="e.g., Zoom link or Office Address" />
          </div>
          <div className="space-y-2">
            <Label>Notes for Candidate</Label>
            <Input name="notes" value={formData.notes} onChange={handleChange} placeholder="e.g., Please bring your portfolio" />
          </div>
          
          <DialogFooter className="pt-4">
            <Button type="submit" className="w-full bg-[#6A38C2] hover:bg-[#5b30a6]" disabled={loading}>
              {loading ? <Loader2 className='mr-2 h-4 w-4 animate-spin'/> : null}
              Confirm Schedule
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}