export enum ValidationErrorType {
    // missing required fields
    MissingRequired = 100,

    // exists based on unique key, mostly used during adding data
    RecordExists = 101,

    // input is not as expected value/type/enum
    ValueNotAccept = 102,

    // relationship ID does not exists
    NotExists = 103,

    // input does not meets the validation
    InvalidValue = 104,
}
