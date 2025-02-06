export class AppError extends Error {
    constructor(errors, statusCode) {
        super('Validation Error');
        this.statusCode = statusCode;
        this.errors = errors;
    }
}


export const asyncHandler = (functionCheck) => {
    return async (req, res, next) => {
        try {
            await functionCheck(req, res, next);
        } catch (err) {
            if (err instanceof AppError) {
                return res.status(err.statusCode).json({ message: err.errors });
            }
           return next(new AppError(err.message, 500));
        }
    };
};

export const globalErrorHandler = (err, req, res, next) => {
    if (err instanceof AppError) {
        return res.status(err.statusCode).json({ errors: err.errors });
    }
    return res.status(500).json({ message: err.message || 'Internal Server Error' });
};
