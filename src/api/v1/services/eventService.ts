import { addDocument } from "../repositories/eventRepository"
import { EventCreateRequest } from "../models/eventCreateRequestModel"

export const createNewEvent = async (event: EventCreateRequest): Promise<string> => {
    return await addDocument(event);

};