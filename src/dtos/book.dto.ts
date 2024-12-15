import { z } from 'zod';

const CreateBookDTO = z.object({
    title: z.string().max(50),
    authorName: z.string().max(50),
    publisherName: z.string().max(50),
});

const UpdateBookDTO = z.object({
    title: z.string().max(50),
    authorName: z.string().max(50),
    publisherName: z.string().max(50),
});

interface BookResDTO {
    user: {
        id: number;
        username: string;
    },
    title: string;
    authorName: string;
    publisherName: string;
    id: number;
    userId: number;
    createdAt: Date;
    updatedAt: Date;
}

export { CreateBookDTO, UpdateBookDTO, BookResDTO }
export type CreateBookDTO = z.infer<typeof CreateBookDTO>;
export type UpdateBookDTO = z.infer<typeof UpdateBookDTO>;

