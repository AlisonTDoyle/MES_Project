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
exports.getLatestMachineEvents = exports.createNewMachineEventRecord = void 0;
const dotenv_1 = __importDefault(require("dotenv"));
const operator_recorded_event_1 = require("../../interfaces/object-models/dbo/operator-recorded-event");
const convert_timestamp_to_sql_acceptable_format_1 = require("../../misc/convert-timestamp-to-sql-acceptable-format");
const db_client_setup_1 = require("../../misc/db-client-setup");
dotenv_1.default.config();
// Properties
const _operatorRecordedEventsTable = process.env.MACHINE_EVENTS_TABLE || "";
// Create
const createNewMachineEventRecord = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let db = yield (0, db_client_setup_1.dbClientSetup)();
        const body = req.body;
        let opRecordedEvent = {
            machineId: body.machineId,
            reportingOperatorId: body.reportingOperatorId,
            description: body.description,
            eventType: body.eventType,
            relatedIssue: body.relatedIssue,
            timestamp: new Date()
        };
        const { error } = (0, operator_recorded_event_1.ValidateOperatorRecordedEvent)(opRecordedEvent);
        if (error) {
            return res.status(400).json({ error: error.message });
        }
        let query = `
      INSERT INTO ${_operatorRecordedEventsTable}
      (machineId, reportingOperatorId, description, timestamp, eventType, issueCategoryId)
      VALUES
      (${opRecordedEvent.machineId}
        , ${opRecordedEvent.reportingOperatorId}
        , '${opRecordedEvent.description}'
        , ${(0, convert_timestamp_to_sql_acceptable_format_1.ConvertTimestampToSqlAcceptableFormat)(opRecordedEvent.timestamp)}
        , ${opRecordedEvent.eventType}
        , ${opRecordedEvent.relatedIssue}
      );

      declare @Id int = SCOPE_IDENTITY();

      SELECT *
      FROM operatorRecordedEvent
      WHERE id = @Id
    `;
        let result = yield db.request().query(query);
        return res.status(201).json(result.recordset[0]);
    }
    catch (err) {
        console.error("API error:", err);
        return res.status(500).json({ message: "Internal server error" });
    }
});
exports.createNewMachineEventRecord = createNewMachineEventRecord;
// Read
const getLatestMachineEvents = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let db = yield (0, db_client_setup_1.dbClientSetup)();
        let query = `EXEC GetMostRecentOperatorRecordedEvents 10`;
        let result = yield db.request().query(query);
        return res.status(200).json(result.recordset);
    }
    catch (err) {
        console.error("API error:", err);
        return res.status(500).json({ message: "Internal server error" });
    }
});
exports.getLatestMachineEvents = getLatestMachineEvents;
// Update
// Delete
