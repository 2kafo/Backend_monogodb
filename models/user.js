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
    
            default: "technical@assesment.com"
        },
        password: {
            type: String,
            default: "1234"
        }
    },
    {
        timestamps:true
    }
);
module.exports = mongoose.model('user', UserSchema);