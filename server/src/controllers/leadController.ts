import { Request, Response } from "express";

import Lead from "../models/Lead";

/*
=========================
CREATE LEAD
=========================
*/

export const createLead = async (
  req: Request,
  res: Response
) => {

  try {

    const {
      name,
      email,
      status,
      source,
    } = req.body;

    const lead = await Lead.create({
      name,
      email,
      status,
      source,
    });

    res.status(201).json({
      success: true,
      lead,
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message:
        "Lead creation failed",
    });
  }
};

/*
=========================
GET LEADS WITH PAGINATION
=========================
*/

export const getLeads = async (
  req: Request,
  res: Response
) => {

  try {

    /*
    =========================
    PAGE + LIMIT
    =========================
    */

    const page =
      Number(req.query.page) || 1;

    const limit = 10;

    const skip =
      (page - 1) * limit;

    /*
    =========================
    TOTAL DOCUMENTS
    =========================
    */

    const totalLeads =
      await Lead.countDocuments();

    /*
    =========================
    FETCH LEADS
    =========================
    */

    const leads = await Lead.find()
      .sort({
        createdAt: -1,
      })
      .skip(skip)
      .limit(limit);

    /*
    =========================
    RESPONSE
    =========================
    */

    res.status(200).json({
      success: true,

      currentPage: page,

      totalPages: Math.ceil(
        totalLeads / limit
      ),

      totalLeads,

      leads,
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message:
        "Failed to fetch leads",
    });
  }
};

/*
=========================
GET SINGLE LEAD
=========================
*/

export const getSingleLead = async (
  req: Request,
  res: Response
) => {

  try {

    const lead =
      await Lead.findById(
        req.params.id
      );

    if (!lead) {

      return res.status(404).json({
        success: false,
        message:
          "Lead not found",
      });
    }

    res.status(200).json({
      success: true,
      lead,
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message:
        "Failed to fetch lead",
    });
  }
};

/*
=========================
UPDATE LEAD
=========================
*/

export const updateLead = async (
  req: Request,
  res: Response
) => {

  try {

    const lead =
      await Lead.findByIdAndUpdate(
        req.params.id,
        req.body,
        {
          new: true,
        }
      );

    if (!lead) {

      return res.status(404).json({
        success: false,
        message:
          "Lead not found",
      });
    }

    res.status(200).json({
      success: true,
      lead,
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message:
        "Lead update failed",
    });
  }
};

/*
=========================
DELETE LEAD
=========================
*/

export const deleteLead = async (
  req: Request,
  res: Response
) => {

  try {

    const lead =
      await Lead.findByIdAndDelete(
        req.params.id
      );

    if (!lead) {

      return res.status(404).json({
        success: false,
        message:
          "Lead not found",
      });
    }

    res.status(200).json({
      success: true,
      message:
        "Lead deleted successfully",
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message:
        "Delete failed",
    });
  }
};