
// import React from 'react';
// import { Link, useNavigate } from 'react-router-dom';
// import { Badge } from '@/components/ui/badge';
// import { Button } from '@/components/ui/button';
// import { Bookmark, MapPin, Briefcase, IndianRupee } from 'lucide-react';
// import { useSelector } from 'react-redux';

// const Job = ({ item }) => {
//   const navigate = useNavigate();

//   // ■ FIXED: Changed store.auth to store.user to match your Redux setup
//   const { user } = useSelector(store => store?.user) || {};

//   // THE FAANG MATCH SCORE ALGORITHM
//   const calculateMatchScore = () => {
//     if (!user?.profile?.skills?.length || !item?.requirements?.length) return null;
//     const userSkills = user.profile.skills.map(skill => skill.toLowerCase().trim());
//     const jobRequirements = item.requirements.map(req => req.toLowerCase().trim());
    
//     let matchCount = 0;
//     jobRequirements.forEach(req => {
//       if (userSkills.includes(req)) {
//         matchCount++;
//       }
//     });
//     return Math.round((matchCount / jobRequirements.length) * 100);
//   };

//   const matchScore = calculateMatchScore();

//   return (
//     <div className='p-6 rounded-2xl bg-white border border-gray-100 cursor-pointer relative group hover:shadow-lg transition-all duration-300 flex flex-col'>
      
//       {/* Top Action Area */}
//       <div className='absolute top-4 right-4 flex items-center gap-2'>
//         <Button variant="ghost" size="icon" className="text-gray-400 hover:text-[#6A38C2] opacity-0 group-hover:opacity-100 transition-opacity h-8 w-8">
//           <Bookmark size={16} />
//         </Button>
//       </div>

//       {/* Match Score Pill */}
//       {matchScore !== null && (
//         <div className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-bold mb-3 w-fit ${
//           matchScore >= 80 ? 'bg-green-100 text-green-700' :
//           matchScore >= 50 ? 'bg-yellow-100 text-yellow-700' :
//           'bg-red-100 text-red-700'
//         }`}>
//           <span className="relative flex h-2 w-2">
//             <span className={`animate-ping absolute inline-flex h-full w-full rounded-full opacity-75 ${
//               matchScore >= 80 ? 'bg-green-500' : matchScore >= 50 ? 'bg-yellow-500' : 'bg-red-500'
//             }`}></span>
//             <span className={`relative inline-flex rounded-full h-2 w-2 ${
//               matchScore >= 80 ? 'bg-green-500' : matchScore >= 50 ? 'bg-yellow-500' : 'bg-red-500'
//             }`}></span>
//           </span>
//           {matchScore}% Match
//         </div>
//       )}

//       {/* Company & Location (Clickable) */}
//       <Link to={`/company/${item?.company?._id}`} className='flex items-center gap-3 mb-4 hover:bg-gray-50 p-2 -m-2 rounded-lg transition-colors'>
//         <div className='w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center font-bold text-indigo-600 shrink-0'>
//           {item?.company?.name?.charAt(0) || 'C'}
//         </div>
//         <div className='min-w-0'>
//           <h1 className='font-semibold text-gray-900 hover:text-[#6A38C2] transition-colors truncate'>{item?.company?.name || "Unknown Company"}</h1>
//           <div className='flex items-center text-xs text-gray-500 gap-1'>
//             <MapPin size={12} className="shrink-0" /> <span className='truncate'>{item?.location}</span>
//           </div>
//         </div>
//       </Link>

//       {/* Title & Description */}
//       <div className='mb-4 flex-1'>
//         <h1 className='font-bold text-lg text-gray-900 mb-1 truncate'>{item?.title}</h1>
//         <p className='text-sm text-gray-600 line-clamp-2'>{item?.description}</p>
//       </div>

//       {/* Badges */}
//       <div className='flex flex-wrap items-center gap-2 mt-auto mb-4'>
//         <Badge className='bg-blue-50 text-blue-700 hover:bg-blue-100 font-medium border-0' variant="outline">
//           <Briefcase size={12} className="mr-1" /> {item?.position} Positions
//         </Badge>
//         <Badge className='bg-red-50 text-red-600 hover:bg-red-100 font-medium border-0' variant="outline">
//           {item?.jobType}
//         </Badge>
//         <Badge className='bg-purple-50 text-purple-700 hover:bg-purple-100 font-medium border-0' variant="outline">
//           <IndianRupee size={12} className="mr-1" /> {item?.salary}LPA
//         </Badge>
//       </div>

//       {/* Action Button */}
//       <Button onClick={() => navigate(`/description/${item?._id}`)} className="w-full bg-[#6A38C2] hover:bg-[#5b30a6] text-white">
//         View Details
//       </Button>
//     </div>
//   );
// };

