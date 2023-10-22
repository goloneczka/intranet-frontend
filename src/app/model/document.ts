export interface Document {

  fileName: string
  creator: string
  creationTime: Date
  comment: string
  topic: string

}

export interface DocumentGroup {
  order: number
  topic: string

}
