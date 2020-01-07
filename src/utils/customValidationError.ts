
export default class CustomValidationError extends Error {
    public readonly property: string;
    public readonly statusCode: number;

    constructor(property: string, message: string, statusCode: number) {
        super(message);

        Object.setPrototypeOf(this, new.target.prototype);

        this.property = property;
        this.statusCode = statusCode;

        Error.captureStackTrace(this);
    }
}