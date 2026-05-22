// import Application from "../models/application.model.js";
// import Job from "../models/job.model.js";
// import User from "../models/user.model.js"; // ■ REQUIRED FOR NOTIFICATION DB UPDATE
// import getDataUri from "../utils/datauri.js"; 
// import cloudinary from "../utils/cloudinary.js"; 

// export const applyJob = async (req, res) => {
//     try {
//         const userId = req.id;
//         const { id: jobId } = req.params;
        
//         let applicationData = req.body.applicationData ? JSON.parse(req.body.applicationData) : {};

//         if (!jobId) {
//             return res.status(404).json({ success: false, message: 'jobId is required' });
//         }

//         const existingApplication = await Application.findOne({ job: jobId, applicant: userId });
//         if (existingApplication) {
//             return res.status(400).json({ success: false, message: "User has already applied to this job" });
//         }

//         const isExistJob = await Job.findById(jobId);
//         if (!isExistJob) {
//             return res.status(404).json({ success: false, message: "This job does not exist" });
//         }

//         if (req.file) {
//             const fileUri = getDataUri(req.file);
//             const cloudResponse = await cloudinary.uploader.upload(fileUri.content, {
//                 resource_type: "auto"
//             });
//             applicationData.resumeLink = cloudResponse.secure_url;
//             applicationData.resumeOriginalName = req.file.originalname;
//         }

//         const newApplication = await Application.create({
//             job: jobId,
//             applicant: userId,
//             applicationData: applicationData
//         });

//         isExistJob.application.push(newApplication._id);
//         isExistJob.applicant.push(newApplication?.applicant);
//         await isExistJob.save();

//         return res.status(201).json({
//             success: true,
//             message: 'Job applied successfully',
//             id: newApplication._id,
//             applicant: newApplication.job,
//         });
//     } catch (error) {
//         return res.status(500).json({
//             message: `Backend error in the applyJob function ${error.message}`,
//             success: false
//         });
//     }
// }

// ////get all applied jobs
// export const getAppliedjobs = async (req ,res) => {
//     try {
//           const userId=req.id;
//           const application=  await Application.find({applicant : userId}).sort({createdAt : -1}).populate({path : 'job' ,
//             options : {sort : {createdAt : -1}},
//              populate : [
//                 {
//                     path : 'company',
//                     options : {sort :{createdAt : -1}}
//                 },
//                 {
//                     path : 'created_by', // ■ NEW: Fetch the recruiter's ID and Name!
//                     select: 'fullname _id' 
//                 }
//              ]
//           });
//           if(!application){
//             return res.status(404).json({
//                 success : false,
//                 message : 'current time user is not applied in any job'
//             })
//           };
//         return res.status(200).json({
//             success : true,
//             message : "get all job whhich is applied by user successfully",
//             application
//         })  
//     }
//     catch(error){
//         return res.status(401).json({
//             success : false,
//             message : 'backend error in the getAllJob function'
//         })
//     }
// }
// ///get all applicant
// export const getApplicant = async(req , res) => {
//     try {
//     const jobId = req.params.id;
//     const job = await Job.findById(jobId).populate({
//         path : 'application',
//         options : {sort :{createdAt : -1}},
//         populate : {
//             path :'applicant'
//         }
//     });
//     if(!job){
//         return res.status(401).json({
//             success : false,
//             message : 'Current job is not exist'
//         })
//     }
//     return res.status(201).json({
//         success : true,
//         message :  'applicant has found successfully',
//         job
//     })
// }
// catch(error){
//     return res.status(401).json({
//         success : false,
//         message : 'backend error in the getApplicant function'
//     })
// }
// }

// ////updateStatus
// export const updateStatus = async (req , res) => {
//     try {
//         const {status} = req.body;
//         const applicationId= req.params.id;
//         if(!status){
//             return res.status(401).json({
//                 message : 'status is required',
//                 success :false
//             })
//         };
        
//         const application = await Application.findById(applicationId).populate('applicant job');
        
//         if(!application){
//             return res.status(401).json({
//                 success : false,
//                 message : "Application has not found"
//             })
//         }
        
//         application.status = status.toLowerCase();
//         await application.save();

