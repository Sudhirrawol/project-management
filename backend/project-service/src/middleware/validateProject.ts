import { Request, Response, NextFunction } from "express";

export const validateProject = (
  req: Request,
  res: Response,
  next: NextFunction,
): void => {
  const { name, description } = req.body;

  if (!name || !description) {
    res.status(500).json({
      message: "Name and Description are Required",
    });
    return;
  }
  next();
};
