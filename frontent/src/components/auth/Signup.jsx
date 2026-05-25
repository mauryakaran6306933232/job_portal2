import { USER_API_END_POINT } from '../../utils/constant';
import React, { useState } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import axios from 'axios';
import { toast } from 'react-hot-toast';
import { useDispatch, useSelector } from 'react-redux';
import { setLoading } from '../../redux/userSlice';
import { Loader2, ArrowRight, Upload } from 'lucide-react';

export default function Signup() {
  const dispatch = useDispatch();
  const loading = useSelector(Store => Store?.user?.loading);
  const navigate = useNavigate();

  const [searchParams] = useSearchParams();
  const referralCode = searchParams.get('ref');
  
  const [input, setInput] = useState({
    fullname: "",
    email: "",
    phoneNumber: "",
    password: "",
    role: "student"
  });

  const [file, setFile] = useState(null);
  const [fileName, setFileName] = useState("");

  const changeEventHandler = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  const changeFileHandler = (e) => {
    const selectedFile = e.target.files?.[0];
    setFile(selectedFile);
    setFileName(selectedFile?.name || "");
  };

  const signupHandler = async (e) => {
    e.preventDefault();
    dispatch(setLoading(true));

    if (!input.fullname || !input.email || !input.phoneNumber || !input.role || !input.password) {
      toast.error('All required fields must be filled');
      dispatch(setLoading(false));
      return;
    }

    try {
      const formData = new FormData();
      formData.append("fullname", input.fullname);
      formData.append("email", input.email);
      formData.append("password", input.password);
      formData.append("phoneNumber", input.phoneNumber);
      formData.append("role", input.role);
      if (file) formData.append("profilePhoto", file);
      if (referralCode) {
        formData.append("referralCode", referralCode);
        console.log("■ Registering with Referral Code:", referralCode);
      }

      const res = await axios.post(`${USER_API_END_POINT}/register`, formData, { // ✅ CHANGE
  headers: { 'Content-Type': 'multipart/form-data' }, withCredentials: true
});

      if (res?.data?.success) {
        toast.success(res?.data?.message);
        navigate('/login');
      }
    } catch (error) {
      const error_mess = error?.response?.data?.message || `Backend error: ${error.message}`;
      toast.error(error_mess);
    } finally {
      dispatch(setLoading(false));
    }
  };

  return (
    <div className='min-h-screen flex'>
      {/* LEFT SIDE - Branding & Gradient (Hidden on mobile) */}
      <div className='hidden lg:flex w-1/2 bg-gradient-to-br from-indigo-600 to-[#6A38C2] text-white flex-col items-center justify-center relative p-12'>
        <Link to="/" className='absolute top-8 left-8 text-2xl font-extrabold tracking-tight hover:text-indigo-200 transition-colors'>
          job<span className='text-indigo-200'>Portal</span>
        </Link>
        <h1 className='text-5xl font-extrabold mb-4 z-10 text-center'>Join Us Today!</h1>
        <p className='text-lg text-indigo-200 text-center max-w-md z-10'>
          Create an account to unlock access to thousands of job opportunities or start hiring top talent.
        </p>
      </div>

      {/* RIGHT SIDE - Form */}
      <div className='w-full lg:w-1/2 flex flex-col justify-center items-center bg-gray-50 p-6 sm:p-12'>
        <div className='w-full max-w-md'>
          <div className='mb-8'>
            <h2 className='text-3xl font-bold text-gray-900'>Create Account</h2>
            <p className='text-gray-500 mt-2'>Fill in the details to get started.</p>
            {referralCode && (
              <p className="mt-2 text-sm text-green-600 font-medium flex items-center gap-1">✨ You were referred! Welcome aboard.</p>
            )}
          </div>

          <form onSubmit={signupHandler} className='bg-white p-6 sm:p-8 rounded-2xl shadow-sm border border-gray-100'>
            <div className='mb-4'>
              <Label>Full Name</Label>
              <Input type="text" name="fullname" placeholder="John Doe" value={input.fullname} onChange={changeEventHandler} className="mt-1.5" />
            </div>
            <div className='mb-4'>
              <Label>Email Address</Label>
              <Input type="email" name="email" placeholder="john@company.com" value={input.email} onChange={changeEventHandler} className="mt-1.5" />
            </div>
            
            <div className='grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4'>
              <div>
                <Label>Phone Number</Label>
                <Input type="text" name="phoneNumber" placeholder="1234567890" value={input.phoneNumber} onChange={changeEventHandler} className="mt-1.5" />
              </div>
              <div>
                <Label>Password</Label>
                <Input type="password" name="password" placeholder="••••••••" value={input.password} onChange={changeEventHandler} className="mt-1.5" />
              </div>
            </div>

            <div className='mb-5'>
              <Label className="mb-3 block">Register As</Label>
              <RadioGroup value={input.role} className="flex items-center gap-6" onValueChange={(value) => setInput({...input, role: value})}>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="student" id="r1" />
                  <Label htmlFor="r1" className="font-normal cursor-pointer">Student</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="recruiter" id="r2" />
                  <Label htmlFor="r2" className="font-normal cursor-pointer">Recruiter</Label>
                </div>
              </RadioGroup>
            </div>

            <div className='mb-6'>
              <Label className="mb-2 block">Profile Photo</Label>
              <div className='flex items-center gap-4'>
                <Button type="button" variant="outline" onClick={() => document.getElementById('profilePhoto').click()} className="shrink-0">
                  <Upload size={16} className='mr-2'/> Choose File
                </Button>
                <span className='text-sm text-gray-500 truncate max-w-[150px]'>{fileName || "No file chosen"}</span>
                <Input id="profilePhoto" name="profilePhoto" accept="image/*" type="file" className="hidden" onChange={changeFileHandler} />
              </div>
            </div>

            <Button type="submit" className="w-full bg-[#6A38C2] hover:bg-[#5b30a6] text-base py-5" disabled={loading}>
              {loading ? <Loader2 className='mr-2 h-4 w-4 animate-spin' /> : null}
              Sign Up <ArrowRight className='ml-2 h-4 w-4' />
            </Button>

            <p className='text-sm text-gray-500 mt-6 text-center'>
              Already have an account? <Link to="/login" className='text-[#6A38C2] font-semibold hover:underline'>Log In</Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}