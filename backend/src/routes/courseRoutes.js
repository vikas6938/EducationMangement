const express = require('express');
const { createCourse, getCourses } = require('../controllers/courseController');

const { auth, role } = require('../middleware/authMiddleware');
const router = express.Router();

router.post('/', auth, role(['Admin']), createCourse);
router.get('/', auth, getCourses);

module.exports = router;
