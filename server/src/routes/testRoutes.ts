import express from "express";

import { protect } from "../middleware/authMiddleware";

import {
  adminOnly,
  salesOnly,
} from "../middleware/roleMiddleware";

const router = express.Router();

/*
=========================
ADMIN TEST ROUTE
=========================
*/

router.get(
  "/admin",
  protect,
  adminOnly,
  (req, res) => {

    res.json({
      message:
        "Welcome Admin",
    });
  }
);

/*
=========================
SALES TEST ROUTE
=========================
*/

router.get(
  "/sales",
  protect,
  salesOnly,
  (req, res) => {

    res.json({
      message:
        "Welcome Sales User",
    });
  }
);

/*
=========================
PROFILE TEST
=========================
*/

router.get(
  "/profile",
  protect,
  (req: any, res) => {

    res.json({
      user: req.user,
    });
  }
);

export default router;