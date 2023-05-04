const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const To_do_listSchema = mongoose.Schema(
    {
        name: {
            type: String,
            required: [true, "Please enter the name of the task"]
        },
        status: {
            type: String,
            default: "Uncompleted"
        }
    },{
        timestamps: true
    }
);

module.exports = mongoose.model('To_do_list', To_do_listSchema);