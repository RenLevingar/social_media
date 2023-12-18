const express = require('express');
const router = express.Router();

const {createPeople, readPeople, updatePeople, deletePeople, getPerson, readBlogs, createBlog, deleteBlog, updateBlog} = require('../controllers/tasks');

// People
router.get('/', readPeople);
router.post('/', createPeople);
router.get('/blog', readBlogs)
router.post('/blog', createBlog)
router.put('/blog/:id', updateBlog);
router.delete('/blog/:id', deleteBlog);

module.exports = router;