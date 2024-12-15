import config from ".";

const swaggerDefinition = {
    openapi: '3.0.1',
    info: {
        title: 'Book API',
        version: '1.0.0',
        description: 'API to manage books',
    },
    servers: [
        {
            url: `http://${config.server.host}:${config.server.port}`,
            description: 'Development server',
        },
    ],
    components: {
        securitySchemes: {
            BearerAuth: {
                type: 'http',
                scheme: 'bearer',
                bearerFormat: 'JWT', // Optional, but clarifies that it's a JWT token
            },
        },
        schemas: {
            AuthLogin: {
                type: 'object',
                properties: {
                    accessToken: {
                        type: 'string',
                    },
                },
            },
            Book: {
                type: 'object',
                properties: {
                    id: {
                        type: 'integer',
                    },
                    title: {
                        type: 'string',
                    },
                    authorName: {
                        type: 'string',
                    },
                    publisherName: {
                        type: 'string',
                    },
                    createdAt: {
                        type: 'string',
                        format: 'date-time',
                    },
                    updatedAt: {
                        type: 'string',
                        format: 'date-time',
                    },
                    userId: {
                        type: 'integer',
                    },
                    user: {
                        type: 'object',
                        properties: {
                            id: {
                                type: 'integer',
                            },
                            username: {
                                type: 'string',
                            },
                        },
                    },
                },
                required: ['id', 'title', 'authorName', 'publisherName', 'createdAt', 'updatedAt', 'userId', 'user'],
            },
            PaginationMeta: {
                type: 'object',
                properties: {
                    total: {
                        type: 'integer',
                    },
                    page: {
                        type: 'integer',
                    },
                    pageSize: {
                        type: 'integer',
                    },
                    totalPages: {
                        type: 'integer',
                    },
                },
            },
            PaginationResDTO: {
                type: 'object',
                properties: {
                    records: {
                        type: 'array',
                        items: {
                            $ref: '#/components/schemas/Book',
                        },
                    },
                    meta: {
                        $ref: '#/components/schemas/PaginationMeta',
                    },
                },
            },
        },
    },
};

export { swaggerDefinition };
