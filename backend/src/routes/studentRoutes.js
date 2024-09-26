const express = require('express');
const { enrollInCourse, viewGrades } = require('../controllers/studentController');
const { auth, role } = require('../middleware/authMiddleware');
const router = express.Router();

// Enroll in Course (Student only)
router.post('/courses/:courseId/enroll', auth, role(['Student']), enrollInCourse);

// View Grades (Student only)
router.get('/courses/:courseId/grades', auth, role(['Student']), viewGrades);

module.exports = router;
