// Imports
import express, { Application, Request, Response } from "express";
import dotenv from "dotenv";
import cors from "cors";
import breakdownRoutes from "./routes/breakdown";

// Enable environment variables
dotenv.config();

// Express server setup
const PORT = process.env.PORT || 10001;
const app: Application = express();

// Adding functionality
app.use(cors());
app.use(express.json());

app.use("/api/breakdown", breakdownRoutes);

// Start server
app.listen(PORT, () => {
    console.log(`Example app listening on port ${PORT}!`);
})