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
exports.updateProductionOrderDetails = exports.readProductionOrdersThatContainSearchTerm = exports.readProductionOrders = exports.readProductionOrder = exports.createNewProductionOrder = void 0;
const dotenv_1 = __importDefault(require("dotenv"));
const db_client_setup_1 = require("../../misc/db-client-setup");
const mssql_1 = __importDefault(require("mssql"));
const production_order_1 = require("../../interfaces/object-models/production-order/production-order");
const convert_timestamp_to_sql_acceptable_format_1 = require("../../misc/convert-timestamp-to-sql-acceptable-format");
dotenv_1.default.config();
// Properties
const _schema = process.env.PRODUCTION_ORDER_SCHEMA || "";
const _productionOrderTable = process.env.PRODUCTION_ORDER_TABLE || "";
const _productionOrderItemsTable = process.env.PRODUCTION_ORDER_ITEMS_TABLE || "";
// Create
const createNewProductionOrder = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let db = yield (0, db_client_setup_1.dbClientSetup)();
        // validate passed data before going further
        let newProductionOrder = req.body;
        const { error } = (0, production_order_1.ValidateProductionOrder)(newProductionOrder);
        if (error) {
            return res.status(400).json({ "message": error.message });
        }
        // format data into a suitable format
        let orderPlacedOn = (0, convert_timestamp_to_sql_acceptable_format_1.ConvertTimestampToSqlAcceptableFormat)(new Date(newProductionOrder.orderPlacedOn));
        let deadline = newProductionOrder.deadline ? (0, convert_timestamp_to_sql_acceptable_format_1.ConvertTimestampToSqlAcceptableFormat)(new Date(newProductionOrder.deadline)) : null;
        let products = newProductionOrder.products;
        let productOrderItems = "";
        for (let i = 0; i < products.length; i++) {
            productOrderItems += `(0, ${products[i].productId}, ${products[i].quantity})`;
            // deciding if to add comma to list
            if (i < products.length - 1) {
                productOrderItems += ",";
            }
        }
        let query = `
            DECLARE @Items ${_schema}.ProductionOrderItemType;
            DECLARE @NewProductionOrderId INT;

            INSERT INTO @Items (Completed, ProductId, Quantity)
            VALUES ${productOrderItems};

            EXEC [${_schema}].[AddProductionOrder]
                @CustomerId = ${newProductionOrder.customerId},
                @OrderPlacedOn = ${orderPlacedOn},
                @Deadline = ${deadline},
                @Items = @Items,
                @NewProductionOrderId = @NewProductionOrderId OUTPUT;

            SELECT @NewProductionOrderId AS NewProductionOrderId;   
        `;
        let result = yield db.request().query(query);
        let productionOrderId = result.recordset[0].NewProductionOrderId;
        return res.status(200).json({ "message": 'Added Production Order', "object_id": productionOrderId });
    }
    catch (error) {
        return res.status(400).json({ "error": error });
    }
});
exports.createNewProductionOrder = createNewProductionOrder;
// Read
const readProductionOrder = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let productionOrderId = Number(req.params.productionOrderId) || -1;
    if (productionOrderId == -1) {
        return res.status(400).json({ error: "Invalid ID passed" });
    }
    else {
        try {
            let db = yield (0, db_client_setup_1.dbClientSetup)();
            // get production order metadata
            let query = `
                -- metadata query
                SELECT po.*,
                c.name AS customerName
                FROM ${_schema}.${_productionOrderTable} as po
                LEFT JOIN productOrder.customer c
                ON c.id = po.customerId
                WHERE po.id = ${productionOrderId};
                
                -- associated products query
                SELECT productionOrderItem.id, completed, productionOrderId, productId, quantity, description, recipeId
                FROM ${_schema}.${_productionOrderItemsTable}
                INNER JOIN dbo.product 
                ON product.id = productionOrderItem.productId
                WHERE productionOrderId = ${productionOrderId}
            `;
            let result = yield db.request().query(query);
            // format results into json
            let formattedResults = {
                "orderInfo": result.recordsets[0][0],
                "products": result.recordsets[1]
            };
            return res.status(200).json(formattedResults);
        }
        catch (error) {
            return res.status(400).json({ "error": error });
        }
    }
});
exports.readProductionOrder = readProductionOrder;
const readProductionOrders = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let db = yield (0, db_client_setup_1.dbClientSetup)();
        let query = `
            SELECT TOP(15)
                po.*,
                c.name AS customerName
            FROM productOrder.productionOrder po
            LEFT JOIN productOrder.customer c
                ON c.id = po.customerId
            ORDER BY
                po.orderPlacedOn DESC,
                po.deadline DESC        
        `;
        let result = yield db.request().query(query);
        console.log(result);
        return res.status(200).json(result.recordset);
    }
    catch (error) {
        return res.status(400).json({ "error": error });
    }
});
exports.readProductionOrders = readProductionOrders;
const readProductionOrdersThatContainSearchTerm = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let searchTerm = String(req.params.searchTerm) || "";
    if (!searchTerm || searchTerm.trim() === "") {
        return res.status(400).json({ "error": "Invalid search term passed" });
    }
    try {
        let db = yield (0, db_client_setup_1.dbClientSetup)();
        let query = `EXEC productOrder.FetchProductionOrders @SearchTerm`;
        let result = yield db.request()
            .input("SearchTerm", mssql_1.default.NVarChar, searchTerm)
            .query(query);
        return res.status(200).json({ "results": result.recordset });
    }
    catch (error) {
        return res.status(400).json({ "error": error });
    }
});
exports.readProductionOrdersThatContainSearchTerm = readProductionOrdersThatContainSearchTerm;
// Update
const updateProductionOrderDetails = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
});
exports.updateProductionOrderDetails = updateProductionOrderDetails;
// Delete
