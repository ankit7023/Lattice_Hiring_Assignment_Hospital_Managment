const mongoose = require("mongoose")
const {ObjectId} = mongoose.Schema.Types

const PsychiatristSchema = new mongoose.Schema({
    doctorName:{
        type:String,
        required:true,
        unique:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true
    },
    atHospital:
    {
        type:ObjectId,
        ref:"Hospital"
    },
    patientDetails:[
        {
            type:ObjectId,
            ref:"Patient"
        }
    ]
},{timestamps: true})

module.exports = mongoose.model("Psychiatrist", PsychiatristSchema)