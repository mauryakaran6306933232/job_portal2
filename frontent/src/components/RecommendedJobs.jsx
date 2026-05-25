import { API_V1 } from '../utils/constant';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useSelector } from 'react-redux';
import LatestJobCard from './LatestJobCard';
import { Sparkles } from 'lucide-react';

export default function RecommendedJobs() {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const { user } = useSelector(store => store?.user) || {};

  useEffect(() => {
    if (user?.role === 'student' && user?.profile?.skills?.length > 0) {
      const fetchRecommendations = async () => {
        try {
          const res = await axios.get(`${API_V1}/job/recommendations`, { withCredentials: true });
          if (res.data.success) {
            setJobs(res.data.jobs);
          }
        } catch (error) {
          console.log("Error fetching recommendations:", error);
        } finally {
          setLoading(false);
        }
      };
      fetchRecommendations();
    } else {
      setLoading(false);
    }
  }, [user]);

  if (!user || user.role !== 'student' || jobs.length === 0) return null;

  return (
    <div className='my-16'>
      <div className='flex items-center gap-3 mb-6'>
        <div className='bg-indigo-100 p-2 rounded-lg'>
          <Sparkles className='text-indigo-600' size={24} />
        </div>
        <div>
          <h2 className='text-xl sm:text-2xl font-bold text-gray-900'>Recommended for You</h2>
          <p className='text-sm text-gray-500'>Based on your skills: {user?.profile?.skills?.slice(0, 3).join(', ')}</p>
        </div>
      </div>

      <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5'>
        {jobs.map((job) => (
          <LatestJobCard key={job._id} item={job} />
        ))}
      </div>
    </div>
  );
}