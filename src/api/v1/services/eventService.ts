import { addDocument, getDocumentById, getCollection, updateDocument, deleteDocument } from "../repositories/eventRepository"
import { EventCreateRequest } from "../models/eventCreateRequestModel"
import { EventResponse } from "../models/eventResponse"
import { EventDTO } from "../models/eventDTO"
import { EventUpdateRequest } from "../models/eventUpdateRequestModel"

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

export const updateEventById = async (id: string, event: EventUpdateRequest): Promise<void> => {
    await updateDocument(id, event);
    return;
};

export const deleteEventById = async (id: string): Promise<void> => {
    await deleteDocument(id);
    return;
}