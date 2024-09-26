const express = require('express');
const { createTeacher, createCourse, enrollStudent, removeStudent } = require('../controllers/adminController');
const { auth, role } = require('../middleware/authMiddleware');
const router = express.Router();

// Create Teacher (Admin only)
router.post('/teachers', auth, role(['Admin']), createTeacher);

// Create a Course (Admin only)
router.post('/courses', auth, role(['Admin']), createCourse);

// Enroll Student in Course (Admin only)
router.post('/courses/:courseId/enroll', auth, role(['Admin']), enrollStudent);

// Remove Student from Course (Admin only)
router.post('/courses/:courseId/remove', auth, role(['Admin']), removeStudent);

module.exports = router;
