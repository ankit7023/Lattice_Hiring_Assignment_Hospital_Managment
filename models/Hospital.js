const mongoose = require("mongoose")
const {ObjectId} = mongoose.Schema.Types

const HospitalSchema = new mongoose.Schema({
    hospitalName:{
        type:String,
        required:true,
        unique:true
    }
},{timestamps: true})

module.exports = mongoose.model("Hospital", HospitalSchema)