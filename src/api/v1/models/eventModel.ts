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
 */
export interface Event {
    id: string;                
    name: string;
    date: Date
    capacity: number;
    registrationCount: number;
    status: string;
    category: string;
    createdAt: Date;
    updatedAt: Date;
}