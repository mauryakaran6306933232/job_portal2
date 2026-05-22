import React from 'react';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

const JobSkeleton = () => {
  return (
    <div className='p-6 rounded-2xl bg-white border border-gray-100'>
      <div className='flex items-center gap-3 mb-4'>
        <Skeleton circle width={40} height={40} />
        <div>
          <Skeleton width={120} height={14} />
          <Skeleton width={80} height={10} className="mt-1" />
        </div>
      </div>
      
      <Skeleton width={`80%`} height={18} className="mb-2" />
      <Skeleton count={2} height={12} />
      
      <div className='flex gap-2 mt-4'>
        <Skeleton width={80} height={22} borderRadius={20} />
        <Skeleton width={60} height={22} borderRadius={20} />
        <Skeleton width={70} height={22} borderRadius={20} />
      </div>

      <div className='flex gap-3 mt-5'>
        <Skeleton width={`60%`} height={36} borderRadius={6} />
        <Skeleton width={`30%`} height={36} borderRadius={6} />
      </div>
    </div>
  );
};

export default JobSkeleton;