const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const UserSchema = mongoose.Schema(
    {
        fullname: {
            type: String,
            required: [true, "Please enter the name of the user"]
        },

        email: {
            type: String,
            required:true

        },
        password: {
            type: String,
            required: true

        }
    },
    {
        timestamps: true
    }
);
module.exports = mongoose.model('user', UserSchema);