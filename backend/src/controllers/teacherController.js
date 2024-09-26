const Course = require('../models/Course');

// Update Course Content (Assignments/Quizzes)
exports.updateContent = async (req, res) => {
  const { content } = req.body;
  const { courseId } = req.params;
  try {
    const course = await Course.findById(courseId);
    if (!course) return res.status(404).json({ msg: 'Course not found' });

    course.content = content;
    await course.save();

    res.json({ msg: 'Course content updated' });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ msg: 'Server error' });
  }
};

// Assign Grade to Student
exports.assignGrade = async (req, res) => {
  const { studentId, grade } = req.body;
  const { courseId } = req.params;
  try {
    const course = await Course.findById(courseId);
    if (!course) return res.status(404).json({ msg: 'Course not found' });

    // Assign grade logic (either push to a grades array or update it)
    // Example
    course.grades.push({ student: studentId, grade });
    await course.save();

    res.json({ msg: 'Grade assigned successfully' });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ msg: 'Server error' });
  }
};
