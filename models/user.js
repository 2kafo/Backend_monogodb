const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const UserSchema = mongoose.Schema(
    {
        fullname: {
            type: String,
            required: [true, "Please enter the name of the user"]
        },
        username: {
            type: String,
              
        },
        email: {
            type: String,
              
        },
        password: {
            type: String,
           
        }
    },
    {
        timestamps:true
    }
);
module.exports = mongoose.model('user', UserSchema);