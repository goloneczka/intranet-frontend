export interface Employee {

  firstName: string
  lastName: string
  email: string
  title: string
  phoneNumber: string
  major: boolean
  hireDate: Date
  birthDate: Date
}


export interface EmployeeDepartment {

  team: string
  uuid: string
  employeeList: Employee[]
}
