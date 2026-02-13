// Imports
import { Request, Response } from "express";
import dotenv from "dotenv";
import { dbClientSetup } from "../../misc/db-client-setup";
import sql, { IResult } from "mssql";
import { ProductionOrder, ValidateProductionOrder } from "../../interfaces/object-models/production-order/production-order";
import { ConvertTimestampToSqlAcceptableFormat } from "../../misc/convert-timestamp-to-sql-acceptable-format";

dotenv.config();

// Properties
const _schema: string = process.env.PRODUCTION_ORDER_SCHEMA || "";
const _productionOrderTable: string = process.env.PRODUCTION_ORDER_TABLE || "";
const _productionOrderItemsTable: string = process.env.PRODUCTION_ORDER_ITEMS_TABLE || "";

// Create
export const createNewProductionOrder = async (req: Request, res: Response) => {
    try {
        let db: sql.ConnectionPool = await dbClientSetup();

        // validate passed data before going further
        let newProductionOrder: ProductionOrder = req.body;
        const { error } = ValidateProductionOrder(newProductionOrder);

        if (error) {
            return res.status(400).json({ "message": error.message });
        }

        // format data into a suitable format
        let orderPlacedOn: string = ConvertTimestampToSqlAcceptableFormat(new Date(newProductionOrder.orderPlacedOn));
        let deadline: string | null = newProductionOrder.deadline ? ConvertTimestampToSqlAcceptableFormat(new Date(newProductionOrder.deadline)) : null;

        let products = newProductionOrder.products;
        let productOrderItems: string = "";
        for (let i = 0; i < products.length; i++) {
            productOrderItems += `(0, ${products[i].productId}, ${products[i].quantity})`

            // deciding if to add comma to list
            if (i < products.length - 1) {
                productOrderItems += ","
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

        let result: IResult<any> = await db.request().query(query);
        let productionOrderId: number = result.recordset[0].NewProductionOrderId;

        return res.status(200).json({ "message": 'Added Production Order', "object_id": productionOrderId });
    } catch (error: any) {
        return res.status(400).json({ "error": error });
    }
}

// Read
export const readProductionOrder = async (req: Request, res: Response) => {
    let productionOrderId: number = Number(req.params.productionOrderId) || -1;

    if (productionOrderId == -1) {
        return res.status(400).json({ error: "Invalid ID passed" })
    } else {
        try {
            let db: sql.ConnectionPool = await dbClientSetup();

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

            let result: any = await db.request().query(query);

            // format results into json
            let formattedResults = {
                "orderInfo": result.recordsets[0][0],
                "products": result.recordsets[1]
            }
            
            return res.status(200).json(formattedResults);
        } catch (error) {
            return res.status(400).json({ "error": error });
        }
    }
}

export const readProductionOrders = async (req: Request, res: Response) => {
    try {
        let db: sql.ConnectionPool = await dbClientSetup();

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

        let result: any = await db.request().query(query);

        console.log(result)

        return res.status(200).json(result.recordset);
    } catch (error) {
        return res.status(400).json({ "error": error });
    }
}

// Update
export const updateProductionOrderDetails = async (req: Request, res: Response) => {

}

// Delete