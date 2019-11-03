require('dotenv').config();
const config = {
  server: process.env.DB_SERVER,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  port: process.env.DB_PORT,
  options: {
    instanceName: process.env.DB_INSTANCENAME,
    encrypt: false
  }
};

export default config;
