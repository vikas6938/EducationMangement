const mongoose = require('mongoose');
const { Schema } = mongoose;

const teacherSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  specialization: { type: String, required: true }, // Area of expertise, e.g., "Mathematics"
  assignedCourses: [{ type: Schema.Types.ObjectId, ref: 'Course' }], // Courses the teacher is teaching
});

module.exports = mongoose.model('Teacher', teacherSchema);
