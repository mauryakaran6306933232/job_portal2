import mongoose from 'mongoose'

const applicationSchema = new mongoose.Schema({
    job : {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'Job',
        required : true
    },
    applicant : {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'User',
        required : true
    },
    status : {
        type : String,
        enum : ['pending' , 'interview' , 'accepted' , 'rejected'],
        default : 'pending'
    },
    // ■ NEW: Snapshot of candidate data at the time of application
    applicationData: {
        name: { type: String },
        email: { type: String },
        phone: { type: String },
        skills: [{ type: String }],
        coverLetter: { type: String },
        resumeLink: { type: String } // The URL of the resume they applied with
    }
},{timestamps : true});

const Application = mongoose.model("Application" ,applicationSchema);
export default Application;