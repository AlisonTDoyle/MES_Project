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
exports.readOperatorLineStatus = exports.createNewOperatorLineStatusRecord = void 0;
const dotenv_1 = __importDefault(require("dotenv"));
const db_client_setup_1 = require("../../misc/db-client-setup");
const operator_line_check_in_out_1 = require("../../interfaces/object-models/dbo/operator-line-check-in-out");
const convert_timestamp_to_sql_acceptable_format_1 = require("../../misc/convert-timestamp-to-sql-acceptable-format");
dotenv_1.default.config();
// Properties
const _statusTable = process.env.OPERATOR_LINE_STATUS_TABLE || "";
const _schema = process.env.MAIN_SCHEMA || "";
// Create
const createNewOperatorLineStatusRecord = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // parse operator information
    let operatorId = req.params.operatorId;
    let statusInformation = req.body;
    let timestamp = new Date();
    console.log("Incoming Operator Line Status Update:", statusInformation);
    try {
        let db = yield (0, db_client_setup_1.dbClientSetup)();
        let body = req.body;
        let newCheckInOutStatus = {
            operatorId: Number.parseInt(operatorId),
            lineId: body.lineId,
            checkedIn: body.newStatus,
            timestamp: new Date()
        };
        const { error } = (0, operator_line_check_in_out_1.ValidateOperatorLineCheckInOut)(newCheckInOutStatus);
        if (error) {
            return res.status(400).json({ error: error.message });
        }
        let query = `
            INSERT INTO ${_schema}.${_statusTable}
            (operatorId, lineId, checkedIn, timestamp)
            VALUES
            (${newCheckInOutStatus.operatorId}, ${newCheckInOutStatus.lineId}, ${newCheckInOutStatus.checkedIn}, ${(0, convert_timestamp_to_sql_acceptable_format_1.ConvertTimestampToSqlAcceptableFormat)(newCheckInOutStatus.timestamp)})
        `;
        let result = yield db.request().query(query);
        return res.status(200).json({
            message: result
        });
    }
    catch (error) {
        if (error instanceof Error) {
            res.status(400).json({ message: error.message });
        }
        else {
            res.status(500).json({ message: "Unknown error occurred" });
        }
    }
});
exports.createNewOperatorLineStatusRecord = createNewOperatorLineStatusRecord;
// Read
const readOperatorLineStatus = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // parse operator id
    let operatorId = req.params.operatorId;
    try {
        let db = yield (0, db_client_setup_1.dbClientSetup)();
        let query = `
            SELECT TOP(1) *
            FROM ${_schema}.${_statusTable}
            WHERE operatorId = 1
            ORDER BY timestamp DESC;
        `;
        let result = yield db.request().query(query);
        return res.status(200).json(result.recordset[0]);
    }
    catch (error) {
        if (error instanceof Error) {
            res.status(400).json({ message: error.message });
        }
        else {
            res.status(500).json({ message: "Unknown error occurred" });
        }
    }
});
exports.readOperatorLineStatus = readOperatorLineStatus;
// Update
// Delete
