import { COMPANY_API_END_POINT } from '../../utils/constant';
import React from 'react'
import Navebar from '../shared/Navebar'
import { Button } from '../ui/button'
import { Label } from '../ui/label'
import { Input } from '../ui/input'
import { useState } from 'react'
import axios from 'axios';
import { toast } from 'react-hot-toast';
import { useSelector } from 'react-redux'
import Store from '../../redux/Store';
import { useNavigate } from 'react-router-dom'
import { ArrowLeft } from 'lucide-react';
import Footer from '../Footer';

export default function AdminCompanySetUp() {
  const singleCompanyId = useSelector(Store => Store?.company?.singleCompany?._id);
  const singleCompanyName = useSelector(Store => Store?.company?.singleCompany?.name);
  
  const [companyName, setCompanyName] = useState('')
  const [description, setDescription] = useState('');
  const [website, setWebsite] = useState('')
  const [location, setLocation] = useState('');
  const [logo, setLogo] = useState('');
  
  const navigate = useNavigate();

  const formHandler = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      if (companyName) formData.append('name', companyName);
      if (description) formData.append('description', description);
      if (website) formData.append('website', website);
      if (location) formData.append('location', location);
      if (logo) formData.append('logo', logo);

      const res = await axios.post(`${COMPANY_API_END_POINT}/update/${singleCompanyId}`, formData, { // ✅ CHANGE
  headers: { 'Content-Type': 'multipart/form-data' }, withCredentials: true
});
      
      if (res?.data?.success) {
        toast.success(res?.data?.message);
        navigate('/admin/companies');
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
          <div className='flex items-center gap-4 mb-8'>
            <Button onClick={() => navigate('/admin/companies')} variant='outline' size='icon' className='shrink-0'>
              <ArrowLeft size={18}/>
            </Button>
            <div>
              <h1 className='font-bold text-xl text-gray-900'>{singleCompanyName} Setup</h1>
              <p className='text-sm text-gray-500'>Add more details about your company.</p>
            </div>
          </div>

          <form onSubmit={formHandler} className='space-y-5'>
            <div>
              <Label className="font-semibold text-gray-700">Company Name</Label>
              <Input className='mt-1.5' type="text" placeholder='Company Name' value={companyName} onChange={(e) => setCompanyName(e.target.value)} />
            </div>
            <div>
              <Label className="font-semibold text-gray-700">Description</Label>
              <Input className='mt-1.5' type="text" placeholder='What does your company do?' value={description} onChange={(e) => setDescription(e.target.value)} />
            </div>
            <div>
              <Label className="font-semibold text-gray-700">Company Website</Label>
              <Input className='mt-1.5' type="text" placeholder='https://example.com' value={website} onChange={(e) => setWebsite(e.target.value)} />
            </div>
            <div>
              <Label className="font-semibold text-gray-700">Location</Label>
              <Input className='mt-1.5' type="text" placeholder='City, Country or Remote' value={location} onChange={(e) => setLocation(e.target.value)} />
            </div>
            <div>
              <Label className="font-semibold text-gray-700">Logo</Label>
              <Input className='mt-1.5 cursor-pointer' type='file' accept='image/*' onChange={(e) => setLogo(e.target.files[0])} />
            </div>
            
            <Button className='w-full mt-6 bg-[#6A38C2] hover:bg-[#5b30a6]' type='submit'>
              Save Changes
            </Button>
          </form>
        </div>
      </main>

      <Footer />
    </div>
  )
}