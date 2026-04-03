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
exports.deleteQualitySample = exports.updateQualitySample = exports.getQualitySamplesByProductionOrder = exports.getQualitySampleById = exports.createNewQualitySampleRecord = void 0;
const dotenv_1 = __importDefault(require("dotenv"));
const quality_sample_1 = require("../../interfaces/object-models/dbo/quality-sample");
const mssql_1 = __importDefault(require("mssql"));
const db_client_setup_1 = require("../../misc/db-client-setup");
const convert_timestamp_to_sql_acceptable_format_1 = require("../../misc/convert-timestamp-to-sql-acceptable-format");
dotenv_1.default.config();
// Properties
const _qualitySampleTable = process.env.QUALITY_CONTROL_TABLE || "";
const _updatableFields = [
    'productionOrderId',
    'workOrderId',
    'machineId',
    'operatorId',
    'notes',
    'result',
    'sampleQuantity',
    'sampleUnit',
    'timestamp'
];
// Create
const createNewQualitySampleRecord = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let db = yield (0, db_client_setup_1.dbClientSetup)();
        // validate passed data before going further
        let sample = req.body;
        const { error } = (0, quality_sample_1.ValidateQualitySample)(sample);
        if (error) {
            return res.status(400).json({ error: error.message });
        }
        let timestamp = (0, convert_timestamp_to_sql_acceptable_format_1.ConvertTimestampToSqlAcceptableFormat)(new Date(sample.timestamp));
        let query = `
            INSERT INTO ${_qualitySampleTable}
            (productOrderId, workOrderId, machineId, operatorId, timestamp, sampleQuantity, sampleUnit, notes, result)
            VALUES
            (${sample.productOrderId}, ${sample.workOrderId}, ${sample.machineId}, ${sample.operatorId}, ${timestamp}, ${sample.sampleQuantity}, '${sample.sampleUnit}', '${sample.notes || ""}', ${sample.result});
        `;
        let result = yield db.request().query(query);
        return res.status(200).json({ message: 'Added Quality Sample' });
    }
    catch (error) {
        if (error.code == "ETIMEOUT") {
            return res.status(408).json({ error: "Request Timeout" });
        }
        return res.status(500).json({ error: error.message, code: error.code });
    }
});
exports.createNewQualitySampleRecord = createNewQualitySampleRecord;
// Read
const getQualitySampleById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let db = yield (0, db_client_setup_1.dbClientSetup)();
        let qualitySampleId = req.params.id;
        if (qualitySampleId && Number.parseInt(qualitySampleId)) {
            let query = `
                SELECT *
                FROM ${_qualitySampleTable}
                WHERE id = ${qualitySampleId}
            `;
            let result = yield db.request().query(query);
            return res.status(200).json({ data: result.recordset });
        }
        else {
            return res.status(400).json({ error: "Bad Request" });
        }
    }
    catch (error) {
        if (error.code == "ETIMEOUT") {
            return res.status(408).json({ error: "Request Timeout" });
        }
        return res.status(500).json({ error: error.message, code: error.code });
    }
});
exports.getQualitySampleById = getQualitySampleById;
const getQualitySamplesByProductionOrder = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const db = yield (0, db_client_setup_1.dbClientSetup)();
        const productionOrderId = Number(req.query.productionOrderId);
        if (!Number.isInteger(productionOrderId)) {
            return res.status(400).json({ error: "Bad Request" });
        }
        const result = yield db.request()
            .input('productionOrderId', mssql_1.default.Int, productionOrderId)
            .query(`
                SELECT *
                FROM ${_qualitySampleTable}
                WHERE productionOrderId = @productionOrderId
            `);
        return res.status(200).json({ data: result.recordset });
    }
    catch (error) {
        if (error.code == "ETIMEOUT") {
            return res.status(408).json({ error: "Request Timeout" });
        }
        return res.status(500).json({ error: error.message, code: error.code });
    }
});
exports.getQualitySamplesByProductionOrder = getQualitySamplesByProductionOrder;
// Update
const updateQualitySample = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const db = yield (0, db_client_setup_1.dbClientSetup)();
        const id = Number(req.params.id);
        if (!Number.isInteger(id)) {
            return res.status(400).json({ error: 'Invalid id' });
        }
        const updates = [];
        const request = db.request();
        for (const field of _updatableFields) {
            if (req.body[field] !== undefined) {
                updates.push(`${field} = @${field}`);
                request.input(field, req.body[field]);
            }
        }
        if (updates.length === 0) {
            return res.status(400).json({ error: 'No valid fields provided' });
        }
        request.input('id', mssql_1.default.Int, id);
        const query = `
            UPDATE ${_qualitySampleTable}
            SET ${updates.join(', ')}
            WHERE id = @id
        `;
        yield request.query(query);
        return res.status(200).json({ message: `Quality Sample with ID '${id}' has been updated` });
    }
    catch (error) {
        if (error.code == "ETIMEOUT") {
            return res.status(408).json({ error: "Request Timeout" });
        }
        return res.status(500).json({ error: error.message, code: error.code });
    }
});
exports.updateQualitySample = updateQualitySample;
// Delete
const deleteQualitySample = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const db = yield (0, db_client_setup_1.dbClientSetup)();
        const id = Number(req.params.id);
        if (!Number.isInteger(id)) {
            return res.status(400).json({ error: 'Invalid id' });
        }
        let query = `
            DELETE FROM ${_qualitySampleTable}
            WHERE id = ${id}
        `;
        let result = yield db.request().query(query);
        return res.status(200).json({ message: `Quality Sample with ID '${id}' has been deleted` });
    }
    catch (error) {
        if (error.code == "ETIMEOUT") {
            return res.status(408).json({ error: "Request Timeout" });
        }
        return res.status(500).json({ error: error.message, code: error.code });
    }
});
exports.deleteQualitySample = deleteQualitySample;
