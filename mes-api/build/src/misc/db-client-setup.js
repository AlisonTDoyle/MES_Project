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
exports.dbClientSetup = dbClientSetup;
const mssql_1 = __importDefault(require("mssql"));
function dbClientSetup() {
    return __awaiter(this, void 0, void 0, function* () {
        let db = yield mssql_1.default.connect({
            user: process.env.AWS_RDS_USER || "",
            password: process.env.AWS_RDS_PASSWORD || "",
            server: process.env.AWS_RDS_SERVER || "",
            port: 1433,
            database: process.env.AWS_RDS_NAME || "",
            options: { encrypt: true, trustServerCertificate: true }
        });
        return db;
    });
}
