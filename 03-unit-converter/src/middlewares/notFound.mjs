import { createCustomError } from "../utils/customError.mjs";

export const notFound = (_req, res, next) => {
    return next(createCustomError("invalid_route", 404));
};
