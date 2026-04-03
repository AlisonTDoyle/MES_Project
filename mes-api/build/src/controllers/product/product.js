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
exports.fetchProducts = void 0;
const dotenv_1 = __importDefault(require("dotenv"));
const db_client_setup_1 = require("../../misc/db-client-setup");
dotenv_1.default.config();
const _productTable = process.env.PRODUCT_TABLE || '';
const _productSchema = process.env.MAIN_SCHEMA || '';
const fetchProducts = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let db = yield (0, db_client_setup_1.dbClientSetup)();
        let query = `
            SELECT *
            FROM ${_productSchema}.${_productTable}
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
exports.fetchProducts = fetchProducts;
