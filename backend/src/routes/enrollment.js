// routes/enrollment.js
const express = require('express');
const { protect, authorize } = require('../middleware/auth');
const Course = require('../models/Course');
const User = require('../models/User');

const router = express.Router();

// Enroll a student in a course (Admin only)
router.post('/register', protect, authorize('Admin'), async (req, res) => {
  const { courseId, studentId } = req.body;

  try {
    const course = await Course.findById(courseId);
    const student = await User.findById(studentId);

    if (!course || !student) {
      return res.status(404).json({ message: 'Course or student not found' });
    }

    if (!course.students.includes(studentId)) {
      course.students.push(studentId);
      await course.save();
      return res.json({ message: 'Student enrolled successfully' });
    } else {
      return res.status(400).json({ message: 'Student is already enrolled' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
