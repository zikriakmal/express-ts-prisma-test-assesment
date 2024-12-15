import { z } from 'zod';

const createBookRequest = z.object({
    title: z.string().max(50),
    authorName: z.string().max(50),
    publisherName: z.string().max(50),
});

export { createBookRequest };
