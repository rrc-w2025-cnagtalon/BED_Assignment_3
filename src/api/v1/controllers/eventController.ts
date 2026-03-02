import { Request, RequestHandler, Response } from "express";
import { EventCreateRequest } from "../models/eventCreateRequestModel"
import { createNewEvent, getEventByIdAsync, getAllEvents } from "../services/eventService"
import { HTTP_STATUS } from "../../../constants/httpConstants"
import { successResponse } from "../models/responseModel"

//adding a new event
export const createEvent = async (req: Request, res: Response) => {
    //extract the body

    const requestEvent: EventCreateRequest = {
        name: req.body.name,
        date: req.body.date,
        capacity: req.body.capacity,
        registrationCount: req.body.registrationCount,
        status: req.body.status,
        category: req.body.category
    }

    let result = await createNewEvent(requestEvent)

    res.status(HTTP_STATUS.CREATED).json(successResponse(result, "Event created"));
};

// get an item
export const getEventById = async (req: Request, res: Response) => {
    try {
        let id = req.params.id;
        let results = await getEventByIdAsync(id);

        res.status(HTTP_STATUS.OK).json(successResponse(results, "Data retrieved."));
    } catch (error) {
        res.status(HTTP_STATUS.NOT_FOUND).json({message: "Nope error." });
    }
};

export const getAllEvent = async (req: Request, res: Response) => {
    // Logic to get all items
    try {
        const items = await getAllEvents();

        res.status(HTTP_STATUS.OK).json(successResponse(items, "Here are all the events."));
    } catch (error) {
        res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({message: "Internal server error"});
    }  
};