export interface Employee {

  firstName: string
  lastName: string
  email: string
  title: string
  phoneNumber: string
  major: boolean
  hireDate: Date
  birthDate: Date
  teamName: string
}


export interface EmployeeDepartment {

  team: string
  uuid: string
  employeeList: Employee[]
}

export interface Team {
  teamName: string
  uuid: string
  parentTeamUuid: string
}

export interface TeamTree {
  team: Team
  children: TeamTree[]
}

