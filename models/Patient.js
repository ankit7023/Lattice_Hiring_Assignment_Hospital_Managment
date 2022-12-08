const mongoose = require("mongoose")
const {ObjectId} = mongoose.Schema.Types

//! for email validation
const validateEmail = (email)=> {
    const re = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    return re.test(email)
};

//!for password validation
const validatePassword = (password)=> {
    const re = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,15}$/;
    return re.test(password)
};

const PatientSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    address:{
        type:String,
        min: [10, 'Too Short'],
        required:true
    },
    email:{
        type:String,
        unique: true,
        required:'Email address is required',
        validate: [validateEmail, 'Please fill a valid email address'],
        match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid email address']
    },
    phone:{
        type:String,
        min: 10,
        default:""
    },
    password:{
        type:String,
        validate: [validatePassword, 'Please fill a valid password'],
        match: [/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,15}$/, 'Please fill a valid password'],
        required:true
    },
    photo:{
        name: String,
        desc: String,
        img:
        {
           data: Buffer,
           contentType: String
        }
        // type:String,
        // required:true
    },
    underPsychiatrists:{
        type:ObjectId,
        ref:"Psychiatrists"
        // type:String,
        // default:""
    },
    underhospital:{
        type:ObjectId,
        ref:"hospital"
        //  type:String,
        //  default:""
     }
},{timestamps:true})

module.exports = mongoose.model("Patient", PatientSchema)