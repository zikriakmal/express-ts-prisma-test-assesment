import { NextFunction, Request, Response, Router } from 'express';
import { AuthLoginDTO } from '../../dtos/auth.dto';
import { validation } from '../../middlewares/validation.middleware';
import { authLogin } from '../../modules/auth/auth.controller';

const authRouter = Router();

/**
 * @swagger
 * /v1/auth/login:
 *   post:
 *     summary: User login
 *     tags:
 *       - Authentication
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *               password:
 *                 type: string
 *             required:
 *               - username
 *               - password
 *     responses:
 *       200:
 *         description: Successfully Login
 *         content:
 *           application/json:
 *             schema:
 *               type: 'object'
 *               properties:
 *                 status:
 *                   type: 'string'
 *                   example: 'success'
 *                 message:
 *                   type: 'string'
 *                   example: 'Successfully Login'
 *                 data:
 *                   $ref: '#/components/schemas/AuthLogin'
 */

authRouter.post('/login', validation(AuthLoginDTO), async (req: Request, res: Response, next: NextFunction) => {
    try {
        const requestData: AuthLoginDTO = req.body;
        const authLoginData = await authLogin(requestData)

        res.json({
            status: "success",
            message: "Successfully Login",
            data: authLoginData,
        });

    } catch (error) {
        next(error);
    }
});

export default authRouter;