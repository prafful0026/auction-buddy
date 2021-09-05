import { v4 as uuid } from "uuid";
import aws from "aws-sdk";
import middy from "@middy/core";
import httpJsonBodyParser from "@middy/http-json-body-parser";
import httpErrorHandler from "@middy/http-error-handler";
import httpEventNormalizer from "@middy/http-event-normalizer";
import createError from "http-errors";

const dynamoDB = new aws.DynamoDB.DocumentClient();

async function createAuction(event, context) {
  const now = new Date();
  const { title } = event.body;

  const newAuction = {
    id: uuid(),
    title,
    status: "OPEN",
    createdAt: now.toISOString(),
  };
  try {
    await dynamoDB
      .put({
        TableName: process.env.AUCTIONS_TABLE_NAME,
        Item: newAuction,
      })
      .promise();
  } catch (error) {
    console.log(error);
    throw new createError.InternalServerError(error);
  }

  return {
    statusCode: 201,
    body: JSON.stringify(newAuction),
  };
}

export const handler = middy(createAuction)
  .use(httpJsonBodyParser())
  .use(httpEventNormalizer())
  .use(httpErrorHandler());
