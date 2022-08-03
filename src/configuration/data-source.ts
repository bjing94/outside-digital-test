import { DataSource } from 'typeorm';

// Нужен для создания миграций.

const AppDataSource = new DataSource({
  type: 'postgres',
  host: process.env.DB_HOST,
  port: parseInt(process.env.DB_PORT),
  database: process.env.DB_NAME,
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  entities: ['src/entities/**.entity.ts', 'dist/entities/**.entity.js'],
  migrations: ['src/db/**-migrations.ts'],
  subscribers: [],
  migrationsTableName: 'migrations',
});

export default AppDataSource;
