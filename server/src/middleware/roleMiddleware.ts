import { Request, Response, NextFunction } from "express";

export const adminOnly = (
  req: any,
  res: Response,
  next: NextFunction
) => {

  if (req.user.role !== "admin") {

    return res.status(403).json({
      message: "Admin access only",
    });
  }

  next();
};

export const salesOnly = (
  req: any,
  res: Response,
  next: NextFunction
) => {

  if (
    req.user.role !== "sales" &&
    req.user.role !== "admin"
  ) {

    return res.status(403).json({
      message: "Sales access only",
    });
  }

  next();
};