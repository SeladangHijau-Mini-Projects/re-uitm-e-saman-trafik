const defaultConfig = [
    {
        type: 'mysql',
        host: process.env.MYSQL_HOST,
        port: Number(process.env.MYSQL_PORT) || 3306,
        username: process.env.MYSQL_USERNAME,
        password: process.env.MYSQL_PASSWORD,
        database: process.env.MYSQL_DATABASE,
        migrations: ['src/database/migrations/*.ts'],
        cli: {
            migrationsDir: 'src/database/migrations/',
        },
        entities: ['dist/**/*.entity{.ts,.js}'],
    },
    {
        name: 'seed',
        type: 'mysql',
        host: process.env.MYSQL_HOST,
        port: Number(process.env.MYSQL_PORT) || 3306,
        username: process.env.MYSQL_USERNAME,
        password: process.env.MYSQL_PASSWORD,
        database: process.env.MYSQL_DATABASE,
        migrationsTableName: 'seed_migration',
        migrations: ['src/database/seeds/*.ts'],
        cli: {
            migrationsDir: 'src/database/seeds',
        },
    },
];

module.exports = defaultConfig;
