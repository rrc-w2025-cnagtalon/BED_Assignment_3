import Joi from "joi";

// Post operation schemas organized by request part
export const eventSchemas = {
    create: {
        body: Joi.object({
            name: Joi.string()
                .min(3)
                .required()
                .messages({
                    "any.required": "Validation error: \"name\" is required",
                    "string.empty": "Validation error: \"name\" is required",
                    "string.min": "Validation error: \"name\" length must be at least 3 characters long"
                }),
            
            date: Joi.string()
                .isoDate()
                .required()
                .messages({
                    "any.required": "Validation error: \"date\" is required",
                    "string.isoDate": "Validation error: \"date\" must be a valid date"
                }),

            capacity: Joi.number()
                .integer()
                .min(1)
                .required()
                .messages({
                    "any.required": "Validation error: \"capacity\" is required",
                    "number.base": "Validation error: \"capacity\" must be a number",
                    "number.min": "Validation error: \"capacity\" must be greater than or equal to 1"
                }),

            registrationCount: Joi.number().integer().min(0).default(0),
            status: Joi.string().default("active"),
            category: Joi.string().default("general")
        }),
    },

    // // GET /posts/:id - Get single post
    // getById: {
    //     params: Joi.object({
    //         id: Joi.string().required().messages({
    //             "any.required": "Post ID is required",
    //             "string.empty": "Post ID cannot be empty",
    //         }),
    //     }),
    //     query: Joi.object({
    //         include: Joi.string().valid("comments", "author").optional(), // this is query, we dont have any queries. so we can take this out. 
    //     }),
    // },

    // // PUT /posts/:id - Update post
    // update: {
    //     params: Joi.object({
    //         id: Joi.string().required().messages({
    //             "any.required": "Post ID is required",
    //             "string.empty": "Post ID cannot be empty",
    //         }),
    //     }),
    //     body: Joi.object({
    //         content: Joi.string().optional().messages({
    //             "string.empty": "Content cannot be empty",
    //         }),
    //         userId: Joi.string().required().messages({ //must be a string, is required, and if it fails, this is the message you return.
    //             "any.required": "User ID is required", //if its missing, retunr that its required
    //             "string.empty": "User ID cannot be empty", // if its empty, this is rhe message
    //         }),
    //     }),
    // },

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