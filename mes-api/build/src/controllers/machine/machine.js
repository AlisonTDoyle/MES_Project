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
exports.deleteMachine = exports.updateMachine = exports.readMachinesThatContainSearchTerm = exports.searchForMachinesById = exports.getMachineById = exports.createNewMachine = void 0;
const dotenv_1 = __importDefault(require("dotenv"));
const mssql_1 = __importDefault(require("mssql"));
const db_client_setup_1 = require("../../misc/db-client-setup");
const machine_1 = require("../../interfaces/object-models/dbo/machine");
dotenv_1.default.config();
const _machineTable = process.env.MACHINE_TABLE || "";
const _updatableFields = [
    'lineId',
    'machineType',
    'description'
];
// Create
const createNewMachine = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let db = yield (0, db_client_setup_1.dbClientSetup)();
        let machine = req.body;
        const { error } = (0, machine_1.ValidateMachine)(machine);
        if (error) {
            return res.status(400).json({ error: error.message });
        }
        let query = `
            INSERT INTO ${_machineTable}
            (lineId, machineType, description)
            VALUES
            (${machine.lineId}, ${machine.machineType}, '${machine.description}')
        `;
        let result = yield db.request().query(query);
        return res.status(200).json({
            message: result
        });
    }
    catch (error) {
        if (error.code == "ETIMEOUT") {
            return res.status(408).json({ error: "Request Timeout" });
        }
        return res.status(500).json({ error: error.message, code: error.code });
    }
});
exports.createNewMachine = createNewMachine;
// Read
const getMachineById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let db = yield (0, db_client_setup_1.dbClientSetup)();
        let machineId = req.params.id;
        if (machineId && Number.parseInt(machineId)) {
            let query = `
            SELECT *
            FROM ${_machineTable}
            WHERE id = ${machineId}
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
exports.getMachineById = getMachineById;
const searchForMachinesById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let db = yield (0, db_client_setup_1.dbClientSetup)();
        let idSearchTerm = req.query.search;
        if (!Number.isInteger(idSearchTerm)) {
            return res.status(400).json({ error: "Bad Request" });
        }
        let query = `
            SELECT TOP(20) [id]
            FROM ${_machineTable}
            WHERE id LIKE '%${idSearchTerm}%'
        `;
        let result = yield db.request().query(query);
        return res.status(200).json({ data: result.recordset });
    }
    catch (error) {
        if (error.code == "ETIMEOUT") {
            return res.status(408).json({ error: "Request Timeout" });
        }
        return res.status(500).json({ error: error.message, code: error.code });
    }
});
exports.searchForMachinesById = searchForMachinesById;
const readMachinesThatContainSearchTerm = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let searchTerm = String(req.params.searchTerm) || "";
    if (!searchTerm || searchTerm.trim() === "") {
        return res.status(400).json({ "error": "Invalid search term passed" });
    }
    try {
        let db = yield (0, db_client_setup_1.dbClientSetup)();
        let query = `EXEC dbo.FetchMachines @SearchTerm`;
        let result = yield db.request()
            .input("SearchTerm", mssql_1.default.NVarChar, searchTerm)
            .query(query);
        return res.status(200).json({ "results": result.recordset });
    }
    catch (error) {
        return res.status(400).json({ "error": error });
    }
});
exports.readMachinesThatContainSearchTerm = readMachinesThatContainSearchTerm;
// Update
const updateMachine = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
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
            UPDATE ${_machineTable}
            SET ${updates.join(', ')}
            WHERE id = @id
        `;
        yield request.query(query);
        return res.status(200).json({ message: `Machine with ID '${id}' has been updated` });
    }
    catch (error) {
        if (error.code == "ETIMEOUT") {
            return res.status(408).json({ error: "Request Timeout" });
        }
        return res.status(500).json({ error: error.message, code: error.code });
    }
});
exports.updateMachine = updateMachine;
// Delete
const deleteMachine = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const db = yield (0, db_client_setup_1.dbClientSetup)();
        const id = Number(req.params.id);
        if (!Number.isInteger(id)) {
            return res.status(400).json({ error: 'Invalid id' });
        }
        let query = `
            DELETE FROM ${_machineTable}
            WHERE id = ${id}
        `;
        let result = yield db.request().query(query);
        return res.status(200).json({ message: `Machine with ID '${id}' has been deleted` });
    }
    catch (error) {
        if (error.code == "ETIMEOUT") {
            return res.status(408).json({ error: "Request Timeout" });
        }
        return res.status(500).json({ error: error.message, code: error.code });
    }
});
exports.deleteMachine = deleteMachine;
