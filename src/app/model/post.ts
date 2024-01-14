export interface Post {

  message: string
  title: string
  user: string
  creationTime: Date
}

export interface DailyPost {

  creationTime : Date;
  dateTime: Date;
  nameDayStrings : string;
  calendarHolidayStrings : string;
  sunrise : string;
  sunset : string;
}

export interface PostToSave {

  message: string
  title: string
}

