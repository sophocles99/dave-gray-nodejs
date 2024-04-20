const Employee = require("../model/Employee");
const { isValidObjectId } = require("mongoose");

const getAllEmployees = async (req, res) => {
  const employees = await Employee.find({});
  if (!employees) {
    return res.status(204).json({ message: "No employees found" });
  }
  res.json(employees);
};

const createNewEmployee = async (req, res) => {
  if (!req.body?.firstname || !req.body?.lastname) {
    return res
      .status(400)
      .json({ message: "First and last names are required" });
  }
  const { firstname, lastname } = req.body;
  const employee = await Employee.create({ firstname, lastname });
  res.status(201).json(employee);
};

const updateEmployee = async (req, res) => {
  if (!req.body?.id) {
    return res.status(400).json({ message: "id is required" });
  }
  if (!isValidObjectId(req.body.id)) {
    return res.status(400).json({ message: "invalid id" });
  }
  const employee = await Employee.findById(req.body.id);
  if (!employee) {
    return res
      .status(404)
      .json({ message: `Employee ID ${req.body.id} not found` });
  }
  if (req.body.firstname) employee.firstname = req.body.firstname;
  if (req.body.lastname) employee.lastname = req.body.lastname;
  await employee.save();
  res.json(employee);
};

const deleteEmployee = async (req, res) => {
  if (!req.body?.id) {
    return res.status(400).json({ message: "id is required" });
  }
  if (!isValidObjectId(req.body.id)) {
    return res.status(400).json({ message: "invalid id" });
  }
  const employee = await Employee.findByIdAndDelete(req.body.id);
  if (!employee) {
    return res
      .status(400)
      .json({ message: `Employee ID ${req.body.id} not found` });
  }
  res.json(employee);
};

const getEmployee = async (req, res) => {
  if (!req.params?.id) {
    return res.status(400).json({ message: "id parameter is required" });
  }
  if (!isValidObjectId(req.params.id)) {
    return res.status(400).json({ message: "invalid id" });
  }
  const employee = await Employee.findById(req.params.id);
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
