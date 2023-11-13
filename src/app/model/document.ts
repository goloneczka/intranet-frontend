export interface Document {

  fileName: string
  creator: string
  creationTime: Date
  comment: string
  topic: string

}

export interface DocumentToSave {
  fileName: string
  comment: string
  topic: string
  data: any
}

export interface DocumentGroup {
  order: number
  topic: string

}
