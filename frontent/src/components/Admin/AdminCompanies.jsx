// import React from 'react'
// import Navebar from '../shared/Navebar'
// import { Button } from '../ui/button'
// import { Input } from '../ui/input';
// import { useNavigate } from 'react-router-dom';
// import CompaniesTable from '../CompaniesTable';
// import { setAllCompanies, setSearchCompanyByText } from '../../redux/CompanySlice';
// import { useSelector, useDispatch } from 'react-redux';
// import axios from 'axios';
// import { toast } from 'react-hot-toast';
// import Store from '../../redux/Store'
// import { useEffect, useState } from 'react';
// export default function AdminCompanies() {
//   const dispatch = useDispatch();
//   const allCompanies = useSelector(Store => Store?.company?.allCompanies);
//   const singleCompany = useSelector(Store => Store?.company?.singleCompany);
//   const editCompany = useSelector(Store => Store?.company?.editCompany)
//   console.log('value of the all companies is', allCompanies);
//   var filterCompeny = '';
//   var [value, setValue] = useState("");
//   const companyHandler = async () => {
//     try {
//       const res = await axios.get('http://localhost:8000/company/get', {
//         headers: {
//           'Content-Type': 'application/json'
//         },
//         withCredentials: true
//       });
//       if (res?.data?.success) {
//         toast.success(res?.data?.message);
//         dispatch(setAllCompanies(res?.data?.companies));
//       }
//     }
//     catch (error) {
//       const err_mess = error?.response?.data?.message || error?.message;
//       toast.error(err_mess);
//     }

//   }

//   useEffect(() => {
//     companyHandler();
//     // filterHandler(value)
//   }, [singleCompany, editCompany]);
//   useEffect(()=>{
//       dispatch(setSearchCompanyByText(value));
//   },[value])
//   // const filterHandler =( value ) =>{

//   //    filterCompeny = allCompanies.filter(job =>
//   //   job.name.toLowerCase().includes(value.toLowerCase()))

//   // }
//   const navigate = useNavigate();
//   return (
//     <div>
//       <Navebar />
//       <div className=' max-w-6xl mx-auto my-10'>
//         <div className='flex justify-between my-5  items-center'>
//           {/* <Input value={value} onChange={(e)=>{setValue(e?.target?.env)}} className="w-fit"
//            placeholder="filter By Name"></Input> */}
//           <Input
//             value={value}
//             onChange={(e) => setValue(e.target.value)}
//             className="w-fit"
//             placeholder="filter By Name"
//           />

//           <Button onClick={() => { navigate('/admin/companies/create') }}>New Company</Button>
//         </div>
//         {
//           allCompanies != null && allCompanies?.length != 0 ?
//             <CompaniesTable allCompanies={allCompanies} />
//             : (<div>  You are not add any company
//             </div>)
//         }
//       </div>
//     </div>
//   )
// }
import React from 'react'
import Navebar from '../shared/Navebar'
import { Button } from '../ui/button'
import { Input } from '../ui/input';
import { useNavigate } from 'react-router-dom';
import CompaniesTable from '../CompaniesTable';
import { setAllCompanies, setSearchCompanyByText } from '../../redux/CompanySlice';
import { useSelector, useDispatch } from 'react-redux'; // ■ FIX: Added useSelector
import axios from 'axios';
import { toast } from 'react-hot-toast';
import { useEffect, useState } from 'react';
import { Building2, PlusCircle } from 'lucide-react';
import Footer from '../Footer';

export default function AdminCompanies() {
  const dispatch = useDispatch();
  const allCompanies = useSelector(Store => Store?.company?.allCompanies);
  const [value, setValue] = useState("");
  const navigate = useNavigate();

  const companyHandler = async () => {
    try {
      const res = await axios.get('http://localhost:8000/company/get', {
        headers: { 'Content-Type': 'application/json' },
        withCredentials: true
      });
      if (res?.data?.success) {
        dispatch(setAllCompanies(res?.data?.companies));
      }
    } catch (error) {
      const err_mess = error?.response?.data?.message || error?.message;
      toast.error(err_mess);
    }
  }

  useEffect(() => {
    companyHandler();
  }, []);

  useEffect(() => {
    dispatch(setSearchCompanyByText(value));
  }, [value])

  return (
    <div className='min-h-screen flex flex-col bg-gray-50/50'>
      <Navebar />
      
      <main className='flex-1 max-w-6xl mx-auto my-10 px-4 sm:px-6 lg:px-8 w-full'>
        <div className='flex flex-col sm:flex-row justify-between items-start sm:items-center my-5 gap-4'>
          <Input
            value={value}
            onChange={(e) => setValue(e.target.value)}
            className="w-full sm:w-fit"
            placeholder="Filter By Name"
          />
          <Button onClick={() => { navigate('/admin/companies/create') }} className="w-full sm:w-auto bg-[#6A38C2] hover:bg-[#5b30a6]">
            <PlusCircle size={16} className="mr-2"/> New Company
          </Button>
        </div>

        {allCompanies && allCompanies.length > 0 ? (
          <CompaniesTable allCompanies={allCompanies} />
        ) : (
          <div className='flex flex-col items-center justify-center mt-20 text-gray-500'>
            <Building2 size={64} strokeWidth={1.5} className='text-gray-300 mb-4' />
            <h2 className='text-2xl font-bold text-gray-800 mb-2'>No Companies Found</h2>
            <p className='text-center max-w-sm text-sm mb-6'>You haven't registered any companies yet. Start by adding your first company!</p>
            <Button onClick={() => navigate('/admin/companies/create')} className="bg-[#6A38C2] hover:bg-[#5b30a6]">
              <PlusCircle size={16} className="mr-2"/> Register Company
            </Button>
          </div>
        )}
      </main>

      <Footer />
    </div>
  )
}