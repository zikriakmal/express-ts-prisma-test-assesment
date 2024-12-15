export class ErrorHelper extends Error {
    statusCode: number;
    isOperational: boolean;
    details?: any;

    constructor(statusCode: number, message: string, details?: any) {
        super(message);
        this.statusCode = statusCode;
        this.isOperational = true;  // Operational errors are expected, non-operational errors are programmer errors
        this.details = details;
        Error.captureStackTrace(this, this.constructor);  // Captures the stack trace for debugging
    }
}