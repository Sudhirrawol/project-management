import type {
    Request, Response, NextFunction
} from 'express';

export function errorHandler(error: unknown, req: Request, res: Response, next: NextFunction): void {
    console.log(error);
    if (error instanceof Error) {
        res.status(500).json({
            success: false,
            message: error.message
        })
        return 
    }
    res.status(500).json({
        success: false
        , message: "Internal Server error"
    })
}