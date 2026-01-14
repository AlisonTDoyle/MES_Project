// Imports
import express, { Application, Request, Response } from "express";
import dotenv from "dotenv";
import cors from "cors";
import breakdownRoutes from "./routes/machine-event";
import operatorRoutes from "./routes/operator";
import workOrderRoutes from "./routes/work-order";
import machineRoutes from './routes/machine';

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

app.get('/', (req, res) => {
    res.send('Hello World!')
})

// Start server
app.listen(PORT, () => {
    console.log(`MES API listening on port ${PORT}!`);
})