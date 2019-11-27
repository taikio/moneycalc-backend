
export class CustomError extends Error {
    public readonly isOperational: boolean;
    public readonly statusCode: number;

    constructor(message: string, statusCode: number, isOperational: boolean) {
        super(message);

        Object.setPrototypeOf(this, new.target.prototype);

        this.isOperational = isOperational;
        this.statusCode = statusCode;

        Error.captureStackTrace(this);
    }
}