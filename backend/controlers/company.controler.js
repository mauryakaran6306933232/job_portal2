import Company from "../models/company.model.js";
import getDataUri from "../utils/datauri.js";
import cloudinary from "../utils/cloudinary.js";
export const registerCompany = async(req , res)=>{
    console.log('company name from backend',req.body.companyName)
   try{
        const {companyName} = req.body;
        if(!companyName){
            return res.status(401).json({
                success : false,
                message : 'company name is required'
            })
        }
       let company = await  Company.findOne({name : companyName});
       if(company){
        return res.status(401).json({
            success : false,
            message : 'You can  not register same company'
        })
       } 
       company = await Company.create({
            name : companyName,
            userId:req.id
       });
       return res.status(200).json({
        success : true ,
        message : 'Company register successfully',
        company
       })
   }
   catch(error){
    return res.status(400).json({
        success : false ,
        message : `backend error in the ${error.message}`
    })
   }
}
///get company function
export const getCompany = async(req , res)=>{
    try{
    const userId = req.id;
    const companies = await Company.find({userId : userId});
      if(!companies){
         return res.status(401).json({
            success : false,
            message : 'Companies  not found'
         })
      };
    return res.status(200).json({
        success : true,
        message : 'find all company of login user',
        companies
    })
    }
   catch(error){
     return res.status(401).json({
        message : 'Backend error in the getCompany function',
        success : false
     })
   } 
}
/// getCompany by Id
export const getCompanyById = async(req, res)=>{
    try{
    const companyId = req.params.id;
    const company = await Company.findById(companyId);
    if(!company){
          return res.status(401).json({
            success : false,
            message : 'Company  not found'
         })
    }
      return res.status(200).json({
        success : true ,
        message : 'find company successfully by Id',
        company
      })
    }
    catch(error){
        return res.status(401).json({
            success : false,
            message : `backend error in the getCompanyById function ${error.message}`
        })
    }
}
///
export const updateCompany = async(req , res)=>{
    try{
          const {name , description , website , location ,logo}=req.body;
          const file = req.file;

            let cloudResponse=''
               //cloudinary
               if(file){
                  const fileUri = getDataUri(file);
                   cloudResponse = await cloudinary.uploader.upload(fileUri.content);
               }

          const companyId = req?.params?.id;
          const company = await Company.findById(companyId);
          if(!company){
            return res.status(401).json({
                success : false,
                message : 'company is not found in the update Company'
            })
          }
        if(name) company.name=name;
        if(description) company.description=description;
        if(website) company.website = website;
        if(location) company.location = location; 
          if(cloudResponse){
             company.logo = cloudResponse.secure_url; 
           }

        await company.save();
        const updateCompany = {
            name : company.name,
            description : company.description,
            website : company.website,
            location : company.location,
            logo : company.logo

        }
        return res.status(200).json({
            success : true,
            message : 'update company successfully',
            updateCompany
        })
    }
    catch(error){
        return res.status(401).json({
            success : false,
            message : `backend error in the updateCompany ${error.message}`
        })
    }
}