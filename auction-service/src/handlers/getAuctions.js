import aws from "aws-sdk";
import middy from "@middy/core";
import httpJsonBodyParser from "@middy/http-json-body-parser";
import httpErrorHandler from "@middy/http-error-handler";
import httpEventNormalizer from "@middy/http-event-normalizer";
import createError from "http-errors";

const dynamoDB = new aws.DynamoDB.DocumentClient();

async function getAuctions(event, context) {
  let auctions;

  try {
    const result = await dynamoDB
      .scan({
        TableName: process.env.AUCTIONS_TABLE_NAME,
      })
      .promise();
    auctions = result.Items;
  } catch (error) {
    console.log(error);
    throw new createError.InternalServerError(error);
  }

  return {
    statusCode: 200,
    body: JSON.stringify(auctions),
  };
}

export const handler = middy(getAuctions)
  .use(httpJsonBodyParser())
  .use(httpEventNormalizer())
  .use(httpErrorHandler());
