import prisma from "../../database/prisma";
import type { BookResDTO, CreateBookDTO, UpdateBookDTO } from "../../dtos/book.dto";
import { PaginationDTO, PaginationResDTO } from "../../dtos/pagination.dto";
import { ErrorHelper } from "../../utils/error.helper";
import logDatabaseChange from "../../utils/log.helper";

const getAllBook = async ({ page = 1, pageSize = 10 }: PaginationDTO): Promise<PaginationResDTO<BookResDTO>> => {
    const skip = (page - 1) * pageSize;
    const books = await prisma.book.findMany({
        include: {
            user: {
                select: {
                    id: true,
                    username: true
                }
            }
        },
        skip: skip,
        take: pageSize,
    });
    const totalBooks = await prisma.book.count();

    return {
        records: books,
        meta: {
            total: totalBooks,
            page: page,
            pageSize: pageSize,
            totalPages: Math.ceil(totalBooks / pageSize),
        },
    };
}


const getBookById = async (bookId: number): Promise<BookResDTO> => {
    const findBook = await prisma.book.findFirst({
        where: { id: isNaN(bookId) ? 0 : bookId }, include: {
            user: {
                select: {
                    id: true,
                    username: true,
                }
            }
        }
    });
    if (!findBook) throw new ErrorHelper(404, "BookId Not found");

    return findBook;
};



const createBook = async (createBookData: CreateBookDTO, userId: number): Promise<BookResDTO> => {
    const createBook = await prisma.book.create({
        data: {
            title: createBookData.title,
            authorName: createBookData.authorName,
            publisherName: createBookData.publisherName,
            userId: userId,
        },
        include: {
            user: {
                select: {
                    id: true,
                    username: true
                }
            }
        }
    });
    await logDatabaseChange('create', 'book', 0, null, createBook, userId);

    return createBook;
}

const updateBook = async (updateBook: UpdateBookDTO, userId: number, bookId: number): Promise<BookResDTO> => {

    const findBook = await prisma.book.findFirst({ where: { id: bookId } });
    if (!findBook) throw new ErrorHelper(404, "BookId Not found");

    const updatedBook = await prisma.book.update({
        where: { id: isNaN(bookId) ? 0 : bookId },
        data: {
            title: updateBook.title,
            authorName: updateBook.authorName,
            publisherName: updateBook.publisherName,
            userId: userId,
        },
        include: {
            user: {
                select: {
                    id: true,
                    username: true,
                },
            },
        },
    });

    await logDatabaseChange('update', 'book', bookId, findBook, updatedBook, userId);


    return updatedBook;
};

const deleteBook = async (userId: number, bookId: number): Promise<BookResDTO> => {

    const findBook = await prisma.book.findFirst({
        where: { id: isNaN(bookId) ? 0 : bookId },
        include: {
            user: {
                select: {
                    id: true,
                    username: true,
                }
            }
        }
    });
    if (!findBook) throw new ErrorHelper(404, "BookId Not found");

    await prisma.book.delete({ where: { id: bookId } });

    await logDatabaseChange('delete', 'book', bookId, findBook, null, userId);

    return findBook;
};




export { createBook, updateBook, getAllBook, deleteBook, getBookById };
