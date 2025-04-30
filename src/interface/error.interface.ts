export interface Error{
    response: ErrorResponse
}

export interface ErrorResponse {
    message: string;
    statusCode: number;
}