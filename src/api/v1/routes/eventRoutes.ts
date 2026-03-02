import express, { Router } from "express";
import { createEvent, getAllEvent, getEventById, updateEvent } from "../controllers/eventController";

const eventsRoutes: Router = express.Router();

eventsRoutes.post("/", createEvent);
eventsRoutes.get("/:id", getEventById);
eventsRoutes.get("/", getAllEvent);
eventsRoutes.put("/:id", updateEvent);

export default eventsRoutes;