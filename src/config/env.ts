export const PORT = Number(process.env.PORT) || 3001;
export const MONGODB_URI = process.env.MONGODB_URI as string;
export const JWT_TOKEN = String(process.env.JWT_TOKEN) || 'secret_token';

