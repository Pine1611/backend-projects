/**
 * @description Set try catch wrapped all the resources
 */
export const tryCatchWrapper = (func) => {
    return async (req, res, next) => {
        try {
            await func(req, res, next);
        } catch (error) {
            return res.status(500).json({
                message: "Something went wrong, please try again!",
                error: error,
            });
        }
    };
};
