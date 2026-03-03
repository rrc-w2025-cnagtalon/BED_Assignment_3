import express, { Router } from "express";
import { createEvent, deleteEvent, getAllEvent, getEventById, updateEvent } from "../controllers/eventController";
import { validateRequest } from "../middleware/validate";
import { eventSchemas } from "../validation/eventsSchemas";

const eventsRoutes: Router = express.Router();

eventsRoutes.post("/", validateRequest(eventSchemas.create), createEvent);
eventsRoutes.get("/:id", validateRequest(eventSchemas.getById), getEventById);
eventsRoutes.get("/", getAllEvent);
eventsRoutes.put("/:id", validateRequest(eventSchemas.update), updateEvent);
eventsRoutes.delete("/:id", validateRequest(eventSchemas.delete), deleteEvent);

export default eventsRoutes;
