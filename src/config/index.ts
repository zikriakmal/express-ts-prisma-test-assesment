import dotenv from 'dotenv';
dotenv.config();

const config = {
    db: {
        host: process.env.DB_HOST || "localhost",
        user: process.env.DB_USER || "root",
        password: process.env.DB_PASSWORD || "pass",
        database: process.env.DB_NAME || "db_name",
        connectTimeout: 60000
    },
    server: {
        host: process.env.HOST || "127.0.0.1",
        port: process.env.PORT || "3000"
    },
    jwt:{
        secretKey:process.env.JWT_SECRET_KEY || "jwtsecretkey",
    },
    listPerPage: 10,
};

export default config;
