/**
 * a function to ensure all the env keys are setup
 * @param requiredEnvKeys array of keys to check the env
 */
export default function envValidator(requiredEnvKeys: string[]): void {
    // find the missing keys
    const missingKeys = requiredEnvKeys.filter(
        (key: string) =>
            process.env[key] === undefined || process.env[key]?.length === 0,
    );

    if (missingKeys.length > 0) {
        throw new Error(
            `Missing env(s) or empty value: ${missingKeys.join(',')}`,
        );
    }

    const dbSupportedTypes = ['mysql', 'mongodb'];
    if (!dbSupportedTypes.includes(process.env.DB_TYPE)) {
        throw Error(
            `Unsupported env DB_TYPE: ${
                process.env.DB_TYPE
            }. Only supports ${dbSupportedTypes.join(',')}`,
        );
    }
}
