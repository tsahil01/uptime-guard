require('dotenv').config();
export const backendUrl = process.env.NEXT_PUBLIC_PRIMARY_BACKEND_URL || "http://localhost:4000";