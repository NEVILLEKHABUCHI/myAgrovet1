const mongoose=require('mongoose');

//Connecting to MongoDB

const connectDB=async()=>{
    try{
        const dbUrl='mongodb+srv://Nevoline_agrovet:Khabuchi@cluster0.3wznhua.mongodb.net/Nevoline_Agrovet?retryWrites=true&w=majority&appName=Cluster0';
        await mongoose.connect(dbUrl);
        console.log('MongoDB connected successfully');
    }catch(err){
        console.error('Error connecting to mongoDB: ',err.message);
        process.exit(1); //Exit process with failure
    }
}

module.exports=connectDB;