import express from 'express';
import { getCompany, getCompanyById, registerCompany, updateCompany } from '../controlers/company.controler.js';
import isAuthenticate from '../middleware/isAuthenticate.js';
import upload from '../middleware/multer.js';
const companyRouter = express.Router();
companyRouter.post('/register' , isAuthenticate ,registerCompany);
companyRouter.get("/get",isAuthenticate  ,getCompany)
companyRouter.get("/get/:id",isAuthenticate  ,getCompanyById);
companyRouter.post("/update/:id" ,isAuthenticate , upload.single('logo') ,updateCompany);
export default companyRouter;