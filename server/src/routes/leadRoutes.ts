import express from "express";

import {
  createLead,
  getLeads,
  getSingleLead,
  updateLead,
  deleteLead,
} from "../controllers/leadController";

import { protect } from "../middleware/authMiddleware";

import {
  adminOnly,
  salesOnly,
} from "../middleware/roleMiddleware";

const router = express.Router();

/*
=========================
GET ALL LEADS
ADMIN + SALES
=========================
*/

router.get(
  "/",
  protect,
  salesOnly,
  getLeads
);

/*
=========================
GET SINGLE LEAD
ADMIN + SALES
=========================
*/

router.get(
  "/:id",
  protect,
  salesOnly,
  getSingleLead
);

/*
=========================
CREATE LEAD
ADMIN ONLY
=========================
*/

router.post(
  "/",
  protect,
  adminOnly,
  createLead
);

/*
=========================
UPDATE LEAD
ADMIN ONLY
=========================
*/

router.put(
  "/:id",
  protect,
  adminOnly,
  updateLead
);

/*
=========================
DELETE LEAD
ADMIN ONLY
=========================
*/

router.delete(
  "/:id",
  protect,
  adminOnly,
  deleteLead
);

export default router;