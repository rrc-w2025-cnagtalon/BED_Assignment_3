import Joi from "joi";

// Post operation schemas organized by request part
export const eventSchemas = {
    create: {
        body: Joi.object({
            name: Joi.string()
                .min(5)
                .required()
                .messages({
                    "any.required": "Validation error: \"name\" is required",
                    "string.empty": "Validation error: \"name\" is required",
                    "string.min": "Validation error: \"name\" length must be at least 5 characters long"
                }),
            
            date: Joi.date()
                .iso()
                .greater('now') 
                .required()
                .messages({
                    "any.required": "Validation error: \"date\" is required",
                    "string.isoDate": "Validation error: \"date\" must be a valid ISO 8601 date",
                    "date.greater": "Validation error: \"date\" must be greater than \"now\"" 
                }),

            capacity: Joi.number()
                .integer()
                .min(5)
                .required()
                .messages({
                    "number.base": "Validation error: \"capacity\" must be a number",
                    "number.integer": "Validation error: \"capacity\" must be an integer",
                    "number.min": "Validation error: \"capacity\" must be greater than or equal to 5",
                    "any.required": "Validation error: \"capacity\" is required"
                }),

            registrationCount: Joi.number()
                .integer()
                .min(0)
                .max(Joi.ref('capacity')) 
                .default(0)
                .messages({
                    "number.max": "Validation error: \"registrationCount\" must be less than or equal to ref:capacity" 
                }),
            status: Joi.string()
                .valid('active', 'cancelled', 'completed')
                .default('active')
                .messages({
                    "any.only": "Validation error: \"status\" must be one of [active, cancelled, completed]"}),
            category: Joi.string()
                .valid('conference', 'workshop', 'meetup', 'seminar', 'general') 
                .default('general')
                .messages({
                    "any.only": "Validation error: \"category\" must be one of [conference, workshop, meetup, seminar, general]"
                })
        }),
    },

    // GET /api/v1/events/:id - Get single event
    getById: {
        params: Joi.object({
            id: Joi.string().required().messages({
                "any.required": "Event ID is required",
                "string.empty": "Event ID cannot be empty",
                "string.min": "Event ID must be at least 10 characters"
            }),
        }),
    },

// PUT /api/v1/events/:id - Update event
    update: {
        params: Joi.object({
            id: Joi.string().required().messages({
                "any.required": "Validation error: \"id\" is required",
                "string.empty": "Validation error: \"id\" cannot be empty",
            }),
        }),
        body: Joi.object({
            name: Joi.string().min(3).max(50).optional().messages({
                "string.min": "Validation error: \"name\" length must be at least 3 characters long"
            }),
            date: Joi.date().iso().greater('now').optional().messages({
                "date.greater": "Validation error: \"date\" must be greater than \"now\""
            }),
            capacity: Joi.number().integer().min(5).optional(),
            registrationCount: Joi.number().integer().min(0).max(Joi.ref('capacity')).optional(),
            status: Joi.string().valid('active', 'cancelled', 'completed').optional(),
            category: Joi.string().valid('conference', 'workshop', 'meetup', 'seminar', 'general').optional()
        }).min(1),
    },

    // // DELETE /posts/:id - Delete post
    // delete: {
    //     params: Joi.object({
    //         id: Joi.string().required().messages({
    //             "any.required": "Post ID is required",
    //             "string.empty": "Post ID cannot be empty",
    //         }),
    //     }),
    // },
};