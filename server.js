require('dotenv').config({ path: require('find-config')('.env') });
const express = require('express');
const cors = require('cors')
const mongoose = require('mongoose');
const userRoutes = require("./routes/user");
const authRoutes = require("./routes/auth");

const To_do_list = require('./models/to_do_list');
const User = require('./models/user');



//DATABASE CONNECTION
const app = express();
const PORT = process.env.PORT || 4000;
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended: false}))

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
app.use("/api/user", userRoutes);
app.use("/api/auth", authRoutes);


//API FOR MANUPULATION OF USERS



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
app.get('/view-tasks', async (req, res) => {
    try {
        const to_do_list = await To_do_list.find({});
        res.status(200).json(to_do_list);
    } catch (error) {
        console.log('err', error);
        res.status(500).json({message: error.message});
    }
});

//view a single to do item
app.get('/view-task/:id', async (req,res) => {
    try {
        const {id} = req.params
         const to_do_list = await To_do_list.findById(id);
        res.status(200).json(to_do_list);
    } catch (error) {
        console.log('err', error);
         res.status(500).json({message: error.message});
    }
});

//update a to do item
app.put('/update-task/:id', async (req, res) =>{
    try {
        const {id} = req.params;
        const to_do_list = await To_do_list.findByIdAndUpdate(id, req.body);
        //if item not found in db
        if(!to_do_list){
            return res.status(404).json({message:`We cannot find the task with such Id`});
        }
         res.status(200).json(to_do_list);
    } catch (error) {
        res.status(500).json({message: error.message});
    }
});

//delete a to do item
app.delete('/delete-item/:id', async(req, res) => {
    try {
        const {id} = req.params;
        const to_do_list = await To_do_list.findByIdAndDelete(id);
        if(!to_do_list){
            return res.status(404).json({message:`cannot find any to do list with such id`});
        
        }
        res.status(200).json(to_do_list);
    } catch (error) {
         res.status(500).json({message: error.message});
    }
});
//CONNECTION TO DATABASE
connectDB().then(() => {
    app.listen(PORT, () => {
        console.log(`Listening to port:${PORT}`);
    });
});