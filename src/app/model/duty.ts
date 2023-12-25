export interface Duty {

  employeeFirstName: string
  employeeLastName: string
  employeeMail: string
  uuid: string
  dutyType: DutyType
  dutyDay: Date
  startTime: Date
  endTime: Date
}

export interface DutyToSave {

  dutyType: string
  employeeMail: string
  dutyDay: Date
  startTime: string
  endTime: string
}

export interface DutyType {

  type: string
  shortcut: string
}

export interface CalendarDay {
  dayOfMonth: number;
  name: string;
}