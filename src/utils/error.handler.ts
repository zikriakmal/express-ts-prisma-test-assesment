import { NextFunction, Response, Request } from "express";

const errorHandler = (err: Error, _: Request, res: Response, next: NextFunction) => {
    console.error(err.stack); // Log the error stack for debugging

    if (err.stack?.includes("JSON.parse")) {
        console.error('Invalid JSON:', err.message);
        res.status(400).json({ message: 'Invalid JSON payload' });
        return
    }

    // Send a generic error message to the client
    res.status(500).json({
        message: 'An internal server error occurred. Please try again later.',
    });
}

export {errorHandler}