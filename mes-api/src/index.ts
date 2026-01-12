// Imports
import express, { Application, Request, Response } from "express";
import dotenv from "dotenv";
import cors from "cors";
import breakdownRoutes from "./routes/breakdown";
import operatorRoutes from "./routes/operator";

// Enable environment variables
dotenv.config();

// Express server setup
const PORT = process.env.PORT || 10001;
const app: Application = express();

// Adding functionality
app.use(cors());
app.use(express.json());

app.use("/api/breakdown", breakdownRoutes);
app.use("/api/operator", operatorRoutes)

app.get('/', (req, res) => {
    res.send('Hello World!')
})

// Start server
app.listen(PORT, () => {
    console.log(`MES API listening on port ${PORT}!`);
})