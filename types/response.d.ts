export type ApiResponse<T> = {
    is_success: boolean;
    data: T;
}

export type ApiResponsePaginated<T> = ApiResponse<{
    currentPage: number;
    totalData: number;
    totalPage: number;
    prevPage: number | null;
    nextPage: number | null,
    data: T[];
}>

export type ApiResponsePaginated2<T> = {
    is_success: boolean;
    data: {
        currentPage: number;
        totalData: number;
        totalPage: number;
        prevPage: number | null;
        nextPage: number | null,
        data: T[];
    }
}