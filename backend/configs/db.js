import sql from "mssql";
import dotenv from "dotenv";

dotenv.config();

const config = {
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    server: process.env.DB_SERVER,
    database: process.env.DB_NAME,
    options: {
        encrypt: false,
        trustServerCertificate: true
    }
};

export const connectDB = async () => {
    try {
        await sql.connect(config);

        console.log("Connected to SQL Server");
    } catch (err) {
        console.error("DB connection error:", err);
    }
};

export default sql;