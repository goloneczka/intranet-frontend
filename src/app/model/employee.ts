export interface Employee {

  firstName: string
  lastName: string
  email: string
  title: string
  phoneNumber: string
  isManager: boolean
}

export interface EmployeeDepartment {

  team: string
  uuid: string
  employeeList: Employee[]
}

export const employeeKeys = ['firstName', 'lastName', 'email', 'title', 'phoneNumber'];
