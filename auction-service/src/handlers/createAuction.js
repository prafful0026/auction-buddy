import { v4 as uuid } from "uuid";
import aws from "aws-sdk";

const dynamoDB = new aws.DynamoDB.DocumentClient();

async function createAuction(event, context) {
  const now = new Date();
  const { title } = JSON.parse(event.body);

  const newAuction = {
    id: uuid(),
    title,
    status: "OPEN",
    createdAt: now.toISOString(),
  };

  await dynamoDB
    .put({
      TableName: process.env.AUCTIONS_TABLE_NAME,
      Item: newAuction,
    })
    .promise();

  return {
    statusCode: 201,
    body: JSON.stringify(newAuction),
  };
}

export const handler = createAuction;
