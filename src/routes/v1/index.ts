import { Request, Response, Router } from 'express';
import bookRouter from './book.routes';
import authRouter from './auth.routes';
import authorization from '../../middlewares/authorization.middleware';

/**
 * @swagger
 * tags:
 *   - name: Authentication
 *     description: Endpoints related to user authentication
 *   - name: Books
 *     description: Endpoints to manage books
 */

const v1Router = Router();

v1Router.get('/', (req: Request, res: Response) => {
    res.send('Books Api Ver-1.0.0')
});


v1Router.use('/books', authorization, bookRouter);
v1Router.use('/auth', authRouter);

export default v1Router;