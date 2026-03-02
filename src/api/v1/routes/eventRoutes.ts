import express, { Router } from "express";
import { createEvent, getAllEvent, getEventById } from "../controllers/eventController";

const eventsRoutes: Router = express.Router();

eventsRoutes.post("/", createEvent);
eventsRoutes.get("/:id", getEventById);
eventsRoutes.get("/", getAllEvent);

export default eventsRoutes;