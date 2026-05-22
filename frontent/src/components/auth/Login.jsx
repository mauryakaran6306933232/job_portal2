
import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import axios from 'axios';
import { toast } from 'react-hot-toast';
import { useDispatch, useSelector } from 'react-redux';
import { setUserSlice, setLoading } from '../../redux/userSlice';
import { setAppliedJob } from '../../redux/JobSlice';
import { Loader2, ArrowRight } from 'lucide-react';

export default function Login() {
  const [input, setInput] = useState({ email: "", password: "", role: "student" });
  const loading = useSelector(Store => Store?.user?.loading);
  const singleJob = useSelector(Store => Store?.jobs?.singleJob?.applicant);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const changeEventHandler = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  // const appliedJobHandler = async () => {
  //   try {
  //     const res = await axios.get("http://localhost:8000/application/get", {
  //       headers: { 'Content-Type': 'application/json' },
  //       withCredentials: true
  //     });
  //     if (res?.data?.success) {
  //       dispatch(setAppliedJob(res?.data?.application));
  //     }
  //   } catch (error) {
  //     console.log("Applied job fetch error:", error?.response?.data?.message || error.message);
  //   }
  // };

  // useEffect(() => {
  //   appliedJobHandler();
  // }, [singleJob]);

  const loginHandler = async (e) => {
    e.preventDefault();
    dispatch(setLoading(true));

    if (!input.email || !input.role || !input.password) {
      toast.error('All required fields must be filled');
      dispatch(setLoading(false));
      return;
    }

    try {
      const res = await axios.post("http://localhost:8000/user/login", {
        email: input.email,
        password: input.password,
        role: input.role
      }, {
        headers: { 'Content-Type': 'application/json' },
        withCredentials: true
      });

      if (res?.data?.success) {
        toast.success(res?.data?.message);
        dispatch(setUserSlice(res?.data?.user));
        navigate('/');
        // appliedJobHandler();
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
      {/* LEFT SIDE - Branding & Gradient (Hidden on mobile, visible on large screens) */}
      <div className='hidden lg:flex w-1/2 bg-gradient-to-br from-[#6A38C2] to-indigo-600 text-white flex-col items-center justify-center relative p-12'>
        <Link to="/" className='absolute top-8 left-8 text-2xl font-extrabold tracking-tight hover:text-indigo-200 transition-colors'>
          job<span className='text-indigo-200'>Portal</span>
        </Link>
        <h1 className='text-5xl font-extrabold mb-4 z-10 text-center'>Welcome Back!</h1>
        <p className='text-lg text-indigo-200 text-center max-w-md z-10'>
          Where talent meets opportunity. Log in to find your dream job or manage your hiring pipeline.
        </p>
      </div>

      {/* RIGHT SIDE - Form */}
      <div className='w-full lg:w-1/2 flex flex-col justify-center items-center bg-gray-50 p-6 sm:p-12'>
        <div className='w-full max-w-md'>
          <div className='mb-8'>
            <h2 className='text-3xl font-bold text-gray-900'>Log In</h2>
            <p className='text-gray-500 mt-2'>Enter your credentials to access your account</p>
          </div>

          <form onSubmit={loginHandler} className='bg-white p-6 sm:p-8 rounded-2xl shadow-sm border border-gray-100'>
            <div className='mb-5'>
              <Label>Email Address</Label>
              <Input type="email" name="email" placeholder="pat@company.com" value={input.email} onChange={changeEventHandler} className="mt-1.5" />
            </div>
            <div className='mb-5'>
              <Label>Password</Label>
              <Input type="password" name="password" placeholder="••••••••" value={input.password} onChange={changeEventHandler} className="mt-1.5" />
            </div>
            <div className='mb-6'>
              <Label className="mb-3 block">Login As</Label>
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

            <Button type="submit" className="w-full bg-[#6A38C2] hover:bg-[#5b30a6] text-base py-5" disabled={loading}>
              {loading ? <Loader2 className='mr-2 h-4 w-4 animate-spin' /> : null}
              Log In <ArrowRight className='ml-2 h-4 w-4' />
            </Button>

            <p className='text-sm text-gray-500 mt-6 text-center'>
              Don't have an account? <Link to="/signup" className='text-[#6A38C2] font-semibold hover:underline'>Sign Up</Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}