"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteLead = exports.updateLead = exports.getSingleLead = exports.getLeads = exports.createLead = void 0;
const Lead_1 = __importDefault(require("../models/Lead"));
/*
=========================
CREATE LEAD
=========================
*/
const createLead = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { name, email, status, source, } = req.body;
        const lead = yield Lead_1.default.create({
            name,
            email,
            status,
            source,
        });
        res.status(201).json({
            success: true,
            lead,
        });
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: "Lead creation failed",
        });
    }
});
exports.createLead = createLead;
/*
=========================
GET LEADS WITH PAGINATION
=========================
*/
const getLeads = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        /*
        =========================
        PAGE + LIMIT
        =========================
        */
        const page = Number(req.query.page) || 1;
        const limit = 10;
        const skip = (page - 1) * limit;
        /*
        =========================
        TOTAL DOCUMENTS
        =========================
        */
        const totalLeads = yield Lead_1.default.countDocuments();
        /*
        =========================
        FETCH LEADS
        =========================
        */
        const leads = yield Lead_1.default.find()
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
            totalPages: Math.ceil(totalLeads / limit),
            totalLeads,
            leads,
        });
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: "Failed to fetch leads",
        });
    }
});
exports.getLeads = getLeads;
/*
=========================
GET SINGLE LEAD
=========================
*/
const getSingleLead = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const lead = yield Lead_1.default.findById(req.params.id);
        if (!lead) {
            return res.status(404).json({
                success: false,
                message: "Lead not found",
            });
        }
        res.status(200).json({
            success: true,
            lead,
        });
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: "Failed to fetch lead",
        });
    }
});
exports.getSingleLead = getSingleLead;
/*
=========================
UPDATE LEAD
=========================
*/
const updateLead = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const lead = yield Lead_1.default.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
        });
        if (!lead) {
            return res.status(404).json({
                success: false,
                message: "Lead not found",
            });
        }
        res.status(200).json({
            success: true,
            lead,
        });
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: "Lead update failed",
        });
    }
});
exports.updateLead = updateLead;
/*
=========================
DELETE LEAD
=========================
*/
const deleteLead = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const lead = yield Lead_1.default.findByIdAndDelete(req.params.id);
        if (!lead) {
            return res.status(404).json({
                success: false,
                message: "Lead not found",
            });
        }
        res.status(200).json({
            success: true,
            message: "Lead deleted successfully",
        });
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: "Delete failed",
        });
    }
});
exports.deleteLead = deleteLead;
