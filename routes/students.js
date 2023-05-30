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
router.get("/:id", (req, res) => {
  res.send(`Displaying student with id ${req.params.id}`);
});

//UPDATE STUDENT
router.patch("/:id", (req, res) => {
  res.send(`Updating student with id ${req.params.id}`);
});

//DELETE STUDENTS
router.delete("/:id", (req, res) => {
  res.send(`Deleting student with id ${req.params.id}`);
});

module.exports = router;
