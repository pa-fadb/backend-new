import { Request } from "express";

export type ErrorObject = {
    status: number;
    error: number;
    data: Record<string, any>;
}

export interface ApiRequest extends Request {
    session?: any; // TODO: Add session type
}