//         // ■ DATABASE PERSISTENCE + CAPPED ARRAY LOGIC
//         const io = req.app.get("io");
//         if (application.applicant?._id) {
//             const userId = application.applicant._id;

//             // 1. Save to DB & Cap at 15 items automatically!
//             await User.findByIdAndUpdate(userId, {
//                 $push: {
//                     notifications: {
//                         $each: [{ 
//                             message: `Your application for "${application.job?.title}" has been ${status}!`,
//                             status: status,
//                             jobId: application.job?._id,
//                             read: false
//                         }],
//                         $slice: -15 // ■ THE MAGIC: Keep only the last 15 notifications!
//                     }
//                 }
//             });

//             // 2. Emit Real-Time Socket Event
//             if (io) {
//                 io.to(userId.toString()).emit("applicationStatusUpdated", {
//                     message: `Your application for "${application.job?.title}" has been ${status}!`,
//                     status: status,
//                     jobId: application.job?._id
//                 });
//                 console.log(`🔔 Emitted status update & saved notification for user: ${userId}`);
//             }
//         }

//         return res.status(201).json({
//             message : "Status update successfully",
//             success : true
//         })
//     }
//     catch(error){
//         return res.status(401).json({
//             success: false,
//             message : `backend error in the updateStatus ${error.message}`
//         })
//     }
// }
// import Application from "../models/application.model.js";
// import Job from "../models/job.model.js";
// import User from "../models/user.model.js";
// import getDataUri from "../utils/datauri.js";
// import cloudinary from "../utils/cloudinary.js";

// export const applyJob = async (req, res) => {
//   try {
//     const userId = req.id;
//     const { id: jobId } = req.params;

//     let applicationData = req.body.applicationData ? JSON.parse(req.body.applicationData) : {};

//     if (!jobId) {
//       return res.status(404).json({ success: false, message: 'jobId is required' });
//     }

//     const existingApplication = await Application.findOne({ job: jobId, applicant: userId });
//     if (existingApplication) {
//       return res.status(400).json({ success: false, message: "User has already applied to this job" });
//     }

//     const isExistJob = await Job.findById(jobId);
//     if (!isExistJob) {
//       return res.status(404).json({ success: false, message: "This job does not exist" });
//     }

//     if (req.file) {
//       const fileUri = getDataUri(req.file);
//       const cloudResponse = await cloudinary.uploader.upload(fileUri.content, {
//         resource_type: "auto"
//       });
//       applicationData.resumeLink = cloudResponse.secure_url;
//       applicationData.resumeOriginalName = req.file.originalname;
//     }

//     const newApplication = await Application.create({
//       job: jobId,
//       applicant: userId,
//       applicationData: applicationData
//     });

//     isExistJob.application.push(newApplication._id);
//     isExistJob.applicant.push(newApplication?.applicant);
//     await isExistJob.save();

//     return res.status(201).json({
//       success: true,
//       message: 'Job applied successfully',
//       id: newApplication._id,
//       applicant: newApplication.job,
//     });
//   } catch (error) {
//     return res.status(500).json({
//       message: `Backend error in the applyJob function ${error.message}`,
//       success: false
//     });
//   }
// }

// // get all applied jobs (Students only)
// export const getAppliedjobs = async (req, res) => {
//   try {
//     const userId = req.id;
//     const application = await Application.find({ applicant: userId }).sort({ createdAt: -1 }).populate({
//       path: 'job',
//       options: { sort: { createdAt: -1 } },
//       populate: [
//         { path: 'company', options: { sort: { createdAt: -1 } } },
//         { path: 'created_by', select: 'fullname _id' }
//       ]
//     });

//     if (!application) {
//       return res.status(404).json({
//         success: false,
//         message: 'Current time user is not applied in any job'
//       });
//     };

//     return res.status(200).json({
//       success: true,
//       message: "get all job which is applied by user successfully",
//       application
//     });
//   } catch (error) {
//     return res.status(401).json({
//       success: false,
//       message: 'backend error in the getAllJob function'
//     });
//   }
// }

