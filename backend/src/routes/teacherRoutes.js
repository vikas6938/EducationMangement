const express = require('express');
const { updateContent, assignGrade } = require('../controllers/teacherController');
const { auth, role } = require('../middleware/authMiddleware');
const router = express.Router();

// Update Course Content (Teacher only)
router.put('/courses/:courseId/content', auth, role(['Teacher']), updateContent);

// Assign Grade to Student (Teacher only)
router.post('/courses/:courseId/grade', auth, role(['Teacher']), assignGrade);

module.exports = router;
