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

export interface EmployeeMail {
  email: string
}

export interface Team {
  teamName: string
  parentTeamName: string
}

export interface TeamTree {
  team: Team
  children: TeamTree[]
}

