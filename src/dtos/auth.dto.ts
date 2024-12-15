import { z } from 'zod';

const AuthLoginDTO = z.object({
    username: z.string(),
    password: z.string(),
});

interface AuthLoginResDTO {
    accessToken: string
}

export { AuthLoginDTO, AuthLoginResDTO }
export type AuthLoginDTO = z.infer<typeof AuthLoginDTO>;
