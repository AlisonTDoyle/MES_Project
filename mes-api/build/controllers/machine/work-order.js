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
exports.getCurrentWorkOrderForMachine = void 0;
const dotenv_1 = __importDefault(require("dotenv"));
const mssql_1 = __importDefault(require("mssql"));
const db_client_setup_1 = require("../../misc/db-client-setup");
dotenv_1.default.config();
const _workOrderTable = process.env.WORK_ORDER_TABLE || "";
// Read
const getCurrentWorkOrderForMachine = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let db = yield (0, db_client_setup_1.dbClientSetup)();
        let machineId = Number.parseInt(req.params.machineId);
        let query = `EXEC [dbo].[GetCurrentWorkOrderForMachine] @MachineId`;
        let result = yield db.request()
            .input('MachineId', mssql_1.default.Int, machineId)
            .query(query);
        return res.status(200).json(result.recordset[0]);
    }
    catch (error) {
        console.error("API error:", error);
        return res.status(500).json({ message: "Internal server error" });
    }
});
exports.getCurrentWorkOrderForMachine = getCurrentWorkOrderForMachine;
