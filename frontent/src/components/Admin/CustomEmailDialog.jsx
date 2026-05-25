import { API_V1 } from '../../utils/constant'; // ✅ ADD
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '../ui/dialog';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Button } from '../ui/button';
import axios from 'axios';
import toast from 'react-hot-toast';
import { Loader2, Send } from 'lucide-react';

export default function CustomEmailDialog({ open, setOpen, applicantEmail, applicantName, jobTitle, applicationId }) {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    subject: `Update regarding your application for ${jobTitle || 'the position'}`,
    body: `Hi ${applicantName},\n\nWe are reviewing your application and wanted to reach out regarding...`
  });

  const handleChange = (e) => { setFormData({ ...formData, [e.target.name]: e.target.value }); };

  const submitHandler = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await axios.post(`${API_V1}/application/${applicationId}/send-email`, formData, { withCredentials: true }); // ✅ CHANGE
      if (res.data.success) {
        toast.success("Email sent successfully!");
        setOpen(false);
      }
    } catch (error) {
      toast.error(error?.response?.data?.message || "Failed to send email");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold flex items-center gap-2">
            <Send size={20} className="text-indigo-600"/> Send Custom Email
          </DialogTitle>
          <p className="text-sm text-gray-500">To: {applicantEmail}</p>
        </DialogHeader>
        
        <form onSubmit={submitHandler} className="mt-4 space-y-4">
          <div className="space-y-2">
            <Label>Subject</Label>
            <Input name="subject" value={formData.subject} onChange={handleChange} required />
          </div>
          <div className="space-y-2">
            <Label>Message</Label>
            <textarea
              name="body"
              rows="8"
              className="flex w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              value={formData.body}
              onChange={handleChange}
              required
            />
          </div>
          
          <DialogFooter className="pt-4">
            <Button type="submit" className="w-full bg-[#6A38C2] hover:bg-[#5b30a6] py-5" disabled={loading}>
              {loading ? <Loader2 className='mr-2 h-4 w-4 animate-spin'/> : <Send size={16} className='mr-2'/>}
              Send Email
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}