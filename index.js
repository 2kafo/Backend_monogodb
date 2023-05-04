require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const To_do_list = require('./models/to_do_list');

//DATABASE CONNECTION
const app = express();
const PORT = process.env.PORT || 3000;

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
app.get('/', (req, res) => {
    res.send({ title: 'To_do_list' });
});

//api for inserting to do list
app.get('/add-task', async (req, res) => {
    try {
        await To_do_list.insertMany([
            {
                name: "Get technical assessment started",
                status: "Not completed"
            },
            {
                name: "backend started",
                status: "Not completed"
            }
        ])
    } catch (error) {
        console.log('err', error)
    }
});

//api for viewing to do list
app.get('/view-task', async (req, res) => {
    const to_do_list = To_do_list.find();

    if(to_do_list){
        res.json(to_do_list)
    }else{
        res.send('something went wrong');
    }
})
//CONNECTION TO DATABASE
connectDB().then(() => {
    app.listen(PORT, () => {
        console.log(`Listening to port:${PORT}`);
    });
});