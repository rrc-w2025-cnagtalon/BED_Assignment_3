import { db } from "../../../../config/firebaseConfig";
import { DocumentReference } from "firebase-admin/firestore";
import { Event } from "../models/eventModel";
import { EventCreateRequest } from "../models/eventCreateRequestModel"

export const addDocument = async (item: EventCreateRequest ): Promise<string> => {
    // Generate the custom ID format: evt_ followed by 6 digits
    const customId = `evt_${Math.floor(100000 + Math.random() * 900000)}`;
    // Create a reference to a document in the 'users' collection with ID 'user1'
    // If the document doesn't exist, it will be created
    const docRef: DocumentReference = db.collection("events").doc();

    // Use the `set` method to add or overwrite data in the document
    // The data is passed as an object with fields and their values
    const eventEntity: Event = {
        id: customId,
        name: item.name,
        date: item.date,
        capacity: item.capacity,
        registrationCount: item.registrationCount,
        status: item.status,
        category: item.category,
        createdAt: new Date(),
        updatedAt: new Date()

    }

    await docRef.set(eventEntity);
    
    return docRef.id;
};
