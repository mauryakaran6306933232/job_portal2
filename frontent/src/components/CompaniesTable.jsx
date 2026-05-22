// import React from 'react'
// import {Table , TableCaption, TableHead, TableRow , TableHeader, TableBody , TableCell } from './ui/table'
// import { Avatar, AvatarImage } from './ui/avatar'
// import { Popover, PopoverContent, PopoverTrigger } from './ui/popover'
// import { Edit2, MoreHorizontal } from 'lucide-react'
// import { useNavigate } from 'react-router-dom'
// import UpgrateCompany from './Admin/UpgrateCompany';
// import { useState } from 'react'
// import { useSelector } from 'react-redux'
// import { useEffect } from 'react'
// export default function CompaniesTable({allCompanies}) {
//     const [boolean1 , setBoolean1] = useState();
//     const {searchCompanyByText} = useSelector(Store=>Store?.company);
//     const [filterCompany , setFilterCompany] = useState(allCompanies);
//     useEffect(()=>{
//        const  filteredCompany = allCompanies.length >=0 && allCompanies.filter((company)=>{
//         if(!searchCompanyByText){
//           return true;
//         };
//         return company?.name?.toLowerCase().includes(searchCompanyByText.toLowerCase())
//        });
//        setFilterCompany(filteredCompany)
//     } ,[ searchCompanyByText])
//   return (
//     <div>
//         <Table>
//             <TableCaption>A list of your recent registered company</TableCaption>
//             <TableHeader>
//                 <TableRow>
//                     <TableHead>Logo</TableHead>
//                       <TableHead>Name</TableHead>
//                         <TableHead  className="ml-[100px]">Date  & Time</TableHead>
//                           <TableHead className="text-right ">Action</TableHead>
//                 </TableRow>
//             </TableHeader>

//             {
//               filterCompany?.map((item , index )=>(
//                   <TableBody>
//                 <TableCell>
//                    <Avatar>
//                       <AvatarImage src={item.logo ? item.logo : 'https://th.bing.com/th/id/OIP.4rZ4ZPxFnT6vMCad7bnPugHaHa?w=193&h=193&c=7&r=0&o=7&dpr=2&pid=1.7&rm=3' }></AvatarImage>
//                    </Avatar>
//                 </TableCell>
//                 <TableCell>{`${item.name}`}</TableCell>
//               <TableCell>{new Date(item.createdAt).toLocaleString()}</TableCell>
//               <TableCell  className='text-center cursor-pointer'>
//                 <Popover>
//                   <PopoverTrigger><MoreHorizontal/></PopoverTrigger>
//                    <PopoverContent className='w-32 h-[50px]'>
//                       <div onClick={()=>{setBoolean1(index)}} className='flex  items-center justify-center'>
//                         <Edit2 size={20} className='cursor-pointer'/>
//                         <span>{` Edit`}</span>
//                       </div>
//                    </PopoverContent>
//                 </Popover>
//                   {
//                     ( boolean1 == index) && (
//                         <UpgrateCompany item = {item}  boolean1={boolean1} setBoolean1={setBoolean1} singleCompanyId={item._id} singleCompanyName={item.name} />
//                      )

//                   }
//               </TableCell>
//             </TableBody>

//               ))
//             }

//         </Table>
//     </div>
//   )
// }
import React from 'react'
import { Table, TableCaption, TableHead, TableRow, TableHeader, TableBody, TableCell } from './ui/table'
import { Avatar, AvatarImage } from './ui/avatar'
import { Popover, PopoverContent, PopoverTrigger } from './ui/popover'
import { Edit2, MoreHorizontal } from 'lucide-react'
import UpgrateCompany from './Admin/UpgrateCompany';
import { useState } from 'react'
import { useSelector } from 'react-redux'
import { useEffect } from 'react'

export default function CompaniesTable({ allCompanies }) {
  const [boolean1, setBoolean1] = useState();
  const { searchCompanyByText } = useSelector(Store => Store?.company);
  const [filterCompany, setFilterCompany] = useState(allCompanies);

  useEffect(() => {
    const filteredCompany = allCompanies?.length >= 0 && allCompanies.filter((company) => {
      if (!searchCompanyByText) return true;
      return company?.name?.toLowerCase().includes(searchCompanyByText.toLowerCase());
    });
    setFilterCompany(filteredCompany);
  }, [searchCompanyByText, allCompanies]);

  return (
    <div className="w-full overflow-x-auto border rounded-lg bg-white">
      <Table>
        <TableCaption>A list of your recently registered companies</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="min-w-[80px]">Logo</TableHead>
            <TableHead className="min-w-[150px]">Name</TableHead>
            <TableHead className="min-w-[150px]">Date & Time</TableHead>
            <TableHead className="text-right min-w-[80px]">Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {
            filterCompany?.map((item, index) => (
              <TableRow key={item?._id || index}>
                <TableCell>
                  <Avatar className="h-9 w-9">
                    <AvatarImage src={item.logo || 'https://github.com/shadcn.png'} />
                  </Avatar>
                </TableCell>
                <TableCell className="font-medium text-gray-900">{item.name}</TableCell>
                <TableCell className="text-gray-500 text-sm">{new Date(item.createdAt).toLocaleDateString()}</TableCell>
                <TableCell className='text-right'>
                  <Popover>
                    <PopoverTrigger><MoreHorizontal className='cursor-pointer hover:text-[#6A38C2] transition-colors'/></PopoverTrigger>
                    <PopoverContent className='w-32 h-[50px]'>
                      <div onClick={() => { setBoolean1(index) }} className='flex items-center justify-center gap-2 cursor-pointer hover:text-[#6A38C2] transition-colors'>
                        <Edit2 size={16} className='cursor-pointer' />
                        <span className='text-sm'>Edit</span>
                      </div>
                    </PopoverContent>
                  </Popover>
                  { (boolean1 === index) && (
                    <UpgrateCompany item={item} boolean1={boolean1} setBoolean1={setBoolean1} singleCompanyId={item._id} singleCompanyName={item.name} />
                  )}
                </TableCell>
              </TableRow>
            ))
          }
        </TableBody>
      </Table>
    </div>
  )
}