const PEOPLE = require('../models/person');
require("dotenv").config();

// Get function for all people
const readPeople = async(req,res) => {
    try {
        console.log(PEOPLE)
        await PEOPLE.find({}).then((x) => {res.json({x});});
    } catch (error) {
        console.log(error);
    }
}


// Post function for creating people
const createPeople = async(req,res) => {
    try {
        userId = await PEOPLE.find({});
        const { name } = req.body; 
        const { age } =req.body;
        const { email } = req.body;
        const { password } = req.body;
        console.log(password)
        await PEOPLE.create({name: name, age: age, email: email, password: password, id: userId.length+1});
        let answer = await PEOPLE.find({})
        res.json(answer);
     } catch (error) {
         console.log(error);
     }
}

// Put function for updating people
const updatePeople = async(req,res) => {
    try {
        const { id } = req.params;
        let { name, age, task } = req.body; 
        let thisPerson = await PEOPLE.findOne({id: id});

        if(!name){
            name = thisPerson.name;
        }
        if(!age){
            age = thisPerson.desc;
        }
        if(!task){
            task = thisPerson.task;
        }

       await PEOPLE.findOneAndUpdate({id: id},{name: name, age:age, task: task});
       await TASKS.findOneAndUpdate({id: task}, {person: id});
       let answer = await PEOPLE.find({})
       res.json(answer);
    } catch (error) {
        console.log(error)
    }
}

// Delete function for removing people
const deletePeople = async(req,res) => {
    try {
        const { id } = req.params;
        const { task} = req.params;
        await PEOPLE.findOneAndDelete({id: id}); 
        let answer = await PEOPLE.find({});
        res.json(answer);
    } catch (error) {
        console.log(error)
    }
}

// Gets one task
const getPerson = async(req,res) => {
    try {
        const { id } = req.params;
        let answer = await PEOPLE.findOne({id});
        res.json({answer});
    } catch (error) {
        console.log(error);
    }
}

module.exports = {createPeople, readPeople, updatePeople, deletePeople, getPerson}