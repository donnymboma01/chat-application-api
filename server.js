const express = require('express');
require('dotenv').config();
const cors = require('cors');
const connectDB = require('./config/database');
const UserRoutes = require('./routes/userRoutes'); 
const app = express();

const port = process.env.port || 5000;

connectDB();

app.use(express.json());
app.use(cors());
app.use('/api/',UserRoutes);

app.get('/',(req,res)=>{
    res.send(`<h1> Hello, welcome to the chat application </h1>`);
});

app.listen(port,()=>{
    console.log(`The app running on http://localhost:${port}`);
});