const express = require('express');
const router = express.Router();

const {createPeople, readPeople, updatePeople, deletePeople, getPerson, readBlogs, createBlog, deleteBlog} = require('../controllers/tasks');

// People
router.get('/', readPeople);
router.post('/', createPeople);
router.get('/blog', readBlogs)
router.post('/blog', createBlog)
router.delete('/blog/:id', deleteBlog);
// router.get('/:id', getPerson);
// router.put('/:id', updatePeople);
// router.delete('/:id', deletePeople);

module.exports = router;