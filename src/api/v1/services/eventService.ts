import { addDocument, getDocumentById, getCollection } from "../repositories/eventRepository"
import { EventCreateRequest } from "../models/eventCreateRequestModel"
import { EventResponse } from "../models/eventResponse"
import { EventDTO } from "../models/eventDTO"

export const createNewEvent = async (event: EventCreateRequest): Promise<string> => {
    return await addDocument(event);

};

export const getEventByIdAsync = async (id: string): Promise<EventResponse> => {
    let entity = await getDocumentById(id);
    return {
       id: entity?.id,
       name: entity?.name,
       date: entity?.date,
       capacity: entity?.capacity,
       registrationCount: entity?.registrationCount,
       status: entity?.status,
       category: entity?.category,
       createdAt: entity?.createdAt,
       updatedAt: entity?.updatedAt
    }
};

export const getAllEvents = async (): Promise<Array<EventDTO> | undefined> => {
    return await getCollection();
};