// export default Job;
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Bookmark, MapPin, Briefcase, IndianRupee } from 'lucide-react';
import { useSelector } from 'react-redux';

// ■ THE SMART FUZZY MATCHER (Copied from MatchScore.jsx for consistency!)
const normalizeString = (str) => str.toLowerCase().trim().replace(/\./g, "");

const Job = ({ item }) => {
  const navigate = useNavigate();

  const { user } = useSelector(store => store?.user) || {};

  // ■ THE FAANG MATCH SCORE ALGORITHM (Now perfectly aligns with Job Description page)
  const calculateMatchScore = () => {
    if (!user?.profile?.skills?.length || !item?.requirements?.length) return null;
    
    const matchedSkills = item.requirements.filter(req =>
      user.profile.skills.some(skill => {
        const normReq = normalizeString(req);
        const normSkill = normalizeString(skill);
        // Match if exact, or if one contains the other (e.g., "react" matches "reactjs")
        return normReq === normSkill || normReq.includes(normSkill) || normSkill.includes(normReq);
      })
    );
    
    return Math.round((matchedSkills.length / item.requirements.length) * 100);
  };

  const matchScore = calculateMatchScore();

  return (
    <div className='p-6 rounded-2xl bg-white border border-gray-100 cursor-pointer relative group hover:shadow-lg transition-all duration-300 flex flex-col'>
      
      {/* Top Action Area */}
      <div className='absolute top-4 right-4 flex items-center gap-2'>
        <Button variant="ghost" size="icon" className="text-gray-400 hover:text-[#6A38C2] opacity-0 group-hover:opacity-100 transition-opacity h-8 w-8">
          <Bookmark size={16} />
        </Button>
      </div>

      {/* Match Score Pill */}
      {matchScore !== null && (
        <div className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-bold mb-3 w-fit ${
          matchScore >= 80 ? 'bg-green-100 text-green-700' :
          matchScore >= 50 ? 'bg-yellow-100 text-yellow-700' :
          'bg-red-100 text-red-700'
        }`}>
          <span className="relative flex h-2 w-2">
            <span className={`animate-ping absolute inline-flex h-full w-full rounded-full opacity-75 ${
              matchScore >= 80 ? 'bg-green-500' : matchScore >= 50 ? 'bg-yellow-500' : 'bg-red-500'
            }`}></span>
            <span className={`relative inline-flex rounded-full h-2 w-2 ${
              matchScore >= 80 ? 'bg-green-500' : matchScore >= 50 ? 'bg-yellow-500' : 'bg-red-500'
            }`}></span>
          </span>
          {matchScore}% Match
        </div>
      )}

      {/* Company & Location (Clickable) */}
      <Link to={`/company/${item?.company?._id}`} className='flex items-center gap-3 mb-4 hover:bg-gray-50 p-2 -m-2 rounded-lg transition-colors'>
        <div className='w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center font-bold text-indigo-600 shrink-0'>
          {item?.company?.name?.charAt(0) || 'C'}
        </div>
        <div className='min-w-0'>
          <h1 className='font-semibold text-gray-900 hover:text-[#6A38C2] transition-colors truncate'>{item?.company?.name || "Unknown Company"}</h1>
          <div className='flex items-center text-xs text-gray-500 gap-1'>
            <MapPin size={12} className="shrink-0" /> <span className='truncate'>{item?.location}</span>
          </div>
        </div>
      </Link>

      {/* Title & Description */}
      <div className='mb-4 flex-1'>
        <h1 className='font-bold text-lg text-gray-900 mb-1 truncate'>{item?.title}</h1>
        <p className='text-sm text-gray-600 line-clamp-2'>{item?.description}</p>
      </div>

      {/* Badges */}
      <div className='flex flex-wrap items-center gap-2 mt-auto mb-4'>
        <Badge className='bg-blue-50 text-blue-700 hover:bg-blue-100 font-medium border-0' variant="outline">
          <Briefcase size={12} className="mr-1" /> {item?.position} Positions
        </Badge>
        <Badge className='bg-red-50 text-red-600 hover:bg-red-100 font-medium border-0' variant="outline">
          {item?.jobType}
        </Badge>
        <Badge className='bg-purple-50 text-purple-700 hover:bg-purple-100 font-medium border-0' variant="outline">
          <IndianRupee size={12} className="mr-1" /> {item?.salary}LPA
        </Badge>
      </div>

      {/* Action Button */}
      <Button onClick={() => navigate(`/description/${item?._id}`)} className="w-full bg-[#6A38C2] hover:bg-[#5b30a6] text-white">
        View Details
      </Button>
    </div>
  );
};

export default Job;