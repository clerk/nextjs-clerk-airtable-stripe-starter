export class HttpError extends Error {
    statusCode: number;

    constructor(message: string, statusCode: number) {
        super(message);

        // Set the prototype explicitly.
        Object.setPrototypeOf(this, HttpError.prototype);

        this.statusCode = statusCode;
    }
}

export function onError(error: Error) {
    // Ignore passed error, return a 401
    console.log(error);
    return new HttpError("Unauthorized", 401);
}
