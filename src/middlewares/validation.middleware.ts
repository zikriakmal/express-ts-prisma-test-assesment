import { Request, Response, NextFunction } from 'express';
import { z, ZodError } from 'zod';

export function validation(schema: z.ZodObject<any, any>) {
    return (req: Request, res: Response, next: NextFunction) => {
        try {
            schema.parse(req.body);
            next();
        } catch (error) {
            if (error instanceof ZodError) {
                const errorMessages = error.errors.map((issue: any) => ({
                    key: issue.path.join('.'),
                    message: `${issue.path.join('.')} is ${issue.message}`,
                }))
                res.status(400).json({ status: "error", message: 'Invalid data', details: errorMessages });
            } else {
                res.status(500).json({ status: "error", message: 'Internal Server Error' });
            }
        }
    };
}