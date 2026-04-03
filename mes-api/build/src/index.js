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
// Imports
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const cors_1 = __importDefault(require("cors"));
const machine_event_1 = __importDefault(require("./routes/machine-event"));
const operator_1 = __importDefault(require("./routes/operator"));
const work_order_1 = __importDefault(require("./routes/work-order"));
const machine_1 = __importDefault(require("./routes/machine"));
const production_order_1 = __importDefault(require("./routes/production-order"));
const quality_sample_1 = __importDefault(require("./routes/quality-sample"));
const db_client_setup_1 = require("./misc/db-client-setup");
const mqtt_1 = __importDefault(require("./controllers/mqtt/mqtt"));
const customer_1 = __importDefault(require("./routes/customer"));
const product_1 = __importDefault(require("./routes/product"));
// Enable environment variables
dotenv_1.default.config();
// Express server setup
const PORT = process.env.PORT || 10001;
const app = (0, express_1.default)();
// Adding functionality
app.use((0, cors_1.default)());
app.use(express_1.default.json());
app.use("/api/machine-event", machine_event_1.default);
app.use("/api/operator", operator_1.default);
app.use("/api/work-order", work_order_1.default);
app.use("/api/machine", machine_1.default);
app.use("/api/production-order", production_order_1.default);
app.use("/api/quality-sample", quality_sample_1.default);
app.use("/api/customer", customer_1.default);
app.use("/api/product", product_1.default);
app.use('/api/mqtt', mqtt_1.default);
app.get("/api/db-test", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const db = yield (0, db_client_setup_1.dbClientSetup)();
        const result = yield db.request().query("SELECT TOP 10 * FROM operator");
        res.status(200).json(result.recordset);
    }
    catch (err) {
        res.status(500).json({ error: err.message });
    }
}));
// Start server
app.listen(PORT, () => {
    console.log(`MES API listening on port ${PORT}!`);
});
