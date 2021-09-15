export async function uploadAuctionPicture(event, context) {
  try {
    return {
      statusCode: 200,
      body: JSON.stringify({}),
    };
  } catch (error) {
    console.log(error);
    return error;
  }
}

export const handler = uploadAuctionPicture;

