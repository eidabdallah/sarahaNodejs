export class AppError extends Error {
    constructor(message, statusCode) {
        super(message);
        this.statusCode = statusCode;
    }
}
export const asyncHandler = (functionCheck) => {
    return async (req, res, next) => {
        try {
            await functionCheck(req, res, next);
        } catch (err) {
            const errorMessage = err.message || 'An unexpected error occurred';
            return next(new AppError(errorMessage, 500));
        };
    }
}

export const globalErrorHandler = (err, req, res, next) => {
    if (err) {
        return res.status(err.statusCode).json({ message: err.message || err });
    }
}

