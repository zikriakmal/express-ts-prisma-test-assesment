import { NextFunction, Request, Response, Router } from 'express';
import { CreateBookDTO, UpdateBookDTO } from '../../dtos/book.dto';
import { validation } from '../../middlewares/validation.middleware';
import { createBook, deleteBook, getAllBook, getBookById, updateBook } from '../../modules/book/book.controller';
import { paginationData } from '../../utils/pagination.helper';

const bookRouter = Router();


/**
 * @swagger
 * /v1/books:
 *   get:
 *     summary: Get All Book 
 *     tags:
 *       - Books 
 *     security:
 *       - BearerAuth: []  
 *     parameters:
 *       - in: query
 *         name: page
 *         required: false
 *         description: The page number to retrieve (default is 1)
 *         schema:
 *           type: integer
 *           example: 1
 *       - in: query
 *         name: pageSize
 *         required: false
 *         description: The number of books per page (default is 10)
 *         schema:
 *           type: integer
 *           example: 10
 *     responses:
 *       200:
 *         description: Successfully get all book
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
 *                   example: 'Successfully get all book'
 *                 data:
 *                   oneOf:
 *                     - type: 'array'
 *                       items:
 *                          $ref: '#/components/schemas/Book'
 */
bookRouter.get('/', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const getAllBookData = await getAllBook(paginationData(req));
        res.json({
            status: "success",
            message: "Successfully get all book",
            data: getAllBookData
        })
    } catch (error) {
        next(error)
    }

});


/**
 * @swagger
 * /v1/books:
 *   post:
 *     summary: Create Book
 *     tags:
 *       - Books
 *     security:
 *       - BearerAuth: []  
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *               authorName:
 *                 type: string
 *               publisherName:
 *                 type: string
 *             required:
 *               - title
 *               - authorName
 *               - publisherName
 *     responses:
 *       200:
 *         description: Successfully create book
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
 *                   example: 'Successfully create book'
 *                 data:
 *                   $ref: '#/components/schemas/Book'
 */
bookRouter.post('/', validation(CreateBookDTO), async (req: Request, res: Response, next: NextFunction) => {
    try {
        const requestData: CreateBookDTO = req.body;
        const createBookData = await createBook(requestData, req.body.user.id)
        res.json({
            status: "success",
            message: "Successfully create book",
            data: createBookData,
        });
    } catch (error) {
        next(error)
    }
});


/**
 * @swagger
 * /v1/books/{bookId}:
 *   get:
 *     summary: Get All Book 
 *     tags:
 *       - Books 
 *     security:
 *       - BearerAuth: []  
 *     parameters:
 *       - in: path
 *         name: bookId 
 *         required: true 
 *         description: bookId
 *         schema:
 *           type: integer
 *           example: 1
 *     responses:
 *       200:
 *         description: Successfully get book by id
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
 *                   example: 'Successfully get book by id'
 *                 data:
 *                   $ref: '#/components/schemas/Book'
 */
bookRouter.get('/:id', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const deletedBook = await getBookById(Number(req?.params?.id ?? 0))
        res.json({
            status: "success",
            message: "Successfully get book by id",
            data: deletedBook,
        });
    } catch (error) {
        next(error)
    }
});

/**
 * @swagger
 * /v1/books/{bookId}:
 *   put:
 *     summary: Update book by id 
 *     tags:
 *       - Books 
 *     security:
 *       - BearerAuth: []  
 *     parameters:
 *       - in: path
 *         name: bookId 
 *         required: true 
 *         description: bookId
 *         schema:
 *           type: integer
 *           example: 1
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *               authorName:
 *                 type: string
 *               publisherName:
 *                 type: string
 *             required:
 *               - title
 *               - authorName
 *               - publisherName
 *     responses:
 *       200:
 *         description: Successfully update book
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
 *                   example: 'Successfully update book'
 *                 data:
 *                   $ref: '#/components/schemas/Book'
 */
bookRouter.put('/:id', validation(UpdateBookDTO), async (req: Request, res: Response, next: NextFunction) => {
    try {
        const requestData: UpdateBookDTO = req.body;
        const updateBookData = await updateBook(requestData, req.body.user.id, Number(req?.params?.id ?? 0))
        res.json({
            status: "success",
            message: "Successfully update book",
            data: updateBookData,
        });
    } catch (error) {
        next(error)
    }
});

/**
 * @swagger
 * /v1/books/{bookId}:
 *   delete:
 *     summary: Delete Book By Id
 *     tags:
 *       - Books 
 *     security:
 *       - BearerAuth: []  
 *     parameters:
 *       - in: path
 *         name: bookId 
 *         required: true 
 *         description: bookId
 *         schema:
 *           type: integer
 *           example: 1
 *     responses:
 *       200:
 *         description: Successfully delete book
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
 *                   example: 'Successfully delete bookd'
 *                 data:
 *                   $ref: '#/components/schemas/Book'
 */
bookRouter.delete('/:id', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const deletedBook = await deleteBook(req.body.user.id, Number(req?.params?.id ?? 0))
        res.json({
            status: "success",
            message: "Successfully delete book",
            data: deletedBook,
        });
    } catch (error) {
        next(error)
    }
});


export default bookRouter;