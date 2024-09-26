const User = require('../models/User');
const Course = require('../models/Course');
const bcrypt = require('bcryptjs');

// Create Teacher (Admin only)
exports.createTeacher = async (req, res) => {
  const { name, email, password } = req.body;
  try {
    let user = await User.findOne({ email });
    if (user) return res.status(400).json({ msg: 'Teacher already exists' });

    user = new User({ name, email, password, role: 'Teacher' });

    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(password, salt);

    await user.save();

    res.status(201).json({ msg: 'Teacher created successfully', user });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ msg: 'Server error' });
  }
};

// Create a Course
exports.createCourse = async (req, res) => {
  const { title, description, startDate, endDate, teacher } = req.body;
  try {
    const newCourse = new Course({ title, description, startDate, endDate, teacher });
    await newCourse.save();
    res.status(201).json(newCourse);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ msg: 'Server error' });
  }
};

// Enroll a Student in a Course
exports.enrollStudent = async (req, res) => {
  const { studentId } = req.body;
  const { courseId } = req.params;
  try {
    const course = await Course.findById(courseId);
    if (!course) return res.status(404).json({ msg: 'Course not found' });

    course.enrolledStudents.push(studentId);
    await course.save();

    res.json({ msg: 'Student enrolled successfully' });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ msg: 'Server error' });
  }
};

// Remove a Student from a Course
exports.removeStudent = async (req, res) => {
  const { studentId } = req.body;
  const { courseId } = req.params;
  try {
    const course = await Course.findById(courseId);
    if (!course) return res.status(404).json({ msg: 'Course not found' });

    course.enrolledStudents = course.enrolledStudents.filter(id => id !== studentId);
    await course.save();

    res.json({ msg: 'Student removed successfully' });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ msg: 'Server error' });
  }
};
