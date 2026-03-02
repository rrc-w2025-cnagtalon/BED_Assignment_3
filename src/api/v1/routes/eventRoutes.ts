import express, { Router } from "express";
import { createEvent } from "../controllers/eventController";

const eventsRoutes: Router = express.Router();

eventsRoutes.post("/", createEvent);

export default eventsRoutes;