const express = require('express');
const app = new express();
const data = require('./hospitalDataset.json');
const fs = require('fs');
const logger = require('morgan');
app.use(logger('dev'));
app.use(express.json());

app.get('/hospitalDetail',(req,res)=>{
    res.send(data);
})

app.post('/hospitalDetail',(req,res)=>{
    data.push(req.body);
    fs.writeFile('hospitalDataset.json',JSON.stringify(data),(err,resp)=>{
        if(err){
            res.send("Data cannot be written!");
        }
        else{
            res.send("Data writtern successfully!");
        }
    })
})
app.put('/hospitalDetail/:name',(req,res)=>{
    let name =req.params.name;
    data.forEach((item)=>{
        if(item.NameofHospital==name){
            item.HospitalLocation = req.body.HospitalLocation;
            item.PatientCount = req.body.PatientCount;
        }
    })
    fs.writeFile('hospitalDataset.json',JSON.stringify(data),(err,resp)=>{
        if(err){
            res.send("Data Updation Failed!")
        }
        else{
            res.send("Updated Data Successfully!")
        }
        
    })
})

app.delete('/hospitalDetail/:name',(req,res)=>{
    let name = req.params.name;
    let value = data.filter(item=>item.NameofHospital !== name);
    fs.writeFile('hospitalDataset.json',JSON.stringify(value),(err,resp)=>{
        if(err){
            res.send("Cannot Delete Data!")
        }
        else{
            res.send("Successfully Deleted Data!")
        }
    })
})

app.listen(3000);
console.log("Server Listening to port 3000");