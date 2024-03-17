export interface Duty {

  employeeFirstName: string
  employeeLastName: string
  employeeMail: string
  uuid: string
  dutyType: DutyType
  dutyDay: Date
  startTime: string
  endTime: string
  creationTime: Date
}

export interface DutyParam {

  hoursStart: string
  hoursEnd: string
}

export interface DutyToAccept {

  employeeFirstName: string
  employeeLastName: string
  employeeMail: string
  uuid: string
  dutyType: DutyType
  dutyDay: Date
  startTime: string
  endTime: string
  creationTime: Date
  acceptance: boolean
}

export interface DutyToSave {

  dutyType: string
  employeeMail: string
  dutyDay: string
  startTime: string
  endTime: string
}

export interface DutyType {

  type: string
  shortcut: string
}

export interface DutyTypeMessage {

  dutyType: DutyType
  operation: string
}

export interface DutyListInType {

  dutyType: DutyType
  dutyList: Duty[]
  fulfill: number
}


export interface CalendarDay {
  dayOfMonth: number;
  name: string;
}