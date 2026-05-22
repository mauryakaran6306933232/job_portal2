// import React from 'react';
// import { useSelector } from 'react-redux';
// import { AlertCircle, CheckCircle2, XCircle } from 'lucide-react';

// // ■ SMART HELPER: Normalizes strings (removes spaces, lowercase, removes dots)
// // This makes " Node.js" match "nodejs" and "React" match "React.js"
// const normalizeString = (str) => str.toLowerCase().trim().replace(/\./g, "");

// export default function MatchScore({ jobRequirements }) {
//     const { user } = useSelector(store => store?.user) || {};
//     const userSkills = user?.profile?.skills || [];

//     if (!userSkills.length || !jobRequirements?.length) return null;

//     // ■ THE SMART ALGORITHM: Calculate Match % with Fuzzy Matching
//     const matchedSkills = jobRequirements.filter(req => 
//         userSkills.some(skill => {
//             const normReq = normalizeString(req);
//             const normSkill = normalizeString(skill);
//             // Match if exact, or if one contains the other (e.g., "react" is inside "reactjs")
//             return normReq === normSkill || normReq.includes(normSkill) || normSkill.includes(normReq);
//         })
//     );

//     const missingSkills = jobRequirements.filter(req => 
//         !userSkills.some(skill => {
//             const normReq = normalizeString(req);
//             const normSkill = normalizeString(skill);
//             return normReq === normSkill || normReq.includes(normSkill) || normSkill.includes(normReq);
//         })
//     );

//     const matchPercentage = Math.round((matchedSkills.length / jobRequirements.length) * 100);

//     // Dynamic Colors based on score
//     const getColor = () => {
//         if (matchPercentage >= 80) return { stroke: "#22c55e", text: "text-green-600", bg: "bg-green-50" };
//         if (matchPercentage >= 50) return { stroke: "#f59e0b", text: "text-yellow-600", bg: "bg-yellow-50" };
//         return { stroke: "#ef4444", text: "text-red-600", bg: "bg-red-50" };
//     };
//     const color = getColor();

//     // SVG Circle Math (for the circular progress bar)
//     const radius = 45;
//     const circumference = 2 * Math.PI * radius;
//     const offset = circumference - (matchPercentage / 100) * circumference;

//     return (
//         <div className={`rounded-2xl border p-6 ${color.bg} transition-all`}>
//             <h3 className="font-bold text-lg text-gray-900 mb-4 flex items-center gap-2">
//                 <AlertCircle size={20} /> Job Fit Analysis
//             </h3>
            
//             <div className="flex items-center gap-6">
//                 {/* Circular Progress Bar */}
//                 <div className="relative w-28 h-28 shrink-0">
//                     <svg className="w-28 h-28 transform -rotate-90" viewBox="0 0 100 100">
//                         <circle cx="50" cy="50" r={radius} stroke="#e5e7eb" strokeWidth="8" fill="none" />
//                         <circle 
//                             cx="50" cy="50" r={radius} 
//                             stroke={color.stroke} 
//                             strokeWidth="8" 
//                             fill="none" 
//                             strokeDasharray={circumference} 
//                             strokeDashoffset={offset} 
//                             strokeLinecap="round"
//                             style={{ transition: 'stroke-dashoffset 1s ease-in-out' }}
//                         />
//                     </svg>
//                     <div className="absolute inset-0 flex flex-col items-center justify-center">
//                         <span className={`text-3xl font-extrabold ${color.text}`}>{matchPercentage}</span>
//                         <span className="text-xs font-medium text-gray-500">% Match</span>
//                     </div>
//                 </div>

//                 {/* Skill Breakdown */}
//                 <div className="flex-1 text-sm">
//                     <div className="mb-3">
//                         <p className="font-semibold text-gray-700 mb-1">Matched Skills ({matchedSkills.length})</p>
//                         <div className="flex flex-wrap gap-1">
//                             {matchedSkills.map(skill => (
//                                 <span key={skill} className="px-2 py-0.5 bg-green-100 text-green-700 rounded-full text-xs font-medium flex items-center gap-1">
//                                     <CheckCircle2 size={10}/> {skill}
//                                 </span>
//                             ))}
//                         </div>
//                     </div>
                    
