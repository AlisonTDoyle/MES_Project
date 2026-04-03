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
exports.readMachineIssueType = void 0;
const dotenv_1 = __importDefault(require("dotenv"));
const db_client_setup_1 = require("../../misc/db-client-setup");
dotenv_1.default.config();
// Properties
const _machineIssueType = process.env.MACHINE_ISSUE_TYPE || "";
const _schema = process.env.TYPES_SCHEMA || "";
// Create
// (not implemented)
// Read
const readMachineIssueType = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let db = yield (0, db_client_setup_1.dbClientSetup)();
        let query = `
            SELECT *
            FROM ${_schema}.${_machineIssueType};
        `;
        let result = yield db.request().query(query);
        return res.status(200).json({
            data: result.recordset
        });
    }
    catch (error) {
        if (error instanceof Error) {
            return res.status(400).json({ message: error.message });
        }
        else {
            return res.status(500).json({ message: "Unknown error occurred" });
        }
    }
});
exports.readMachineIssueType = readMachineIssueType;
// Update
// (not implemented)
// Delete
// (not implemented)
