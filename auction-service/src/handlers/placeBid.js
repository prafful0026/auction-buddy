import aws from "aws-sdk";
import commonMiddleware from "../utils/commonMiddleware";
import createError from "http-errors";
import { getAuctionById } from "./getAuction";

const dynamoDB = new aws.DynamoDB.DocumentClient();

async function placeBid(event, context) {
  const { id } = event.pathParameters;
  const { amount } = event.body;
  const auction = await getAuctionById(id);
  if (auction.status !== "OPEN") {
    throw new createError.Forbidden("You cannot bid on closed auction");
  }
  if (amount <= auction.highestBid.amount) {
    throw new createError.Forbidden(
      `Your bid must be higher than ${auction.highestBid.amount}`
    );
  }
  const params = {
    TableName: process.env.AUCTIONS_TABLE_NAME,
    Key: { id },
    UpdateExpression: "set highestBid.amount = :amount",
    ExpressionAttributeValues: {
      ":amount": amount,
    },
    ReturnValues: "ALL_NEW",
  };
  let updatedAuction;
  try {
    const result = await dynamoDB.update(params).promise();
    updatedAuction = result.Attributes;
  } catch (error) {
    console.log(error);
    throw new createError.InternalServerError(error);
  }

  if (!updatedAuction) {
    throw new createError.NotFound(`Auction with ID ${id} not found`);
  }

  return {
    statusCode: 200,
    body: JSON.stringify(updatedAuction),
  };
}

export const handler = commonMiddleware(placeBid);
