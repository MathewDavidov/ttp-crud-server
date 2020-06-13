const Sequelize = require("sequelize");
const db = require("../db");

// A student model containing a firstName, lastName, email, imageURL, and gpa.
// TODO: Add constraint to email and gpa
const Student = db.define("student", {
  firstName: { type: Sequelize.STRING, allowNull: false },
  lastName: { type: Sequelize.STRING, allowNull: false },
  email: { type: Sequelize.STRING, allowNull: false },
  imageUrl: {
    type: Sequelize.STRING,
    defaultValue: "https://via.placeholder.com/480x240?text=Placeholder",
  },
  gpa: { type: Sequelize.DECIMAL }
});

module.exports = Student;
