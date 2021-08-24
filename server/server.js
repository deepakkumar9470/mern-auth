require('dotenv').config();

const express = require('express');
const app = express();
const PORT = process.env.PORT || 8000
const cors = require('cors')
const morgan = require('morgan')
const connectDB = require('./db/db');
const userRoute = require('./routes/userRoute');
const {isAuthenticated} = require('./middlewares/user-middleware');
app.use(express.json());

app.use(morgan('dev'));
app.use(cors());

app.use('/api/auth', userRoute);
app.use(isAuthenticated);
// Connetion to db

connectDB();


app.get('/', (req,res) =>{
    res.send('hello')
})


app.listen(PORT, ()=>{
    console.log(`Server started at ${PORT}`)
})