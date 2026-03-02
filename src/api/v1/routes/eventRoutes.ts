import express, { Router } from "express";
import { createEvent, getEventById } from "../controllers/eventController";

const eventsRoutes: Router = express.Router();

eventsRoutes.post("/", createEvent);
eventsRoutes.get("/", getEventById);

export default eventsRoutes;