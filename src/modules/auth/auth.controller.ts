import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import config from "../../config";
import prisma from "../../database/prisma";
import { AuthLoginDTO, AuthLoginResDTO } from "../../dtos/auth.dto";
import { ErrorHelper } from "../../utils/error.helper";



const authLogin = async (authLoginData: AuthLoginDTO): Promise<AuthLoginResDTO> => {

    const user = await prisma.user.findFirst({
        where: {
            username: authLoginData.username,
        }
    });

    const isPasswordValid = await bcrypt.compare(authLoginData.password, user?.password ?? "");
    if (!isPasswordValid) throw new ErrorHelper(401, 'Unathorized: Invalid username or password')

    const payload = {
        id: user?.id,
        username: user?.username,
    }
    const accessToken = jwt.sign(payload, config.jwt.secretKey, { expiresIn: '1h' });

    return { accessToken: accessToken }
}


export { authLogin };
