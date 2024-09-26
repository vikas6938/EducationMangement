const Course = require('../models/Course');

// Enroll in a Course
exports.enrollInCourse = async (req, res) => {
  const { courseId } = req.params;
  try {
    const course = await Course.findById(courseId);
    if (!course) return res.status(404).json({ msg: 'Course not found' });

    course.enrolledStudents.push(req.user.userId);
    await course.save();

    res.json({ msg: 'Successfully enrolled in course' });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ msg: 'Server error' });
  }
};

// View Grades
exports.viewGrades = async (req, res) => {
  const { courseId } = req.params;
  try {
    const course = await Course.findById(courseId).populate('grades.student');
    if (!course) return res.status(404).json({ msg: 'Course not found' });

    const studentGrades = course.grades.filter(grade => grade.student._id.equals(req.user.userId));
    res.json({ grades: studentGrades });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ msg: 'Server error' });
  }
};
