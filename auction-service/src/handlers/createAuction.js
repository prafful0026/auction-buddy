import { v4 as uuid } from "uuid";
import aws from "aws-sdk";
import createError from "http-errors";
import commonMiddleware from "../utils/commonMiddleware";
import validator from "@middy/validator";
import createAuctionSchema from "../utils/schemas/createAuctionSchema";
import { uploadPictureToS3 } from "../utils/uploadPictureToS3";
const dynamoDB = new aws.DynamoDB.DocumentClient();

async function createAuction(event, context) {
  const now = new Date();
  const { email } = event.requestContext.authorizer;
  const { title, pictureBase64 } = event.body;
  const endDate = new Date();
  endDate.setHours(now.getHours() + 1);

  const base64 = pictureBase64.replace(/^data:image\/\w+;base64,/, "");
  const buffer = Buffer.from(base64, "base64");
  let newAuction;
  try {
    const id = uuid();

    const pictureUrl = await uploadPictureToS3(id + ".jpg", buffer);
    newAuction = {
      id,
      title,
      status: "OPEN",
      createdAt: now.toISOString(),
      endingAt: endDate.toISOString(),
      highestBid: {
        amount: 0,
      },
      seller: email,
      pictureUrl,
    };
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

export const handler = commonMiddleware(createAuction).use(
  validator({
    inputSchema: createAuctionSchema,
    ajvOptions: { strict: false },
  })
);
