enum Severity {
    Info = 'INFO'
    , Error = 'ERROR'
    , Warning = 'WARNING'
}


export type Failure = {
    severity: Severity
    , message: string
}