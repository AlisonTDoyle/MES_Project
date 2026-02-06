// Imports
import express, { Application } from "express";
import dotenv from "dotenv";
import cors from "cors";
import breakdownRoutes from "./routes/machine-event";
import operatorRoutes from "./routes/operator";
import workOrderRoutes from "./routes/work-order";
import machineRoutes from './routes/machine';
import productionOrderRoutes from './routes/production-order';
import qualitySampleRoutes from './routes/quality-sample';
import { dbClientSetup } from "./misc/db-client-setup";
import fetch from 'node-fetch';

// Enable environment variables
dotenv.config();

// Express server setup
const PORT = process.env.PORT || 10001;
const app: Application = express();

// Adding functionality
app.use(cors());
app.use(express.json());

app.use("/api/machine-event", breakdownRoutes);
app.use("/api/operator", operatorRoutes);
app.use("/api/work-order", workOrderRoutes);
app.use("/api/machine", machineRoutes);
app.use("/api/production-order", productionOrderRoutes);
app.use("/api/quality-sample", qualitySampleRoutes);

app.get("/api/db-test", async (req, res) => {
    try {
        const db = await dbClientSetup();
        const result = await db.request().query("SELECT TOP 10 * FROM operator");
        res.status(200).json(result.recordset);
    }
    catch (err: any) {
        res.status(500).json({ error: err.message });
    }  
})

// Start server
app.listen(PORT, () => {
    console.log(`MES API listening on port ${PORT}!`);
})