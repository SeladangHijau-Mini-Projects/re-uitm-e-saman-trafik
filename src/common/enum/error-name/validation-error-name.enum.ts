export enum ValidationErrorName {
    // missing required fields
    MissingRequired = 'missing_required',

    // exists based on unique key, mostly used during adding data
    RecordExists = 'record_exists',

    // input is not as expected value/type/enum
    ValueNotAccept = 'value_not_accept',

    // relationship ID does not exists
    NotExists = 'not_exists',

    // input does not meets the validation
    InvalidValue = 'invalid_value',
}
