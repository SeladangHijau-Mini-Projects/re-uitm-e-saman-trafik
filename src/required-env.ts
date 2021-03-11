// set to true if using mysql
const isUseMysql = process.env.DB_TYPE === 'mysql';

// set to true if using mongo
const isUseMongo = process.env.DB_TYPE === 'mongodb';

// put your own custom env key here
// ** YOUR ONLY NEED TO ADD YOUR KEY HERE **
const appRequireKeys = ['APP_TIMEZONE'];

const commonRequiredKeys = ['APP_NAME', 'PORT', 'APP_NAMESPACE', 'NODE_ENV'];

// mysql env required keys.
// ** DO NOT CHANGE IF NOT NECESSARY **
const mysqlRequiredKeys = isUseMysql
    ? [
          'MYSQL_HOST',
          'MYSQL_PORT',
          'MYSQL_USERNAME',
          'MYSQL_PASSWORD',
          'MYSQL_DATABASE',
      ]
    : [];

// mongodb env required keys.
// ** DO NOT CHANGE IF NOT NECESSARY **
const mongodbRequiredKeys = isUseMongo ? ['MONGODB_ENDPOINT'] : [];

// keys to ensure
export const requiredEnvKeys = [
    ...commonRequiredKeys,
    ...mongodbRequiredKeys,
    ...mysqlRequiredKeys,
    ...appRequireKeys,
];
