import { getAuctionById } from "./getAuction";
import { uploadPictureToS3 } from "../utils/uploadPictureToS3";
import middy from "@middy/core";
import httpErrorHandler from "middy-middleware-json-error-handler";
import createHttpError from "http-errors";
import { setAuctionPictureUrl } from "../utils/setAuctionPictureUrl";
import validator from "@middy/validator";
import uploadAuctionPictureSchema from "../utils/schemas/uploadAuctionPictureSchema";

export async function uploadAuctionPicture(event, context) {
  const { id } = event.pathParameters;
  const { email } = event.requestContext.authorizer;
  const auction = await getAuctionById(id);

  if (auction.seller !== email) {
    throw new createHttpError.Forbidden(
      `You are not the seller of this auction!!`
    );
  }
  const base64 = event.body.replace(/^data:image\/\w+;base64,/, "");
  const buffer = Buffer.from(base64, "base64");
  let updatedAuction;

  try {
    const pictureUrl = await uploadPictureToS3(auction.id + ".jpg", buffer);
    updatedAuction = await setAuctionPictureUrl(id, pictureUrl);
  } catch (error) {
    console.log(error);
    throw new createHttpError.InternalServerError(error);
  }
  return {
    statusCode: 200,
    body: JSON.stringify(updatedAuction),
  };
}

export const handler = middy(uploadAuctionPicture)
  .use(httpErrorHandler())
  .use(validator({ inputSchema: uploadAuctionPictureSchema }));
