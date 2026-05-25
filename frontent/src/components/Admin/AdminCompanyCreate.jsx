import { COMPANY_API_END_POINT } from '../../utils/constant';
import React from 'react'
import Navebar from '../shared/Navebar'
import { Button } from '../ui/button'
import { Label } from '../ui/label'
import { Input } from '../ui/input'
import { toast } from 'react-hot-toast';
import axios from 'axios';
import { useState } from 'react'
import { setSingleCompany } from '../../redux/CompanySlice'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { ArrowLeft, Building2 } from 'lucide-react';
import Footer from '../Footer';

export default function AdminCompanyCreate() {
  const navigate = useNavigate();
  const [companyName, setCompanyName] = useState('');
  const dispatch = useDispatch();

  const registerNewCompany = async () => {
    if (!companyName.trim()) {
      return toast.error("Company name cannot be empty");
    }
    try {
      const res = await axios.post(`${COMPANY_API_END_POINT}/register`, { // ✅ CHANGE
  companyName: companyName
}, { headers: { "Content-Type": 'application/json' }, withCredentials: true });
      if (res?.data?.success) {
        toast.success(res?.data?.message);
        dispatch(setSingleCompany(res?.data?.company));
        navigate(`/admin/companies/${res?.data?.company?._id}`);
      }
    } catch (error) {
      const err_mess = error?.response?.data?.message || error?.message;
      toast.error(err_mess);
    }
  }

  return (
    <div className='min-h-screen flex flex-col bg-gray-50/50'>
      <Navebar />
      
      <main className='flex-1 max-w-2xl mx-auto my-10 px-4 sm:px-6 w-full'>
        <div className='bg-white p-6 sm:p-8 rounded-2xl border shadow-sm'>
          <div className='mb-8'>
            <h1 className='font-bold text-2xl text-gray-900 flex items-center gap-2'>
              <Building2 className='text-[#6A38C2]' size={24}/> Register Company
            </h1>
            <p className='text-gray-500 mt-1 text-sm'>What would you like to name your company? You can add details later.</p>
          </div>

          <div className='my-6'>
            <Label className="font-semibold text-gray-700">Company Name</Label>
            <Input
              type='text'
              className='mt-2'
              placeholder='e.g. Microsoft, Google, etc.'
              value={companyName}
              onChange={(e) => setCompanyName(e.target.value)}
            />
          </div>

          <div className='flex flex-col sm:flex-row items-center gap-3 mt-10'>
            <Button variant="outline" onClick={() => { navigate('/admin/companies') }} className="w-full sm:w-auto">Cancel</Button>
            <Button onClick={registerNewCompany} className="w-full sm:w-auto bg-[#6A38C2] hover:bg-[#5b30a6]">Continue</Button>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}