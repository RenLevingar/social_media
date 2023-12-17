const express = require('express');
const router = express.Router();

const {createPeople, readPeople, updatePeople, deletePeople, getPerson, createBlog} = require('../controllers/tasks');

// People
router.get('/', readPeople);
router.post('/', createPeople);
router.put('/:id', updatePeople);
router.delete('/:id', deletePeople);
router.get('/:id', getPerson);
router.post('/blog', createBlog)

module.exports = router;