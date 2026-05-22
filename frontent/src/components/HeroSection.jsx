import React from 'react'
import { Button } from './ui/button'
import { FiSearch } from 'react-icons/fi'; 
export default function HeroSection() {
  return (
    <div className='text-center'>
       <div className='flex flex-col gap-5 my-10'>
          <span className='my-auto px-4 py-full bg-gray-100 text-[#F83002] font-medium'>No. 1 job Hunt Website</span>
       <h1 className='text-5xl font-bold'>Search apply & <br/> Get Your <span className='text-[#6A38C2]'>Dream jobs</span> </h1>
       <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Architecto laboriosam praesentium mollitia eius sapiente.
       </p>
         <div className='flex w-[40%] shadow-lg border border-gray-300 pl-3 rounded-full items-center gap-4 mx-auto'>
            <input type='text' placeholder='Find your Dream Jobs'
            className='outline-none border-none w-full'></input>
            <Button className="rounded-r-full bg-[#6A38C2]">
               <FiSearch className="h-5 w-5 rounded-right"/>
            </Button>
         </div>
       </div>
    
    </div>
  )
}
