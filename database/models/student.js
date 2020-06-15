const Sequelize = require("sequelize");
const db = require("../db");

// A student model containing a firstName, lastName, email, imageURL, and gpa.
const Student = db.define("student", {
  firstName: { 
    type: Sequelize.STRING, 
    allowNull: false 
  },
  lastName: { 
    type: Sequelize.STRING, 
    allowNull: false 
  },
  email: { 
    type: Sequelize.STRING,
    allowNull: false, 
    unique: true,
    validate: {
      isEmail: true,
    }
  },
  imageUrl: {
    type: Sequelize.STRING,
    defaultValue: "https://via.placeholder.com/150x150?text=Placeholder",
  },
  gpa: { 
    type: Sequelize.DECIMAL, 
    validate: {
      max: 4.0,
      min: 0.0,
      len: [0, 4],
      isDecimal: true,
    }
  }
});

module.exports = Student;
