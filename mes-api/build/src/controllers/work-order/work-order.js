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
exports.readStatusesOfAllOngoingWorkOrders = exports.readWorkOrdersForTimePeriod = exports.readWorkOrders = void 0;
const dotenv_1 = __importDefault(require("dotenv"));
const db_client_setup_1 = require("../../misc/db-client-setup");
dotenv_1.default.config();
// Properties
const _workOrderTable = process.env.WORK_ORDER_TABLE || "";
// Create
// Read
const readWorkOrders = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // let today = new Date();
    // let { data, error } = await _supabase
    //     .from(_workOrderTable)
    //     .select("*")
    //     .eq("scheduleDate", today.toISOString().split('T')[0])
    //     .order("scheduleDate", { ascending: true });
    // if (error) {
    //     res.status(400).json({ message: error.message });
    // }
    // res.status(200).json({ data });
});
exports.readWorkOrders = readWorkOrders;
const readWorkOrdersForTimePeriod = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // let body = req.body as {timePeriod:number};
    // let timePeriod = body.timePeriod;
    // let today = new Date();
    // let endDay = addDays(today, timePeriod);
    // let { data, error } = await _supabase
    //     .from(_workOrderTable)
    //     .select("*")
    //     .lte("scheduleDate", endDay.toISOString().split('T')[0])
    //     .gte("scheduleDate", today.toISOString().split('T')[0])
    //     .order("scheduleDate", { ascending: true });
    // if (error) {
    //     res.status(400).json({ message: error.message });
    // }
    // res.status(200).json({ data });
});
exports.readWorkOrdersForTimePeriod = readWorkOrdersForTimePeriod;
const readStatusesOfAllOngoingWorkOrders = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let db = yield (0, db_client_setup_1.dbClientSetup)();
        let query = `EXEC GetStatusesOfAllOngoingWorkOrders`;
        let result = yield db.request().query(query);
        return res.status(200).json({
            message: result.recordset
        });
    }
    catch (error) {
        return res.status(500).json({
            message: "An error occurred while fetching work order statuses."
        });
    }
});
exports.readStatusesOfAllOngoingWorkOrders = readStatusesOfAllOngoingWorkOrders;
// Update
// Delete
// Misc
