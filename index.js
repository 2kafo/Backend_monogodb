require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const To_do_list = require('./models/to_do_list');
const user = require('./models/user');
const to_do_list = require('./models/to_do_list');


//DATABASE CONNECTION
const app = express();
const PORT = process.env.PORT || 3000;
app.use(express.json());

mongoose.set('strictQuery', false);

const connectDB = async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGO_URI);
        console.log(`Mongo_DB connected: ${conn.connection.host}`);
    } catch (error) {
        console.log(error);
        process.exit(1);
    }
}

//ROUTES CONNECTION(API)

//landing route
app.get('/', (req, res) => {
    res.send("Put url for front-end");
});


//API FOR MANUPULATION OF USERS

//insert user
app.post('/user-create', async(req, res) => {
    try {
       const user = await user.create(req.body);
        res.status(200).json(user);
    } catch (error) {
        console.log('err', error);
    }
});

//Auth login users
app.get('/user-login', (req, res) =>{
    res.send(' user login user')
});

//create a new user
app.post('/user-save', async (req, res) => {
    try {
        res.send('Task_to_do_create_user');
        
    } catch (error) {
        console.log('err', error);
    }
});



//API FOR TO DO LIST MANIPULATION

//create to do item
app.post('/add-task', async (req, res) => {
    try {
        const to_do_list = await To_do_list.create(req.body);
        res.status(200).json(to_do_list);
        
    } catch (error) {
        console.log('err', error);
    }
});

//view to do items
app.get('/view-task', async (req, res) => {
    try {
        const to_do_list = await To_do_list.find({});
        res.status(200).json(to_do_list);
    } catch (error) {
        console.log('err', error);
        res.status(500).json(to_do_list);
    }
});
//CONNECTION TO DATABASE
connectDB().then(() => {
    app.listen(PORT, () => {
        console.log(`Listening to port:${PORT}`);
    });
});