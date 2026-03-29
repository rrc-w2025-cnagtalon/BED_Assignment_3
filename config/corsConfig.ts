import { CorsOptions } from "cors";

export const publicCorsOptions: CorsOptions = {
    origin: "*", 
    methods: ["GET"]
};

export const authenticatedCorsOptions: CorsOptions = {
    origin: (origin, callback) => {
        const isDevelopment = process.env.NODE_ENV === "development";
        const allowedOrigins = process.env.ALLOWED_ORIGINS?.split(",") || [];

        if (!origin || isDevelopment || allowedOrigins.includes(origin)) {
            callback(null, true);
        } else {
            callback(new Error("Not allowed by CORS"));
        }
    },
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"]
};