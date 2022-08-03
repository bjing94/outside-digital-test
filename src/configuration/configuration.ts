export interface JwtProperties {
  secret: string;
  expire: string;
}
export interface DatabaseProperties {
  type: string;
  host: string;
  port: number;
  name: string;
  user: string;
  password: string;
}
export interface ConfigurationInterface {
  database: DatabaseProperties;
  jwt: JwtProperties;
}
export default (): ConfigurationInterface => {
  return {
    database: {
      type: 'postgres',
      host: process.env.DB_HOST,
      port: parseInt(process.env.DB_PORT),
      name: process.env.DB_NAME,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
    },
    jwt: {
      secret: process.env.JWT_SECRET,
      expire: process.env.JWT_EXPIRE,
    },
  };
};
