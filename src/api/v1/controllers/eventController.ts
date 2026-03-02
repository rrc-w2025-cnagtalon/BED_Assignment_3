import { Request, RequestHandler, Response } from "express";
import { EventCreateRequest } from "../models/eventCreateRequestModel"
import { createNewEvent } from "../services/eventService"
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

