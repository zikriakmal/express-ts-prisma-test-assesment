import { Request } from "express";
import { PaginationDTO } from "../dtos/pagination.dto";

const paginationData = (req: Request): PaginationDTO => {
    const requestData: PaginationDTO = {
        page: Number(req?.query?.page ?? 1) ?? 1,
        pageSize: Number(req?.query?.pageSize ?? 1) ?? 10
    }
    return requestData;
};

export { paginationData }