import express from "express";
import EmployeesController from "./controllers";
import {
  validateRequestAddEmployee,
  validateRequestUpdateEmployee,
} from "./validations";

const employeesRouter = express.Router();

const employeesController = new EmployeesController();

employeesRouter.post(
  "/",
  validateRequestAddEmployee,
  employeesController.addEmployee
);

employeesRouter.get("/", employeesController.getAllEmployees);
employeesRouter.get("/:employeeId", employeesController.getEmployeeById);

employeesRouter.put(
  "/:employeeId",
  validateRequestUpdateEmployee,
  employeesController.updateEmployee
);
employeesRouter.delete("/:employeeId", employeesController.deleteEmployee);

export default employeesRouter;
