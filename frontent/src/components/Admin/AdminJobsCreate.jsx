import { JOB_API_END_POINT } from '../../utils/constant'; 
import React, { useState } from "react";
import axios from "axios";
import Navebar from "../shared/Navebar";
import { useSelector } from "react-redux";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Loader2, ArrowRight } from "lucide-react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import Footer from "../Footer";
import useGetAllCompanies from "../../hooks/useGetAllCompanies"; // ■ NEW IMPORT

export default function AdminJobsCreate() {
  const companies = useSelector(Store => Store?.company?.allCompanies);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  
  // ■ CRITICAL FIX: Fetch companies when this page loads!
  useGetAllCompanies();

  const [formData, setFormData] = useState({
    title: "", description: "", requirements: "", salary: "",
    location: "", jobType: "", experience: "", position: "", companyId: ""
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await axios.post(`${JOB_API_END_POINT}/post`, formData, { // ✅ CHANGE
  headers: { "Content-Type": "application/json" }, withCredentials: true
});
      if (res.data.success) {
        toast.success(res.data.message || "Job created successfully");
        navigate('/admin/jobs');
      }
    } catch (error) {
      const errorMessage = error?.response?.data?.message || "Failed to post job. Check all fields.";
      toast.error(errorMessage);
      console.log("Post Job Error Details:", error?.response?.data);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className='min-h-screen flex flex-col bg-gray-50/50'>
      <Navebar />
      
      <main className='flex-1 flex justify-center mt-10 px-4 sm:px-6 w-full mb-10'>
        <form onSubmit={submitHandler} className='w-full max-w-2xl p-6 sm:p-8 shadow-lg rounded-2xl bg-white border'>
          <h1 className='font-bold text-2xl mb-6 text-gray-900'>Post a New Job</h1>

          <div className='grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6'>
            <div>
              <Label className="mb-1.5 font-semibold text-gray-700">Job Title *</Label>
              <Input type="text" name="title" placeholder="e.g. Frontend Developer" onChange={handleChange} required />
            </div>
            <div>
              <Label className="mb-1.5 font-semibold text-gray-700">Description *</Label>
              <Input type="text" name="description" placeholder="Brief description" onChange={handleChange} required />
            </div>
            <div>
              <Label className="mb-1.5 font-semibold text-gray-700">Requirements *</Label>
              <Input type="text" name="requirements" placeholder="React, Node.js (comma separated)" onChange={handleChange} required />
            </div>
            <div>
              <Label className="mb-1.5 font-semibold text-gray-700">Salary (LPA) *</Label>
              <Input type="number" name="salary" placeholder="e.g. 12" onChange={handleChange} required />
            </div>
            <div>
              <Label className="mb-1.5 font-semibold text-gray-700">Location *</Label>
              <Input type="text" name="location" placeholder="e.g. Remote / Bangalore" onChange={handleChange} required />
            </div>
            <div>
              <Label className="mb-1.5 font-semibold text-gray-700">Job Type *</Label>
              <Input type="text" name="jobType" placeholder="e.g. Full-time / Internship" onChange={handleChange} required />
            </div>
            <div>
              <Label className="mb-1.5 font-semibold text-gray-700">Experience (Years) *</Label>
              <Input type="number" name="experience" placeholder="e.g. 2" onChange={handleChange} required />
            </div>
            <div>
              <Label className="mb-1.5 font-semibold text-gray-700">Number of Positions *</Label>
              <Input type="number" name="position" placeholder="e.g. 5" onChange={handleChange} required />
            </div>
          </div>

          <div className='mt-6'>
            <Label className="mb-1.5 font-semibold text-gray-700">Select Company *</Label>
            <select
              name="companyId"
              className='w-full border rounded-md h-10 px-2 text-sm bg-white focus:ring-2 focus:ring-indigo-200 focus:outline-none'
              onChange={handleChange}
              required
            >
              <option value="">-- Choose a Company --</option>
              {companies?.map((company1) => (
                <option key={company1?._id} value={company1._id}>
                  {company1?.name}
                </option>
              ))}
            </select>
            {companies?.length === 0 && (
              <p className='text-red-500 text-xs mt-1'>
                You haven't created any companies yet. Please create one first.
              </p>
            )}
          </div>

          <Button type="submit" className="w-full mt-8 bg-[#6A38C2] hover:bg-[#5b30a6] py-5 text-base" disabled={loading}>
            {loading ? <Loader2 className='mr-2 h-4 w-4 animate-spin'/> : null}
            Post New Job <ArrowRight className='ml-2 h-4 w-4'/>
          </Button>
        </form>
      </main>

      <Footer />
    </div>
  );
}