import { Request, Response } from "express";
import { handleError } from "../../common/exceptions/error";
import { BaseEmployee, Employee } from "./interface";
import * as EmployeeService from "./service";

export default class EmployeesController {
  getAllEmployees = async (_req: Request, res: Response) => {
    try {
      const items: Employee[] = await EmployeeService.findAll();
      res.status(200).send(items);
    } catch (error) {
      handleError(res, error);
    }
  };

  getEmployeeById = async (req: Request, res: Response) => {
    try {
      const { employeeId } = req.params;
      const item: Employee = await EmployeeService.find(employeeId);
      if (item) {
        return res.status(200).send(item);
      }
      res.status(404).send({
        status: "fail",
        message: `No employee with ${employeeId} was found`,
      });
    } catch (error) {
      handleError(res, error);
    }
  };

  addEmployee = async (req: Request, res: Response) => {
    try {
      const item: BaseEmployee = req.body;

      const newItem = await EmployeeService.create(item);

      res.status(201).json(newItem);
    } catch (error) {
      handleError(res, error);
    }
  };

  updateEmployee = async (req: Request, res: Response) => {
    try {
      const { employeeId } = req.params;

      const itemUpdate: Employee = req.body;

      const existingItem: Employee = await EmployeeService.find(employeeId);

      if (existingItem) {
        const updatedItem = await EmployeeService.update(
          employeeId,
          itemUpdate,
          existingItem
        );
        return res.status(200).json(updatedItem);
      }
      res.status(404).send({
        status: "fail",
        message: `No employee with ${employeeId} was found`,
      });
    } catch (error) {
      handleError(res, error);
    }
  };
  deleteEmployee = async (req: Request, res: Response) => {
    try {
      const { employeeId } = req.params;
      const item: Employee = await EmployeeService.find(employeeId);
      if (item) {
        await EmployeeService.remove(employeeId);
        return res.sendStatus(204);
      }
      res.status(404).send({
        status: "fail",
        message: `No employee with ${employeeId} was found`,
      });
    } catch (error) {
      handleError(res, error);
    }
  };
}
