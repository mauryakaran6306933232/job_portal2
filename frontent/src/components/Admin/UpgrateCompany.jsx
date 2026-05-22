// import React from 'react'
// import Navebar from '../shared/Navebar'
// import { ArrowLeftIcon } from 'lucide-react'
// import { Button } from '../ui/button'
// import { Label } from '../ui/label'
// import { Input } from '../ui/input'
// import { useState } from 'react'
// import axios from 'axios';
// import { toast } from 'react-hot-toast';
// import { useSelector, useDispatch } from 'react-redux'
// import Store from '../../redux/Store';
// import { useNavigate } from 'react-router-dom'
// import { setEditCompany } from '../../redux/CompanySlice'
// export default function UpgrateCompany({
//   boolean1, setBoolean1, singleCompanyId, singleCompanyName ,item }) {
//   const [companyName, setCompanyName] = useState(item.name)
//   const [description, setDescription] = useState(item.description);
//   const [website, setWebsite] = useState('')
//   const [location, setLocation] = useState(item.location);
//   const [logo, setLogo] = useState(item.logo);
//   const editCompany = useSelector(Store=>Store?.company?.editCompany);
//   const navigate = useNavigate();
//   const dispatch = useDispatch();
//   const formHandler = async (e) => {
//     e.preventDefault();
//     try {
//       const formData = new FormData();
//       formData.append('name', companyName);
//       formData.append('description', description);
//       formData.append('website', website);
//       formData.append('location', location);
//       formData.append('logo', logo);
//       const res = await axios.post(`http://localhost:8000/company/update/${singleCompanyId}`, formData, {
//         headers: {
//           'Content-Type': 'multipart/form-data'
//         },
//         withCredentials: true
//       });
//       if (res?.data?.success) {
//         toast.success(res?.data?.message);
//         dispatch(setEditCompany(!editCompany));
//       }
//     }
//     catch (error) {
//       const err_mess = error?.response?.data?.message || error?.message;
//       toast.error(err_mess);
//     }
//   }

// return (
//   <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 backdrop-blur-sm">
    
//     <div className="bg-white w-full max-w-xl mx-auto my-10 p-6 rounded-2xl shadow-xl">
//       <form onSubmit={formHandler}>
        
//         <div className='flex items-center pt-4 pb-2'>
//           <Button
//             onClick={() => setBoolean1(null)}
//             variant='outline'
//             className='flex items-center gap-2 text-gray-500 font-semibold'
//           >
//             <span><ArrowLeftIcon /></span>
//             Back
//           </Button>

//           <h1 className='font-bold text-xl ml-4'>
//             {singleCompanyName} setUp
//           </h1>
//         </div>

//         <Label className='mt-5 font-bold'>Company Name</Label>
//         <Input
//           className='mt-2'
//           type="text"
//           placeholder='Company Name'
//           value={companyName}
//           onChange={(e) => setCompanyName(e.target.value)}
//           name='name'
//         />

//         <Label className='mt-5 font-bold'>Description</Label>
//         <Input
//           className='mt-2'
//           type="text"
//           placeholder='Description'
//           value={description}
//           onChange={(e) => setDescription(e.target.value)}
//           name='description'
//         />

//         <Label className='mt-5 font-bold'>Company Website</Label>
//         <Input
//           className='mt-2'
//           type="text"
//           placeholder='website'
//           value={website}
//           onChange={(e) => setWebsite(e.target.value)}
//           name='website'
//         />

//         <Label className='mt-5 font-bold'>Location</Label>
//         <Input
//           className='mt-2'
//           type="text"
//           placeholder='Location'
//           value={location}
//           onChange={(e) => setLocation(e.target.value)}
//           name='location'
//         />

//         <div className='flex items-center justify-between'>
//           <Label className='mt-5 font-bold'>Logo</Label>
//           <Input
//             className='mt-5 w-[200px]'
//             type='file'
//             onChange={(e) => setLogo(e.target.files[0])}
//             name='logo'
//           />
//         </div>

//         <Button className='w-full mt-5' type='submit'>
//           Edit Company
//         </Button>
//       </form>
//     </div>

//   </div>
// )
// }
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

      const res = await axios.post(`http://localhost:8000/company/update/${singleCompanyId}`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
        withCredentials: true
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


