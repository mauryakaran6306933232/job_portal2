import { COMPANY_API_END_POINT } from '../../utils/constant'; 
import React from 'react'
import { Button } from '../ui/button'
import { Label } from '../ui/label'
import { Input } from '../ui/input'
import { useState } from 'react'
import axios from 'axios';
import { toast } from 'react-hot-toast';
import { useSelector, useDispatch } from 'react-redux'
import Store from '../../redux/Store';
import { setEditCompany } from '../../redux/CompanySlice'
import { X } from 'lucide-react'; // Added X icon for closing

export default function UpgrateCompany({ boolean1, setBoolean1, singleCompanyId, singleCompanyName, item }) {
  const [companyName, setCompanyName] = useState(item.name || '')
  const [description, setDescription] = useState(item.description || '');
  const [website, setWebsite] = useState(item.website || '')
  const [location, setLocation] = useState(item.location || '');
  const [logo, setLogo] = useState(null);
  
  const editCompany = useSelector(Store => Store?.company?.editCompany);
  const dispatch = useDispatch();

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
        dispatch(setEditCompany(!editCompany));
        setBoolean1(null); // Close overlay on success
      }
    } catch (error) {
      const err_mess = error?.response?.data?.message || error?.message;
      toast.error(err_mess);
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
      <div className="bg-white w-full max-w-xl max-h-[90vh] overflow-y-auto rounded-2xl shadow-xl p-6 sm:p-8 relative">
        <button onClick={() => setBoolean1(null)} className="absolute top-4 right-4 text-gray-400 hover:text-gray-600">
          <X size={20} />
        </button>

        <h1 className='font-bold text-xl text-gray-900 mb-6'>{singleCompanyName} Setup</h1>
        
        <form onSubmit={formHandler} className='space-y-5'>
          <div>
            <Label className="font-semibold text-gray-700">Company Name</Label>
            <Input className='mt-1.5' type="text" placeholder='Company Name' value={companyName} onChange={(e) => setCompanyName(e.target.value)} />
          </div>
          <div>
            <Label className="font-semibold text-gray-700">Description</Label>
            <Input className='mt-1.5' type="text" placeholder='Description' value={description} onChange={(e) => setDescription(e.target.value)} />
          </div>
          <div>
            <Label className="font-semibold text-gray-700">Company Website</Label>
            <Input className='mt-1.5' type="text" placeholder='Website' value={website} onChange={(e) => setWebsite(e.target.value)} />
          </div>
          <div>
            <Label className="font-semibold text-gray-700">Location</Label>
            <Input className='mt-1.5' type="text" placeholder='Location' value={location} onChange={(e) => setLocation(e.target.value)} />
          </div>
          <div>
            <Label className="font-semibold text-gray-700">Logo</Label>
            <Input className='mt-1.5 cursor-pointer' type='file' accept='image/*' onChange={(e) => setLogo(e.target.files[0])} />
          </div>
          
          <div className='flex gap-3 pt-4'>
            <Button type="button" variant="outline" onClick={() => setBoolean1(null)} className="flex-1">Cancel</Button>
            <Button type='submit' className="flex-1 bg-[#6A38C2] hover:bg-[#5b30a6]">Save Changes</Button>
          </div>
        </form>
      </div>
    </div>
  )
}


