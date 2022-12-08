const express = require('express');
const app = express();
const mongoose = require('mongoose')
const Patient = require("./models/Patient")
const Psychiatrist = require("./models/Psychiatrist")
const Hospital = require("./models/Hospital")
const dotenv = require("dotenv")
dotenv.config({path:"./config.env"})

require("./db/connection")

// app.get('/', (req, res)=> {
//     res.send('Hello World')
// })
app.use(express.json());

//! api to add new patient in their respective psychiatrists doctor
app.post("/addPatient", async(req, res)=>{
    const {name, address, email, phone, password, photo} = req.body
    try{
        if(!name || !address || !email || !password || !photo){
            return res.status(422).json({error:"plzz add all the fields"})
        }

        // const findEmail = await Patient.findOne(email)
        // if(!findEmail){
        //     return res.status(422).json({error:"Patient Already Exists"})
        // }
    
        const newPatient = new Patient({
            name:name, 
            address:address, 
            email:email, 
            phone:phone, 
            password:password, 
            photo:photo,
            //underhospital:1
        })
    
        const newPatientSaved = await newPatient.save();
        res.status(200).json(newPatientSaved);
    }
    catch(err){
        res.status(500).json(err);
    }
})

//! to Fetch all the psychiatrists, their count along with IDs and patient details for a hospital. 
app.get("/psychiatristsAtHospital", async(req, res)=>{
    const hospital_id = req.body._id
    const hospital = await Hospital.findById(hospital_id)
    if(!hospitalName){
        return res.status(422).json({error:"Hospital Dosn't Exists"})
    }

    const HospitalName = hospital.hospitalName
    const TotalPsychiatristcount = await Psychiatrist.find({"atHospital":hospital_id}).count()
    const TotalPatientcount = await Psychiatrist.find({"underhospital":hospital_id}).count()
    const PsychiatristDetail = await Psychiatrist.find({"atHospital":hospital_id})
    PsychiatristDetail.password = undefined
    PsychiatristDetail.email = undefined
    PsychiatristDetail.atHospital = undefined

    res.status(200).json({HospitalName, TotalPsychiatristcount, TotalPatientcount, PsychiatristDetail});

})

app.listen(3000, ()=> {  
    console.log('listening on 3000')
})

