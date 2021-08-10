const express = require('express');
const dotenv = require('dotenv');
dotenv.config();
const quiz = require('./routes/quiz');
const db = require('./db/db');

const app = express();



const PORT = process.env.PORT || 5001;
const HOST = process.env.HOST || "127.0.0.1";


app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(quiz)


app.listen(PORT,HOST,()=>{
    console.log(`Server is up on ${HOST}:${PORT}`);
});