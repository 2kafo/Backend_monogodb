const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const To_do_listSchema = new Schema({
  
    name:{
        type:String,
        required:true
    },
    status:{
        type:String,
        required:true
    }
});

module.exports = mongoose.model('To_do_list', To_do_listSchema);