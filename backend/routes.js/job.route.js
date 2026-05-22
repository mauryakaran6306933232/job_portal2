// import express from 'express';
// import isAuthenticate from '../middleware/isAuthenticate.js';
// import { advancedJobSearch } from '../controlers/advancedSearch.controler.js';
// import { getAdminJobs, getAllJob, getJobById, postJob } from '../controlers/job.controler.js';
// const jobRouter = express.Router();;
// jobRouter.get('/advancedSearch', advancedJobSearch);
// jobRouter.post('/post' , isAuthenticate , postJob);
// jobRouter.get('/get' ,  getAllJob);
// jobRouter.get('/getAdminJob' , isAuthenticate , getAdminJobs);
// jobRouter.get('/getJobById/:id' , isAuthenticate , getJobById);
// export default jobRouter;
import express from 'express';
import isAuthenticate from '../middleware/isAuthenticate.js';
import {
    getAdminJobs,
    getAllJob,
    getJobById,
    postJob
} from '../controlers/job.controler.js';

// 1. ADD THIS IMPORT
import { advancedJobSearch } from '../controlers/advancedSearch.controler.js';

const jobRouter = express.Router();

// 2. ADD THIS ROUTE HERE (At the top!)
jobRouter.get('/advancedSearch', (req, res, next) => {
    console.log("✅ ADVANCED SEARCH ROUTE HIT!");
    next(); // Passes it to the actual controller
}, advancedJobSearch);

// Your existing routes below
jobRouter.post('/post', isAuthenticate, postJob);
jobRouter.get('/get', getAllJob);
jobRouter.get('/getAdminJob', isAuthenticate, getAdminJobs);
jobRouter.get('/getJobById/:id', isAuthenticate, getJobById);

export default jobRouter;