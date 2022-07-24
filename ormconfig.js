const environment = process.env.APP_ENV;
module.exports = {
  type: 'mysql',
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  username: process.env.DB_USER_NAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  entities: ['dist/app/database/entities/*.entity.{js,ts}'],
  migrations: ['dist/app/database/migrations/**/*.{js,ts}'],
  synchronize: false,
  logging: environment !== 'production' ? true : false,
  migrationsTableName: 'system_migrations',
  migrationsRun: true,
  cli: {
    entitiesDir: 'src/app/database/entities',
    migrationsDir: 'src/app/database/migrations',
  },
};
