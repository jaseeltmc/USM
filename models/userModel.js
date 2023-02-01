const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({

    name: {
        type:String,
        rquired:true
    },
    email:{
        type:String,
        required:true
    },
    mobile:{
        type:String,
        required:true
    },
    password: {
        type:String,
        rquired:true
    },
    is_admin:{
        type:Number,
        rquired:true
    },
  

});

module.exports = mongoose.model('User',userSchema)