import { eventSchemas } from "../src/api/v1/validation/eventsSchemas";
import * as eventService from "../src/api/v1/services/eventService";
import { db } from "../config/firebaseConfig";

describe("Event Validation Schema", () => {
    
    it("should fail if name is missing", () => {
        const invalidData = { date: "2026-12-25T09:00:00.000Z", capacity: 10 };
        const { error } = eventSchemas.create.body.validate(invalidData);
        expect(error?.details[0].message).toBe("Validation error: \"name\" is required");
    });

    it("should fail if capacity is a decimal", () => {
        const invalidData = { name: "Test Event", date: "2026-12-25T09:00:00.000Z", capacity: 50.5 };
        const { error } = eventSchemas.create.body.validate(invalidData);
        expect(error?.details[0].message).toBe("Validation error: \"capacity\" must be an integer");
    });

    it("should fail if registrationCount exceeds capacity", () => {
        const invalidData = {
            name: "Overbooked",
            date: "2026-12-25T09:00:00.000Z",
            capacity: 100,
            registrationCount: 150
        };
        const { error } = eventSchemas.create.body.validate(invalidData);
        expect(error?.details[0].message).toBe("Validation error: \"registrationCount\" must be less than or equal to ref:capacity");
    });

    it("should fail if the date is in the past", () => {
        const invalidData = { name: "Past Event", date: "2024-12-25T09:00:00.000Z", capacity: 10 };
        const { error } = eventSchemas.create.body.validate(invalidData);
        expect(error?.details[0].message).toBe("Validation error: \"date\" must be greater than \"now\"");
    });
});

describe("Event Service Functions", () => {
    
    it("should call Firestore to retrieve all events", async () => {
        // Arrange
        const mockEvents = [{ id: "evt_1", name: "Mock Event" }];
        
        const mockSnapshot = {
            forEach: (callback: any) => {
                mockEvents.forEach(e => callback({ id: e.id, data: () => e }));
            }
        };

        const collectionSpy = jest.spyOn(db, 'collection').mockReturnValue({
            get: jest.fn().mockResolvedValue(mockSnapshot) 
        } as any);

        // Act
        const result = await eventService.getAllEvents();

        // Assert
        expect(db.collection).toHaveBeenCalledWith("events");
        expect(result).toBeDefined();
        expect(result!.length).toBe(1);
        expect(result![0].name).toBe("Mock Event");

        // Cleanup
        collectionSpy.mockRestore();
    });
});

it("should call Firestore to retrieve a single event by ID", async () => {
    // Arrange
    const mockEvent = { id: "evt_1", name: "Single Event" };
    const docSpy = jest.spyOn(db, 'collection').mockReturnValue({
        doc: jest.fn().mockReturnValue({
            get: jest.fn().mockResolvedValue({
                exists: true,
                id: mockEvent.id,
                data: () => mockEvent
            })
        })
    } as any);

    // Act
    const result = await eventService.getEventByIdAsync("evt_1");

    // Assert
    expect(result).toBeDefined();
    expect(result!.name).toBe("Single Event");
    docSpy.mockRestore();
});

it("should call Firestore to delete an event", async () => {
    // Arrange
    const deleteSpy = jest.spyOn(db, 'collection').mockReturnValue({
        doc: jest.fn().mockReturnValue({
            delete: jest.fn().mockResolvedValue(undefined)
        })
    } as any);

    // Act & Assert
    await expect(eventService.deleteEventById("evt_1")).resolves.not.toThrow();
    deleteSpy.mockRestore();
});