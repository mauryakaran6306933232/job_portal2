// import React from 'react';
// import { FaFacebook, FaLinkedin, FaTwitter, FaInstagram } from 'react-icons/fa';

// const Footer = () => {
//   return (
//     <footer className="bg-gray-900 text-white py-10 mt-20">
//       <div className="max-w-6xl mx-auto px-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
        
//         {/* Logo and Description */}
//         <div>
//           <h2 className="text-xl font-bold mb-4">JobFinder</h2>
//           <p className="text-sm text-gray-400">
//             Your trusted platform to connect job seekers with top employers. Start your career journey today!
//           </p>
//         </div>

//         {/* Quick Links */}
//         <div>
//           <h3 className="font-semibold mb-4">Quick Links</h3>
//           <ul className="space-y-2 text-sm text-gray-300">
//             <li><a href="/" className="hover:text-white">Home</a></li>
//             <li><a href="/jobs" className="hover:text-white">Browse Jobs</a></li>
//             <li><a href="/companies" className="hover:text-white">Companies</a></li>
//             <li><a href="/contact" className="hover:text-white">Contact Us</a></li>
//           </ul>
//         </div>

//         {/* Resources */}
//         <div>
//           <h3 className="font-semibold mb-4">Resources</h3>
//           <ul className="space-y-2 text-sm text-gray-300">
//             <li><a href="/blogs" className="hover:text-white">Career Blog</a></li>
//             <li><a href="/help" className="hover:text-white">Help Center</a></li>
//             <li><a href="/privacy" className="hover:text-white">Privacy Policy</a></li>
//             <li><a href="/terms" className="hover:text-white">Terms & Conditions</a></li>
//           </ul>
//         </div>

//         {/* Social Media */}
//         <div>
//           <h3 className="font-semibold mb-4">Follow Us</h3>
//           <div className="flex space-x-4 text-xl">
//             <a href="#" className="hover:text-blue-400"><FaFacebook /></a>
//             <a href="#" className="hover:text-blue-500"><FaLinkedin /></a>
//             <a href="#" className="hover:text-sky-400"><FaTwitter /></a>
//             <a href="#" className="hover:text-pink-400"><FaInstagram /></a>
//           </div>
//         </div>
//       </div>

//       {/* Bottom Copyright */}
//       <div className="text-center text-sm text-gray-500 mt-10 border-t pt-4 border-gray-700">
//         &copy; {new Date().getFullYear()} JobFinder. All rights reserved.
//       </div>
//     </footer>
//   );
// };

// export default Footer;
import React from 'react';
import { FaFacebook, FaLinkedin, FaTwitter, FaInstagram } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white py-12 mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        
        {/* Logo and Description */}
        <div>
          <h2 className="text-xl font-bold mb-4">job<span className='text-[#6A38C2]'>Portal</span></h2>
          <p className="text-sm text-gray-400 leading-relaxed">
            Your trusted platform to connect job seekers with top employers. Start your career journey today!
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="font-semibold mb-4 text-gray-200">Quick Links</h3>
          <ul className="space-y-2 text-sm text-gray-400">
            <li><Link to="/" className="hover:text-white transition-colors">Home</Link></li>
            <li><Link to="/browse" className="hover:text-white transition-colors">Browse Jobs</Link></li>
            <li><Link to="/" className="hover:text-white transition-colors">Companies</Link></li>
          </ul>
        </div>

        {/* Resources */}
        <div>
          <h3 className="font-semibold mb-4 text-gray-200">Resources</h3>
          <ul className="space-y-2 text-sm text-gray-400">
            <li><a href="#" className="hover:text-white transition-colors">Career Blog</a></li>
            <li><a href="#" className="hover:text-white transition-colors">Help Center</a></li>
            <li><a href="#" className="hover:text-white transition-colors">Privacy Policy</a></li>
            <li><a href="#" className="hover:text-white transition-colors">Terms & Conditions</a></li>
          </ul>
        </div>

        {/* Social Media */}
        <div>
          <h3 className="font-semibold mb-4 text-gray-200">Follow Us</h3>
          <div className="flex space-x-4 text-xl text-gray-400">
            <a href="#" className="hover:text-blue-500 transition-colors"><FaFacebook /></a>
            <a href="#" className="hover:text-blue-400 transition-colors"><FaLinkedin /></a>
            <a href="#" className="hover:text-sky-400 transition-colors"><FaTwitter /></a>
            <a href="#" className="hover:text-pink-400 transition-colors"><FaInstagram /></a>
          </div>
        </div>
      </div>

      {/* Bottom Copyright */}
      <div className="text-center text-sm text-gray-500 mt-10 border-t border-gray-800 pt-6 max-w-7xl mx-auto px-4">
        &copy; {new Date().getFullYear()} jobPortal. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;