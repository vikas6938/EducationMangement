const Course = require('../models/Course');

exports.createCourse = async (req, res) => {
  const { title, description, startDate, endDate, teacher } = req.body;
  try {
    const newCourse = new Course({ title, description, startDate, endDate, teacher });
    await newCourse.save();
    res.status(201).json(newCourse);
  } catch (err) {
    res.status(500).json({ msg: 'Server error' });
  }
};

exports.getCourses = async (req, res) => {
  try {
    const courses = await Course.find().populate('teacher').populate('enrolledStudents');
    res.json(courses);
  } catch (err) {
    res.status(500).json({ msg: 'Server error' });
  }
};
