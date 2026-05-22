import React from 'react'
import { useSelector } from 'react-redux';
import {Table , TableCaption, TableRow ,TableHeader,TableHead,TableBody ,TableCell } from './ui/table';
import { Badge } from './ui/badge';
import Store from '../redux/Store';
export default function AppliedJobTable() {
  const appliedJob = useSelector(Store=>Store?.jobs?.appliedJob);
     if (!appliedJob || appliedJob.length === 0) {
    return (
      <div className='max-w-7xl mx-[100px] my-20'> 
        <h1 className='text-4xl font-bold'>
          <span className='text-[#6A38C2]'>User is not applied in any job</span> 
        </h1>
      </div>
    );
  }
  return (
    <div>
        <Table>
            <TableCaption>
                A list of your applied jobs
            </TableCaption>
            <TableHeader>
                  <TableRow>
                      <TableHead>Date</TableHead>
                   <TableHead>Job Role</TableHead> 
                     <TableHead>Company</TableHead>
                       <TableHead className='text-right'>Status</TableHead>
                  </TableRow>
             </TableHeader>
                 <TableBody>
                    {
                       appliedJob.map((item , index)=>(
                        <TableRow key={index}>
         <TableCell>{new Date(item.createdAt).toLocaleDateString()}
</TableCell>   
          <TableCell>{item?.job?.title}</TableCell>
            <TableCell>{item?.job?.company?.name}</TableCell>
             <TableCell className="text-right">
              <Badge >{item.status}</Badge></TableCell>
                        </TableRow>
                       ))   
                    }
                   
                </TableBody> 
        </Table>
    </div>
  )
}
