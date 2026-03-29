import express, { Express } from "express";
import cors from "cors";
import dotenv from "dotenv";
import helmet from "helmet";
import { apiHelmetConfig } from "../config/helmetConfig";
import { publicCorsOptions, authenticatedCorsOptions } from "../config/corsConfig";
import setupSwagger from "../config/swagger";

// Load environment variables BEFORE your internal imports!
dotenv.config();

import eventsRoutes from "./api/v1/routes/eventRoutes";
import morgan from "morgan";


// Initialize Express application
const app: Express = express();
app.use(apiHelmetConfig);
app.use(express.json());

// Use Morgan for HTTP request logging
app.use(morgan("combined"));

// Apply segmented CORS to specific routes
app.use("/api/v1/events", cors(authenticatedCorsOptions), eventsRoutes);

// Define a route
app.get("/", (req, res) => {
    res.send("Hello, World!");
});

app.get("/api/v1/health", cors(publicCorsOptions), (req, res) => {
    res.json({
        status: "OK",
        uptime: process.uptime(),
        timestamp: new Date().toISOString(),
        version: "1.0.0",
    });
});

setupSwagger(app);

export default app;