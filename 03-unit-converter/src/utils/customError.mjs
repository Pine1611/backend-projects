export class CustomError extends Error {
    constructor(status, code, message) {
        super(message);
        this.status = status;
        this.code = code;
    }
}

export const createCustomError = (status, code) => {
    return new CustomError(status, code);
};
