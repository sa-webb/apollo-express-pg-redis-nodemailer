class ErrorReporter {
    apiKey: string
  
    constructor(apiKey: string) {
      if (apiKey === undefined || apiKey === "") {
        throw new Error("apiKey required")
      }
  
      this.apiKey = apiKey
    }
  
    report(err: Error) {
      console.error(err)
    }
  }
  
  export default new ErrorReporter(process.env.DB_NAME!)