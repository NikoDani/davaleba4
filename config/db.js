    const { default: mongoose } = require("mongoose");
require('dotenv').config();


module.exports= async () => {
    try{
        await mongoose.connect(process.env.MONGO_URL);  
        console.log('connected to the database');

    }catch(e){
        console.log('could not connect to the database', e);
    }
}