//                     <div>
//                         <p className="font-semibold text-gray-700 mb-1">Missing Skills ({missingSkills.length})</p>
//                         <div className="flex flex-wrap gap-1">
//                             {missingSkills.map(skill => (
//                                 <span key={skill} className="px-2 py-0.5 bg-red-100 text-red-700 rounded-full text-xs font-medium flex items-center gap-1">
//                                     <XCircle size={10}/> {skill}
//                                 </span>
//                             ))}
//                         </div>
//                     </div>
//                 </div>
//             </div>
//         </div>
//     );
// }
import React from 'react';
import { useSelector } from 'react-redux';
import { AlertCircle, CheckCircle2, XCircle } from 'lucide-react';

const normalizeString = (str) => str.toLowerCase().trim().replace(/\./g, "");

export default function MatchScore({ jobRequirements }) {
  const { user } = useSelector(store => store?.user) || {};
  const userSkills = user?.profile?.skills || [];
  
  if (!userSkills.length || !jobRequirements?.length) return null;

  const matchedSkills = jobRequirements.filter(req =>
    userSkills.some(skill => {
      const normReq = normalizeString(req);
      const normSkill = normalizeString(skill);
      return normReq === normSkill || normReq.includes(normSkill) || normSkill.includes(normReq);
    })
  );
  
  const missingSkills = jobRequirements.filter(req =>
    !userSkills.some(skill => {
      const normReq = normalizeString(req);
      const normSkill = normalizeString(skill);
      return normReq === normSkill || normReq.includes(normSkill) || normSkill.includes(normReq);
    })
  );
  
  const matchPercentage = Math.round((matchedSkills.length / jobRequirements.length) * 100);

  const getColor = () => {
    if (matchPercentage >= 80) return { stroke: "#22c55e", text: "text-green-600", bg: "bg-green-50" };
    if (matchPercentage >= 50) return { stroke: "#f59e0b", text: "text-yellow-600", bg: "bg-yellow-50" };
    return { stroke: "#ef4444", text: "text-red-600", bg: "bg-red-50" };
  };
  
  const color = getColor();
  const radius = 45;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (matchPercentage / 100) * circumference;

  return (
    <div className={`rounded-2xl border p-6 ${color.bg} transition-all`}>
      <h3 className="font-bold text-lg text-gray-900 mb-4 flex items-center gap-2">
        <AlertCircle size={20} /> Job Fit Analysis
      </h3>

      <div className="flex flex-col sm:flex-row items-center gap-6">
        {/* Circular Progress Bar */}
        <div className="relative w-28 h-28 shrink-0">
          <svg className="w-28 h-28 transform -rotate-90" viewBox="0 0 100 100">
            <circle cx="50" cy="50" r={radius} stroke="#e5e7eb" strokeWidth="8" fill="none" />
            <circle cx="50" cy="50" r={radius} stroke={color.stroke} strokeWidth="8" fill="none" strokeDasharray={circumference} strokeDashoffset={offset} strokeLinecap="round" style={{ transition: 'stroke-dashoffset 1s ease-in-out' }} />
          </svg>
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <span className={`text-3xl font-extrabold ${color.text}`}>{matchPercentage}</span>
            <span className="text-xs font-medium text-gray-500">% Match</span>
          </div>
        </div>

        {/* Skill Breakdown */}
        <div className="flex-1 text-sm w-full">
          <div className="mb-3">
            <p className="font-semibold text-gray-700 mb-1">Matched Skills ({matchedSkills.length})</p>
            <div className="flex flex-wrap gap-1">
              {matchedSkills.map(skill => (
                <span key={skill} className="px-2 py-0.5 bg-green-100 text-green-700 rounded-full text-xs flex items-center gap-1"><CheckCircle2 size={10}/> {skill}</span>
              ))}
            </div>
          </div>
          <div>
            <p className="font-semibold text-gray-700 mb-1">Missing Skills ({missingSkills.length})</p>
            <div className="flex flex-wrap gap-1">
              {missingSkills.map(skill => (
                <span key={skill} className="px-2 py-0.5 bg-red-100 text-red-700 rounded-full text-xs flex items-center gap-1"><XCircle size={10}/> {skill}</span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}