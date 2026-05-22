import mongoose from 'mongoose'
const jobSchema = new mongoose.Schema({
    title:{
        type : String,
        required : true
    },
    description : {
        type : String,
        required : true
    },
    salary : {
        type : Number,
        required : true
    },
    location : {
        type : String,
        required : true
    },
    requirements : [{
        type : String
    }],
    jobType : {
        type : String , required : true
    },
     status: {
            type: String,
            enum: ['draft', 'published', 'archived'],
            default: 'draft' // Jobs are drafts until explicitly published!
        },
    experienceLevel :{
        type : Number ,
        required : true
    },
    position : {
        type : Number,
        required : true
    },
    company : {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'Company',
        required : true
    },
    created_by :{
        type : mongoose.Schema.Types.ObjectId,
        ref : "User",
        required : true
    },
    application : [{
        type : mongoose.Schema.Types.ObjectId,
        ref : 'Application'
    }],
    applicant: [{
  type: mongoose.Schema.Types.ObjectId,
  ref: 'User'
}]
} ,{timestamps : true});
const Job = mongoose.model('Job' , jobSchema);
export  default  Job;