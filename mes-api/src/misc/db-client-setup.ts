import sql from "mssql";

export async function dbClientSetup(): Promise<sql.ConnectionPool> {
    let db = await sql.connect({
        user: process.env.AWS_RDS_USER || "",
        password: process.env.AWS_RDS_PASSWORD || "",
        server: process.env.AWS_RDS_SERVER || "",
        port: 1433,
        database: process.env.AWS_RDS_NAME || "",
        options: { encrypt: true, trustServerCertificate: true }
    });

    return db;
}