const express = require("express");
const router = express.Router();
const studentsModel = require("../models/students");

//getAllStudents
router.get("/", async (req, res) => {
  try {
    const students = await studentsModel.find();
    res.status(200).json(students);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

//ADD NEW STUDENTS
router.post("/", async (req, res) => {
  const newStudent = new studentsModel({
    name: req.body.name,
    enrolledDepartment: req.body.enrolledDepartment,
    enrollmentDate: req.body.enrollmentDate,
  });

  try {
    const student = await newStudent.save();
    res.status(201).json(student);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

//GET STUDENTS BY ID
router.get("/:id", getStudent, (req, res) => {
  try {
    res.status(200).json(res.student);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

//UPDATE STUDENT
router.patch("/:id", getStudent, async (req, res) => {
  if (req.body.name != null) {
    res.student.name = req.body.name;
  }
  if (req.body.enrolledDepartment != null) {
    res.student.enrolledDepartment = req.body.enrolledDepartment;
  }
  if (req.body.enrollmentDate != null) {
    res.student.enrollmentDate = req.body.enrollmentDate;
  }

  try {
    const updatedStudent = await res.student.save();
    res.status(201).json(updatedStudent);
  } catch (error) {
    res.status(401).json({ message: error.message });
  }
});

//DELETE STUDENTS
router.delete("/:id", getStudent, async (req, res) => {
  try {
    await res.student.deleteOne();
    res
      .status(200)
      .json({ message: `Deleted user with the name ${res.student.name}` });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

async function getStudent(req, res, next) {
  let student;
  try {
    student = await studentsModel.findById(req.params.id);
    if (student == null) {
      return res
        .status(404)
        .json({ message: `cannot find user with the id ${req.params.id}` });
    }
  } catch (error) {
    return response.status(500).json({ message: error.message });
  }
  res.student = student;
  next();
}

module.exports = router;
