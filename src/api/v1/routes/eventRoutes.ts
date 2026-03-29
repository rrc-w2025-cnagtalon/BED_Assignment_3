/**
 * @openapi
 * components:
 *   schemas:
 *     Event:
 *       type: object
 *       required:
 *         - id
 *         - name
 *         - date
 *         - capacity
 *         - registrationCount
 *         - status
 *         - category
 *         - createdAt
 *         - updatedAt
 *       properties:
 *         id:
 *           type: string
 *           example: "44fe3bb3-a4a7-4d78-af12-b3c3a3dd5e8b"
 *         name:
 *           type: string
 *           example: "Open API Workshop"
 *         date:
 *           type: string
 *           format: date-time
 *           example: "2025-12-25T14:00:00Z"
 *         capacity:
 *           type: integer
 *           example: 100
 *         registrationCount:
 *           type: integer
 *           example: 25
 *         status:
 *           type: string
 *           example: "scheduled"
 *         category:
 *           type: string
 *           example: "training"
 *         createdAt:
 *           type: string
 *           format: date-time
 *           example: "2025-01-01T10:00:00Z"
 *         updatedAt:
 *           type: string
 *           format: date-time
 *           example: "2025-01-02T12:00:00Z"
 *     EventCreateRequest:
 *       type: object
 *       required:
 *         - name
 *         - date
 *         - capacity
 *         - registrationCount
 *         - status
 *         - category
 *       properties:
 *         name:
 *           type: string
 *           example: "Open API Workshop"
 *         date:
 *           type: string
 *           format: date-time
 *           example: "2025-12-25T14:00:00Z"
 *         capacity:
 *           type: integer
 *           example: 100
 *         registrationCount:
 *           type: integer
 *           example: 0
 *         status:
 *           type: string
 *           example: "scheduled"
 *         category:
 *           type: string
 *           example: "training"
 */

import express, { Router } from "express";
import { createEvent, deleteEvent, getAllEvent, getEventById, updateEvent } from "../controllers/eventController";
import { validateRequest } from "../middleware/validate";
import { eventSchemas } from "../validation/eventsSchemas";

const eventsRoutes: Router = express.Router();

/**
 * @openapi
 * /events:
 *   post:
 *     tags:
 *       - Events
 *     summary: Create a new event
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/EventCreateRequest'
 *     responses:
 *       201:
 *         description: Event created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Event'
 *       400:
 *         description: Invalid request data
 */
eventsRoutes.post("/", validateRequest(eventSchemas.create), createEvent);

/**
 * @openapi
 * /events/{id}:
 *   get:
 *     tags:
 *       - Events
 *     summary: Get an event by id
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Event found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Event'
 *       404:
 *         description: Event not found
 */
eventsRoutes.get("/:id", validateRequest(eventSchemas.getById), getEventById);

/**
 * @openapi
 * /events:
 *   get:
 *     tags:
 *       - Events
 *     summary: Get all events
 *     responses:
 *       200:
 *         description: List of events
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Event'
 */
eventsRoutes.get("/", getAllEvent);

/**
 * @openapi
 * /events/{id}:
 *   put:
 *     tags:
 *       - Events
 *     summary: Update an event by id
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/EventCreateRequest'
 *     responses:
 *       200:
 *         description: Event updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Event'
 *       400:
 *         description: Invalid request data
 *       404:
 *         description: Event not found
 */
eventsRoutes.put("/:id", validateRequest(eventSchemas.update), updateEvent);

/**
 * @openapi
 * /events/{id}:
 *   delete:
 *     tags:
 *       - Events
 *     summary: Delete an event by id
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       204:
 *         description: Event deleted successfully
 *       404:
 *         description: Event not found
 */
eventsRoutes.delete("/:id", validateRequest(eventSchemas.delete), deleteEvent);

export default eventsRoutes;
