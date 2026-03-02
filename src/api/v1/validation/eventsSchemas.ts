import Joi from "joi";

// Post operation schemas organized by request part
export const eventSchemas = {
    // POST /posts - Create new post
    create: {
        body: Joi.object({
            name: Joi.string().required(), 
            date: Joi.string().isoDate().required(),
            capacity: Joi.number().integer().min(1).required(),
            registrationCount: Joi.number().integer().min(0).required(),
            status: Joi.string().required(),
            category: Joi.string().required(),
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