import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Home, ArrowLeft } from 'lucide-react';

export default function NotFound() {
    return (
        <div className='min-h-screen flex items-center justify-center bg-gray-50 px-4'>
            <div className='text-center'>
                <h1 className='text-8xl font-extrabold text-[#6A38C2] tracking-wider mb-4'>404</h1>
                <h2 className='text-3xl font-bold text-gray-900 mb-4'>Page Not Found</h2>
                <p className='text-gray-500 mb-8 max-w-md mx-auto'>
                    Oops! The page you are looking for does not exist or has been moved. Let's get you back on track.
                </p>
                <div className='flex items-center justify-center gap-4'>
                    <Button variant="outline" onClick={() => window.history.back()} className="flex items-center gap-2">
                        <ArrowLeft size={16}/> Go Back
                    </Button>
                    <Link to="/">
                        <Button className="bg-[#6A38C2] hover:bg-[#5b30a6] flex items-center gap-2">
                            <Home size={16}/> Back to Home
                        </Button>
                    </Link>
                </div>
            </div>
        </div>
    );
}