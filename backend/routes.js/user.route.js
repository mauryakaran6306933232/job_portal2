// import express from 'express';
// import { login, logout, register, updateProfile } from '../controlers/user.controler.js';
// import isAuthenticate from '../middleware/isAuthenticate.js';
// import upload from '../middleware/multer.js';
// const userRouter = express.Router();
// userRouter.post('/register', upload.single('profilePhoto'),register);
// userRouter.post('/login',login);
// userRouter.post('/updateProfile',isAuthenticate ,upload.single('resume'), updateProfile);
// userRouter.get('/profile', isAuthenticate, getUserProfile); // ■ NEW ROUTE
// userRouter.get('/logout',isAuthenticate,logout)
// export default userRouter;
import express from 'express';
import { login, logout, register, updateProfile, getUserProfile } from '../controlers/user.controler.js';
import isAuthenticate from '../middleware/isAuthenticate.js';
import upload from '../middleware/multer.js';

const userRouter = express.Router();

userRouter.post('/register', upload.single('profilePhoto'), register);
userRouter.post('/login', login);
userRouter.post('/updateProfile', isAuthenticate, upload.single('resume'), updateProfile);
userRouter.get('/logout', isAuthenticate, logout);
userRouter.get('/profile', isAuthenticate, getUserProfile); // ■ NEW ROUTE

export default userRouter;