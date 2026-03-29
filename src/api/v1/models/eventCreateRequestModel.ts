/**
 * @openapi
 * components:
 *   schemas:
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
export interface EventCreateRequest {
    name: string;
    date: Date;
    capacity: number;
    registrationCount: number;
    status: string;
    category: string;
}