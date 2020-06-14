var express = require("express");
var router = express.Router();
const { Campus, Student } = require("../database/models");

// Endpoint for getting all students
router.get("/", async (req, res, next) => {
    try {
        const students = await Student.findAll(/*{ include: Campus }*/);
        console.log(students);

        res.status(200).json(students);
    } catch (error) {
        next(error);
    }
});

// Endpoint for getting one student based on their ID
router.get("/:id", async (req, res, next) => {
    const { id } = req.params;

    try {
        const student = await Student.findByPk(id, { include: Campus });
        res.status(200).json(student);
    } catch (error) {
        next(error);
    }
});

// Endpoint for adding a new student
router.post("/", async (req, res, next) => {
    const { firstName, lastName, email, imageUrl, gpa } = req.body;

    const newStudent = {
        firstName: firstName,
        lastName: lastName,
        email: email,
        imageUrl: imageUrl,
        gpa: gpa,
    };

    try {
        const students = await Student.create(newStudent);

        res.status(201).send(students);
    } catch (error) {
        next(error);
    }
});

// Endpoint for updating a student based on their ID
router.put("/:id", async (req, res, next) => {
    const { id } = req.params;

    const { firstName, lastName, email, imageUrl, gpa } = req.body;

    const changeStudent = {
        firstName: firstName,
        lastName: lastName,
        email: email,
        imageUrl: imageUrl,
        gpa: gpa,
    };

    try {
        const student = await Student.findByPk(id);

        await student.set(changeStudent);
        const updatedStudent = await student.save();

        res.status(201).send(updatedStudent);
    } catch (error) {
        next(error);
    }
  
    //const { id } = req.params;
    //const { campusId } = req.body;
    //const updatedObj = { campusId: campusId };
    //try {
    //    const student = await Student.findByPk(id);
    //    await student.set(updatedObj);
    //    const updatedStudent = await student.save();
    //    res.status(201).send(updatedStudent);
    //} catch (err) {
    //    next(err);
    //}
});

// Endpoint for deleting a student based on their ID
router.delete("/:id", async (req, res, next) => {
    const { id } = req.params;

    try {
        const student = await Student.findByPk(id);

        await student.destroy();

        res.sendStatus(204);
    } catch (error) {
        next(error);
    }
});

module.exports = router;