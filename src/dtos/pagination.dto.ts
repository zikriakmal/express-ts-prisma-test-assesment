
export interface PaginationDTO {
    page: number;
    pageSize: number;
}

export interface PaginationResDTO<T> {
    records: T[];
    meta: {
        total: number,
        page: number,
        pageSize: number,
        totalPages: number,
    }
}