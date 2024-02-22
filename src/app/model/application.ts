export interface EnvApplication {

    name: string
    orderNumber: number

    prodUrl: string
    prodComment: string
    testUrl: string
    testComment: string
    envAppTagsDto: EnvAppTag[]
  }

  export interface EnvApplicationOrdering {

    envAppName: string
    order: number

  }

  export interface EnvAppTag {
    name: string
  }
