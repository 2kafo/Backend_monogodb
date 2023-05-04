require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const To_do_list = require('./models/to_do_list');
const user = require('./models/user');


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
        await user.insertMany([
            {
                fullname:"Amani Kafonogo",
                username:"technical@assesment.com",
                password:"1234"
            }
        ])
        res.send("User created")
    } catch (error) {
        console.log('err', error);
    }
});

//Auth login users
app.get('/user', (req, res) =>{
    res.send(' user login user')
});

//create a new user
app.post('/user-save', async (req, res) => {
    try {
        res.send('Task_to_do_create_user')
    } catch (error) {
        console.log('err', error);
    }
});



//API FOR TO DO LIST MANIPULATION

//insert deafult to do task to user loged in
app.get('/add-task', async (req, res) => {
    try {
        await To_do_list.insertMany([
            {
                name: "Get technical assessment started",
                status: "Not completed"
            }
        ])
        res.send('Task added');
    } catch (error) {
        console.log('err', error);
    }
});

//api for viewing to do list
app.get('/view-task', async (req, res) => {
    const to_do_list = To_do_list.find();

    if(to_do_list){
        res.json.stringfy(to_do_list);
    }else{
        res.send('something went wrong');
    }
});
//CONNECTION TO DATABASE
connectDB().then(() => {
    app.listen(PORT, () => {
        console.log(`Listening to port:${PORT}`);
    });
});