const PEOPLE = require('../models/person');
const BLOGS = require('../models/blogs')
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

// Get function for all blogs
const readBlogs = async(req,res) => {
    try {
        await BLOGS.find({}).then((x) => {res.json({x});});
    } catch (error) {
        console.log(error);
    }
}

// Post function for creating blogs
const createBlog = async (req, res) => {
    try {
      const { title, content, author, img } = req.body;
  
      if (!title || !content) {
        // If either title or content is missing, send a bad request response
        return res.status(400).json({ error: 'Both title and content are required' });
      }
  
      // Assuming you have a model named BLOGS for MongoDB
      await BLOGS.create({ title: title, content: content, author: author, img: img});
  
      // Fetch all blogs after creating a new one
      const answer = await BLOGS.find({});
  
      res.json({ answer });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal server error' });
    }
  };

//   deletes a blog based off of the title
  const deleteBlog = async(req,res) => {
    try {
        const { id } = req.params;
        await BLOGS.findOneAndDelete({_id: id}); 
        let answer = await BLOGS.find({});
        res.json(answer);
    } catch (error) {
        console.log(error)
    }
}

module.exports = {createPeople, readPeople, updatePeople, deletePeople, getPerson, readBlogs, createBlog, deleteBlog}