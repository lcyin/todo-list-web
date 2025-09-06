import { OpenAPI } from "./index";

// Configure the API client with the base URL from environment variables
OpenAPI.BASE = import.meta.env.VITE_API_BASE_URL || "http://localhost:3000";

export { OpenAPI };
