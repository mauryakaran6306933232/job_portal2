import mongoose from 'mongoose'
async function mongodb_connection(database_name)
  {
      try{
     await  mongoose.connect(`${process.env.MONGODB_PATH}${database_name}`)
      }
      catch(error){
         console.log(error);
      }
  }
export default mongodb_connection  