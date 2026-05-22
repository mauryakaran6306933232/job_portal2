import mongoose from 'mongoose'
const companySchema = new mongoose.Schema({
    name : {
        type : String,
        required : true,
        unique : true
    },
    description : {
        type : String,
       
    },
    location : {
        type : String,
       
    },
    logo : {
        type : String,
    },
    userId : {
        required : true ,
        type : mongoose.Schema.Types.ObjectId,
        ref : "User"
    }
},{timestamps : true});
const Company = mongoose.model('Company' , companySchema);
export default Company;