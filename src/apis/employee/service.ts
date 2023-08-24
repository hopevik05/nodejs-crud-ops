import { employeesStore } from "../../common/data/db";
import { BaseEmployee, Employee } from "./interface";

let currentEmpId = 1;

export const findAll = async (): Promise<Employee[]> =>
  Object.values(employeesStore);

export const find = async (employeeId: string): Promise<Employee> =>
  employeesStore[employeeId];

export const create = async (newItem: BaseEmployee): Promise<Employee> => {
  const employeeId = `emp-${currentEmpId + 1}`;
  const newEmployee: Employee = {
    employeeId,
    employeeName: newItem.employeeName,
    age: newItem.age,
    email: newItem.email || "",
    degreeDetails: newItem.degreeDetails || [],
    salaryAmount: newItem.salaryAmount || 0,
  };
  employeesStore[employeeId] = newEmployee;
  currentEmpId = currentEmpId + 1;
  return employeesStore[employeeId];
};

export const update = async (
  employeeId: string,
  itemUpdate: BaseEmployee,
  existingItem: BaseEmployee
): Promise<Employee | null> => {
  const updatedEmployee: Employee = {
    employeeId,
    employeeName: itemUpdate.employeeName || existingItem.employeeName,
    age: itemUpdate.age || existingItem.age,
    email: itemUpdate.email || existingItem.email,
    degreeDetails: itemUpdate.degreeDetails || existingItem.degreeDetails,
    salaryAmount: itemUpdate.salaryAmount || existingItem.salaryAmount,
  };
  employeesStore[employeeId] = updatedEmployee;
  return employeesStore[employeeId];
};

export const remove = async (employeeId: string): Promise<null | void> => {
  delete employeesStore[employeeId];
};
