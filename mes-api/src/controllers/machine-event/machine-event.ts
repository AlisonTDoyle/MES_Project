// Imports
import { Request, Response } from "express";
import dotenv from "dotenv";
import { OperatorRecordedEvent, ValidateOperatorRecordedEvent } from "../../interfaces/object-models/dbo/operator-recorded-event";
import { ConvertTimestampToSqlAcceptableFormat } from "../../misc/convert-timestamp-to-sql-acceptable-format";
import sql, { IResult } from "mssql";
import { dbClientSetup } from "../../misc/db-client-setup";
import { timeStamp } from "console";

dotenv.config();

// Properties
const _operatorRecordedEventsTable: string = process.env.MACHINE_EVENTS_TABLE || ""

// Create
export const createNewMachineEventRecord = async (req: Request, res: Response) => {
  try {
    let db: sql.ConnectionPool = await dbClientSetup();

    const body: any = req.body;
    let opRecordedEvent: OperatorRecordedEvent = {
      machineId: body.machineId,
      reportingOperatorId: body.reportingOperatorId,
      description: body.description,
      eventType: body.eventType,
      relatedIssue: body.relatedIssue,
      timestamp: new Date()
    };

    const { error } = ValidateOperatorRecordedEvent(opRecordedEvent);

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
        , ${ConvertTimestampToSqlAcceptableFormat(opRecordedEvent.timestamp)}
        , ${opRecordedEvent.eventType}
        , ${opRecordedEvent.relatedIssue}
      );

      declare @Id int = SCOPE_IDENTITY();

      SELECT *
      FROM operatorRecordedEvent
      WHERE id = @Id
    `;

    let result: IResult<any> = await db.request().query(query);

    return res.status(201).json(result.recordset[0]);
  } catch (err) {
    console.error("API error:", err);
    return res.status(500).json({ message: "Internal server error" });
  }
};


// Read

// Update

// Delete