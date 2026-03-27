import express, { Express } from "express";
import dotenv from "dotenv";
import helmet from "helmet";

// Load environment variables BEFORE your internal imports!
dotenv.config();

import eventsRoutes from "./api/v1/routes/eventRoutes";
import morgan from "morgan";


// Initialize Express application
const app: Express = express();

// Apply basic Helmet security
app.use(helmet());

app.use(express.json());

// Use Morgan for HTTP request logging
app.use(morgan("combined"));

app.use("/api/v1/events", eventsRoutes);

// Define a route
app.get("/", (req, res) => {
    res.send("Hello, World!");
});

app.get("/api/v1/health", (req, res) => {
    res.json({
        status: "OK",
        uptime: process.uptime(),
        timestamp: new Date().toISOString(),
        version: "1.0.0",
    });
});

export default app;