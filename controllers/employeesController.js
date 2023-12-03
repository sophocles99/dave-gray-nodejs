const Employee = require("../model/Employee");

const getAllEmployees = async (req, res) => {
  const employees = await Employee.find({});
  res.json(employees);
};

const createNewEmployee = async (req, res) => {
  const { firstname, lastname } = req.body;
  if (!firstname || !lastname) {
    return res
      .status(400)
      .json({ message: "First and last names are required" });
  }
  const employee = await Employee.create({ firstname, lastname });
  res.status(201).json(employee);
};

const updateEmployee = async (req, res) => {
  const employee = await Employee.findById(req.body.id);
  if (!employee) {
    return res
      .status(400)
      .json({ message: `Employee ID ${req.body.id} not found` });
  }
  if (req.body.firstname) employee.firstname = req.body.firstname;
  if (req.body.lastname) employee.lastname = req.body.lastname;
  await employee.save();
  res.json(employee);
};

const deleteEmployee = async (req, res) => {
  const employee = await Employee.findByIdAndDelete(req.body.id);
  if (!employee) {
    return res
      .status(400)
      .json({ message: `Employee ID ${req.body.id} not found` });
  }
  res.sendStatus(204);
};

const getEmployee = (req, res) => {
  const employee = Employee.findById(req.params.id);
  if (!employee) {
    return res
      .status(400)
      .json({ message: `Employee ID ${req.params.id} not found` });
  }
  res.json(employee);
};

module.exports = {
  getAllEmployees,
  createNewEmployee,
  updateEmployee,
  deleteEmployee,
  getEmployee,
};
