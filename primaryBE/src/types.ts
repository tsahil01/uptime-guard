require('dotenv').config();
export const healthCheckerRoute = process.env.HEALTH_CHECKER_URL || "http://localhost:5000";