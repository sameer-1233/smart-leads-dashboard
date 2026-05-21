"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const authMiddleware_1 = require("../middleware/authMiddleware");
const roleMiddleware_1 = require("../middleware/roleMiddleware");
const router = express_1.default.Router();
/*
=========================
ADMIN TEST ROUTE
=========================
*/
router.get("/admin", authMiddleware_1.protect, roleMiddleware_1.adminOnly, (req, res) => {
    res.json({
        message: "Welcome Admin",
    });
});
/*
=========================
SALES TEST ROUTE
=========================
*/
router.get("/sales", authMiddleware_1.protect, roleMiddleware_1.salesOnly, (req, res) => {
    res.json({
        message: "Welcome Sales User",
    });
});
/*
=========================
PROFILE TEST
=========================
*/
router.get("/profile", authMiddleware_1.protect, (req, res) => {
    res.json({
        user: req.user,
    });
});
exports.default = router;
