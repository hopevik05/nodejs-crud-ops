export interface BaseEmployee {
  employeeName: string;
  age: number;
  email?: string;
  salaryAmount?: number;
  degreeDetails?: string[];
}

export interface Employee extends BaseEmployee {
  employeeId: string;
}

export interface Employees {
  [key: string]: Employee;
}
