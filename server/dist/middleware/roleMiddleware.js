"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.salesOnly = exports.adminOnly = void 0;
const adminOnly = (req, res, next) => {
    if (req.user.role !== "admin") {
        return res.status(403).json({
            message: "Admin access only",
        });
    }
    next();
};
exports.adminOnly = adminOnly;
const salesOnly = (req, res, next) => {
    if (req.user.role !== "sales" &&
        req.user.role !== "admin") {
        return res.status(403).json({
            message: "Sales access only",
        });
    }
    next();
};
exports.salesOnly = salesOnly;