// // get all applicants (Recruiters only)
// ///get all applied jobs
// export const getAppliedjobs = async (req, res) => {
//   try {
//     const userId = req.id;
//     // ■ FIX: Corrected populate syntax so Job, Company, and Recruiter data is attached
//     const application = await Application.find({ applicant: userId }).sort({ createdAt: -1 }).populate({
//       path: 'job',
//       options: { sort: { createdAt: -1 } },
//       populate: [
//         { path: 'company' },
//         { path: 'created_by', select: 'fullname _id' }
//       ]
//     });

//     if (!application) {
//       return res.status(404).json({
//         success: false,
//         message: 'Current time user is not applied in any job'
//       })
//     };

//     return res.status(200).json({
//       success: true,
//       message: "get all job which is applied by user successfully",
//       application
//     })
//   }
//   catch (error) {
//     return res.status(401).json({
//       success: false,
//       message: 'backend error in the getAllJob function'
//     })
//   }
// }

// // updateStatus (Recruiters only)
// export const updateStatus = async (req, res) => {
//   try {
//     const { status } = req.body;
//     const applicationId = req.params.id;
//     const recruiterId = req.id; // ■ Get logged-in recruiter ID

//     if (!status) {
//       return res.status(400).json({
//         message: 'Status is required',
//         success: false
//       });
//     };

//     const application = await Application.findById(applicationId).populate('applicant job');

//     if (!application) {
//       return res.status(404).json({
//         success: false,
//         message: "Application not found"
//       });
//     }

//     // ■■■ SECURITY FIX: Verify Ownership of the Job associated with this application ■■■
//     if (application.job.created_by.toString() !== recruiterId.toString()) {
//       return res.status(403).json({
//         success: false,
//         message: 'You are not authorized to update status for this application'
//       });
//     }

//     application.status = status.toLowerCase();
//     await application.save();

//     // DATABASE PERSISTENCE + CAPPED ARRAY LOGIC
//     const io = req.app.get("io");
//     if (application.applicant?._id) {
//       const userId = application.applicant._id;
      
//       await User.findByIdAndUpdate(userId, {
//         $push: {
//           notifications: {
//             $each: [{
//               message: `Your application for "${application.job?.title}" has been ${status}!`,
//               status: status,
//               jobId: application.job?._id,
//               read: false
//             }],
//             $slice: -15
//           }
//         }
//       });

//       if (io) {
//         io.to(userId.toString()).emit("applicationStatusUpdated", {
//           message: `Your application for "${application.job?.title}" has been ${status}!`,
//           status: status,
//           jobId: application.job?._id
//         });
//         console.log(`■ Emitted status update & saved notification for user: ${userId}`);
//       }
//     }

//     return res.status(200).json({
//       message: "Status updated successfully",
//       success: true
//     });
//   } catch (error) {
//     return res.status(500).json({
//       success: false,
//       message: `Backend error in updateStatus: ${error.message}`
//     });
//   }
// }
import Application from "../models/application.model.js";
import Job from "../models/job.model.js";
import User from "../models/user.model.js"; // ■ REQUIRED FOR NOTIFICATION DB UPDATE
import getDataUri from "../utils/datauri.js";
import cloudinary from "../utils/cloudinary.js";

export const applyJob = async (req, res) => {
  try {
    const userId = req.id;
    const { id: jobId } = req.params;

    let applicationData = req.body.applicationData ? JSON.parse(req.body.applicationData) : {};

    if (!jobId) {
      return res.status(404).json({ success: false, message: 'jobId is required' });
    }

    const existingApplication = await Application.findOne({ job: jobId, applicant: userId });
    if (existingApplication) {
      return res.status(400).json({ success: false, message: "User has already applied to this job" });
    }

    const isExistJob = await Job.findById(jobId);
    if (!isExistJob) {
      return res.status(404).json({ success: false, message: "This job does not exist" });
    }

    if (req.file) {
      const fileUri = getDataUri(req.file);
      const cloudResponse = await cloudinary.uploader.upload(fileUri.content, {
        resource_type: "auto"
      });
      applicationData.resumeLink = cloudResponse.secure_url;
      applicationData.resumeOriginalName = req.file.originalname;
    }

    const newApplication = await Application.create({
      job: jobId,
      applicant: userId,
      applicationData: applicationData
    });

    isExistJob.application.push(newApplication._id);
    isExistJob.applicant.push(newApplication?.applicant);
    await isExistJob.save();

    return res.status(201).json({
      success: true,
      message: 'Job applied successfully',
      id: newApplication._id,
      applicant: newApplication.job,
    });
  } catch (error) {
    return res.status(500).json({
      message: `Backend error in the applyJob function ${error.message}`,
      success: false
    });
  }
}

