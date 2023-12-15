const express = require('express');
const router = express.Router();

const {createPeople, readPeople, updatePeople, deletePeople, getPerson} = require('../controllers/tasks');

// People
router.get('/', readPeople);
router.post('/', createPeople);
router.put('/:id', updatePeople);
router.delete('/:id', deletePeople);
router.get('/:id', getPerson);

module.exports = router;