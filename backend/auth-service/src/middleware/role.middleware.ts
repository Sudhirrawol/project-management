import type { Request, Response, NextFunction } from "express";
import type { AuthRequest } from "../types/auth.types.js";


export function requireRole(requiredRole: "admin" | "user") {
    return (req: AuthRequest, res: Response, next: NextFunction) => {
        if (!req.user) {
            res.status(401).json({
                message: "Unauthorized"
            })
            return
        }

        if (req.user.role !== requiredRole) {
            res.status(403).json({
                message: "Forbidden"
            })
            return
        }
        next()
    }
}