import { ERROR_STRINGS } from "../configs/errors.config.mjs";
import { CustomError } from "../utils/customError.mjs";

export const handleError = async (error, _req, res, _next) => {
    const code = error.code || 500;
    if (error instanceof CustomError) {
        return res.status(200).json({
            status: error.status,
            code: error.code,
            message: ERROR_STRINGS[error.status],
        });
    }
    return res.status(code).json({
        status: "error",
        code: 500,
        message: ERROR_STRINGS["default_error"],
    });
};
