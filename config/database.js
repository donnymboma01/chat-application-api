const mongoose = require('mongoose');


const connexionDB = async () =>{

   try {
       
        const connexion = await mongoose.connect(process.env.MONGODB_CONNEXION_URI);
        console.log(`MongoDB successfully connected : ${connexion.connection.host}`);
        
   } catch (error) {
       console.log(`Error while connecting to the database : ${error}`);
       process.exit(1);
   }
};

module.exports = connexionDB;