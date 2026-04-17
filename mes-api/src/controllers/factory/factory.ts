import { ScanCommand } from "@aws-sdk/client-dynamodb";
import dynamoClient from "./../../misc/dynamodb-client"
import { marshall, unmarshall } from "@aws-sdk/util-dynamodb";
import dotenv from "dotenv";
import { Request, Response } from "express";

dotenv.config();

export const readTodaysFactoryOutput = async (req: Request, res: Response) => {
    try {
        const today = new Date();
        const datePrefix = today.toISOString().split("T")[0]; // "2026-04-17"

        const command = new ScanCommand({
            TableName: process.env.FACTORY_EVENTS_TABLE,
            FilterExpression: "begins_with(#ts, :datePrefix) AND #status = :status",
            ExpressionAttributeNames: {
                "#ts": "timestamp",
                "#status": "status", // reserved word in DynamoDB, needs alias
            },
            ExpressionAttributeValues: marshall({
                ":datePrefix": datePrefix,
                ":status": "Completed",
            }),
        });

        const result = await dynamoClient.send(command);
        const items = result.Items?.map((item) => unmarshall(item)) || [];

        return res.status(200).json({ message: items });
    } catch (error) {
        return res.status(400).json({ error: error });
    }
};