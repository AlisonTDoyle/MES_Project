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
exports.updateWorkOrderStatus = exports.readTodaysWorkOrders = exports.createWorkOrder = void 0;
const dotenv_1 = __importDefault(require("dotenv"));
const mssql_1 = __importDefault(require("mssql"));
const db_client_setup_1 = require("../../misc/db-client-setup");
dotenv_1.default.config();
// Properties
const _workOrderTable = process.env.WORK_ORDER_TABLE || "";
const _schema = process.env.MAIN_SCHEMA || "";
// Create
// Create
const createWorkOrder = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        let body = req.body; // or strongly type if you have interface
        let db = yield (0, db_client_setup_1.dbClientSetup)();
        let query = `
            INSERT INTO ${_schema}.${_workOrderTable}
            (
                operatorId,
                lineId,
                description,
                scheduleDate,
                completed,
                productionOrderItemId
            )
            OUTPUT INSERTED.*
            VALUES
            (
                @operatorId,
                @lineId,
                @description,
                @scheduleDate,
                @completed,
                @productionOrderItemId
            );
        `;
        let result = yield db.request()
            .input("operatorId", mssql_1.default.Int, body.operatorId)
            .input("lineId", mssql_1.default.Int, body.lineId)
            .input("description", mssql_1.default.NVarChar, body.description)
            .input("scheduleDate", mssql_1.default.Date, body.scheduleDate)
            .input("completed", mssql_1.default.Bit, (_a = body.completed) !== null && _a !== void 0 ? _a : false)
            .input("productionOrderItemId", mssql_1.default.Int, body.operatorId)
            .query(query);
        return res.status(201).json({
            data: result.recordset[0]
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
exports.createWorkOrder = createWorkOrder;
// Read
const readTodaysWorkOrders = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let operatorId = req.params.operatorId;
    let today = new Date().toISOString().split("T")[0]; // YYYY-MM-DD
    try {
        let db = yield (0, db_client_setup_1.dbClientSetup)();
        let query = `
            SELECT *
            FROM ${_schema}.${_workOrderTable}
            WHERE scheduleDate = @today
            AND operatorId = @operatorId
            ORDER BY scheduleDate ASC;
        `;
        let result = yield db.request()
            .input("today", mssql_1.default.Date, today)
            .input("operatorId", mssql_1.default.Int, Number.parseInt(operatorId))
            .query(query);
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
exports.readTodaysWorkOrders = readTodaysWorkOrders;
// Update
const updateWorkOrderStatus = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log(req.body);
    let workOrderReq = req.body;
    try {
        let db = yield (0, db_client_setup_1.dbClientSetup)();
        let query = `
            UPDATE ${_schema}.${_workOrderTable}
            SET completed = @status
            WHERE id = @workOrderId;

            SELECT *
            FROM ${_schema}.${_workOrderTable}
            WHERE id = @workOrderId;
        `;
        let result = yield db.request()
            .input("status", mssql_1.default.Bit, workOrderReq.status)
            .input("workOrderId", mssql_1.default.Int, workOrderReq.workOrderId)
            .query(query);
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
exports.updateWorkOrderStatus = updateWorkOrderStatus;
// Delete
// (not implemented)
