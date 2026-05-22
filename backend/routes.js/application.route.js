import express from 'express';
import upload from '../middleware/multer.js'; 
import isAuthenticate from '../middleware/isAuthenticate.js';
import { applyJob, getApplicant, getAppliedjobs, updateStatus } from '../controlers/application.controler.js';

const applicationRouter = express.Router();

// ■ CRITICAL FIX: Changed from .get to .post and added upload.single('resume')
applicationRouter.post("/apply/:id", isAuthenticate, upload.single('resume'), applyJob);

applicationRouter.get("/get" , isAuthenticate,getAppliedjobs);
applicationRouter.get("/:id/applicants" , isAuthenticate,getApplicant);
applicationRouter.post("/status/:id/update" , isAuthenticate,updateStatus);

export default applicationRouter;