export interface Post {

  message: string
  title: string
  user: string
  creationTime: Date
  eventDate: Date
}

export interface PostEvent {

  title: string
  eventDate: Date
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
  eventDate: string | null
}

export interface PostToSaveMessage {
  postToSave: PostToSave | Post
  operation: string
}
