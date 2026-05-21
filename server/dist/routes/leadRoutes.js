"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const leadController_1 = require("../controllers/leadController");
const authMiddleware_1 = require("../middleware/authMiddleware");
const roleMiddleware_1 = require("../middleware/roleMiddleware");
const router = express_1.default.Router();
/*
=========================
GET ALL LEADS
ADMIN + SALES
=========================
*/
router.get("/", authMiddleware_1.protect, roleMiddleware_1.salesOnly, leadController_1.getLeads);
/*
=========================
GET SINGLE LEAD
ADMIN + SALES
=========================
*/
router.get("/:id", authMiddleware_1.protect, roleMiddleware_1.salesOnly, leadController_1.getSingleLead);
/*
=========================
CREATE LEAD
ADMIN ONLY
=========================
*/
router.post("/", authMiddleware_1.protect, roleMiddleware_1.adminOnly, leadController_1.createLead);
/*
=========================
UPDATE LEAD
ADMIN ONLY
=========================
*/
router.put("/:id", authMiddleware_1.protect, roleMiddleware_1.adminOnly, leadController_1.updateLead);
/*
=========================
DELETE LEAD
ADMIN ONLY
=========================
*/
router.delete("/:id", authMiddleware_1.protect, roleMiddleware_1.adminOnly, leadController_1.deleteLead);
exports.default = router;