////get all applied jobs
export const getAppliedjobs = async (req, res) => {
  try {
    const userId = req.id;
    // ■ FIX: Corrected populate syntax so Job, Company, and Recruiter data is attached
    const application = await Application.find({ applicant: userId }).sort({ createdAt: -1 }).populate({
      path: 'job',
      options: { sort: { createdAt: -1 } },
      populate: [
        { path: 'company' },
        { path: 'created_by', select: 'fullname _id' }
      ]
    });

    if (!application) {
      return res.status(404).json({
        success: false,
        message: 'Current time user is not applied in any job'
      })
    };

    return res.status(200).json({
      success: true,
      message: "get all job which is applied by user successfully",
      application
    })
  }
  catch (error) {
    return res.status(401).json({
      success: false,
      message: 'backend error in the getAllJob function'
    })
  }
}

///get all applicant
export const getApplicant = async (req, res) => {
  try {
    const jobId = req.params.id;
    const recruiterId = req.id; // ■ Get logged-in recruiter ID

    const job = await Job.findById(jobId).populate({
      path: 'application',
      options: { sort: { createdAt: -1 } },
      populate: { path: 'applicant' }
    });

    if (!job) {
      return res.status(404).json({
        success: false,
        message: 'Job does not exist'
      });
    }

    // ■■■ SECURITY FIX: Verify Ownership ■■■
    if (job.created_by.toString() !== recruiterId.toString()) {
      return res.status(403).json({
        success: false,
        message: 'You are not authorized to view applicants for this job'
      });
    }

    return res.status(200).json({
      success: true,
      message: 'Applicants found successfully',
      job
    });
  }
  catch (error) {
    return res.status(500).json({
      success: false,
      message: 'backend error in the getApplicant function'
    })
  }
}

////updateStatus
export const updateStatus = async (req, res) => {
  try {
    const { status } = req.body;
    const applicationId = req.params.id;
    const recruiterId = req.id; // ■ Get logged-in recruiter ID

    if (!status) {
      return res.status(400).json({
        message: 'Status is required',
        success: false
      })
    };

    const application = await Application.findById(applicationId).populate('applicant job');

    if (!application) {
      return res.status(404).json({
        success: false,
        message: "Application not found"
      })
    }

    // ■■■ SECURITY FIX: Verify the recruiter owns the job associated with this application ■■■
    if (application.job.created_by.toString() !== recruiterId.toString()) {
      return res.status(403).json({
        success: false,
        message: 'You are not authorized to update status for this application'
      });
    }

    application.status = status.toLowerCase();
    await application.save();

    // DATABASE PERSISTENCE + CAPPED ARRAY LOGIC
    const io = req.app.get("io");
    if (application.applicant?._id) {
      const userId = application.applicant._id;

      // 1. Save to DB & Cap at 15 items automatically!
      await User.findByIdAndUpdate(userId, {
        $push: {
          notifications: {
            $each: [{
              message: `Your application for "${application.job?.title}" has been ${status}!`,
              status: status,
              jobId: application.job?._id,
              read: false
            }],
            $slice: -15 
          }
        }
      });

      // 2. Emit Real-Time Socket Event
      if (io) {
        io.to(userId.toString()).emit("applicationStatusUpdated", {
          message: `Your application for "${application.job?.title}" has been ${status}!`,
          status: status,
          jobId: application.job?._id
        });
        console.log(`■ Emitted status update & saved notification for user: ${userId}`);
      }
    }

    return res.status(200).json({
      message: "Status updated successfully",
      success: true
    })
  }
  catch (error) {
    return res.status(500).json({
      success: false,
      message: `backend error in the updateStatus ${error.message}`
    })
  }
}