import mongoose from 'mongoose';

let isConnected = false ;
// this will allow us to track the connection status 

export const connectToDB = async() =>{
    mongoose.set('strictQuery',true);
    if(isConnected){
        console.log('mongodb is already connected ')
        return ;
    }
    // if not connected 
    try {
        await mongoose.connect(process.env.MONGODB_URI,{
            dbName : "share_prompt",
            useNewUrlParser:true,
            useUnifiedTopology : true,
        })
        // if the above executes correctly 
        isConnected= true;
        console.log('mongodb connected')
        // uri of our actual database 
    } catch (error) {
        console.log(error);
    }
}
// now ofcourse we don not have MONGODB_URI or the database we want to connect to to be able to say those 
// users so what we can do is head to the mongodb atlas which is an online  cloud storage to crete 
// our own databasse so lets do that right away 
// mongodb.com/atlas
// click try free 
// AND MAKE A CONNECTION TO THE mongogb database 