import { db } from "../../../../config/firebaseConfig";
import { DocumentReference, QuerySnapshot } from "firebase-admin/firestore";
import { Event } from "../models/eventModel";
import { EventCreateRequest } from "../models/eventCreateRequestModel"
import { EventDTO } from "../models/eventDTO"
import { EventUpdateRequest } from "../models/eventUpdateRequestModel"

export const addDocument = async (event: EventCreateRequest ): Promise<string> => {
    // Generate the custom ID format: evt_ followed by 6 digits
    const customId = `evt_${Math.floor(100000 + Math.random() * 900000)}`;
    // Create a reference to a document in the 'users' collection with ID 'user1'
    // If the document doesn't exist, it will be created
    const docRef: DocumentReference = db.collection("events").doc();

    // Use the `set` method to add or overwrite data in the document
    // The data is passed as an object with fields and their values
    const eventEntity: Event = {
        id: customId,
        name: event.name,
        date: event.date,
        capacity: event.capacity,
        registrationCount: event.registrationCount,
        status: event.status,
        category: event.category,
        createdAt: new Date(),
        updatedAt: new Date()
    }

    await docRef.set(eventEntity);
    return docRef.id;
};

export const getDocumentById = async (id: string): Promise<Event | undefined> => {
    // Create a reference to a specific document in the 'events' collection
    const docRef: DocumentReference = db.collection("events").doc(id);

    // Use the `get()` method to retrieve the document
    const doc = await docRef.get();

    // Check if the document exists
    if (doc.exists) {
        // `doc.data()` returns an object with all fields in the document
        let data = doc.data();

        return {
            id: doc.id,
            name: data!.name,
            date: data!.date,
            capacity: data!.capacity,
            registrationCount: data!.registrationCount,
            status: data!.status,
            category: data!.category,
            createdAt: data!.createdAt,
            updatedAt: data!.updatedAt
        }
    } else {
        console.log("No such document!");
    }
};

export const getCollection = async (): Promise<Array<EventDTO> | undefined> => {
    // Retrieve all documents from the 'events' collection
    // `get()` returns a QuerySnapshot containing all documents in the collection
    const snapshot: QuerySnapshot = await db.collection("events").get();

    const events: EventDTO[] = []

    // Iterate through each document in the collection
    snapshot.forEach((doc) => {
        // `doc.id` is the document's unique identifier
        // `doc.data()` returns an object with all fields in the document
        let data = doc.data()
        events.push({
            id: doc.id,
            name: data!.name,
            date: data!.date,
            capacity: data!.capacity,
            registrationCount: data!.registrationCount,
            status: data!.status,
            category: data!.category,
            createdAt: data!.createdAt,
            updatedAt: data!.updatedAt
        });
    });

    return events;
};

//update always takes 2 params, teh id and the event. 
export const updateDocument = async (id: string, event: EventUpdateRequest ): Promise<void> => {
    // Create a reference to a specific document in the 'event' collection
    const docRef: DocumentReference = db.collection("events").doc(id);

    // Use the `update()` method to modify specific fields in the document
    // This will only change the specified fields, leaving others untouched
    await docRef.update({
        //if the field is there, it will update it. if its not there, it will add the field.
        id: docRef.id,
        name: event.name,
        date: event.date,
        capacity: event.capacity,
        registrationCount: event.registrationCount,
        status: event.status,
        category: event.category,
        createdAt: new Date(),
        updatedAt: new Date()
    });

    return;
};

export const deleteDocument = async (id: string): Promise<void> => {
    // Create a reference to a specific document in the 'events' collection
    const docRef: DocumentReference = db.collection("events").doc(id);

    // Use the `delete()` method to remove the document from Firestore
    await docRef.delete();
};