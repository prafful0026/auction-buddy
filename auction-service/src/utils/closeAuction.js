import AWS from "aws-sdk";
const dynamoDB = new AWS.DynamoDB.DocumentClient();

const sqs = new AWS.SQS();

export async function closeAuction(auction) {
  const params = {
    TableName: process.env.AUCTIONS_TABLE_NAME,
    Key: { id: auction.id },
    UpdateExpression: "set #status = :status",
    ExpressionAttributeValues: {
      ":status": "CLOSED",
    },
    ExpressionAttributeNames: {
      "#status": "status",
    },
  };
  await dynamoDB.update(params).promise();

  const {
    title,
    seller,
    highestBid: { amount, bidder },
  } = auction;

  if (amount === 0) {
    await sqs
      .sendMessage({
        QueueUrl: process.env.MAIL_QUEUE_URL,
        MessageBody: JSON.stringify({
          subject: "No bids on your auction item :(",
          recipient: seller,
          body: `Oh no!! Your item ${title} didnt get any bids, better luck next time.`,
        }),
      })
      .promise();
    return;
  }
  const notifySeller = sqs
    .sendMessage({
      QueueUrl: process.env.MAIL_QUEUE_URL,
      MessageBody: JSON.stringify({
        subject: "Your item has been sold",
        recipient: seller,
        body: `Yo!! Your item ${title} has been sold for Rs.${amount}.`,
      }),
    })
    .promise();
  const notifyBidder = sqs
    .sendMessage({
      QueueUrl: process.env.MAIL_QUEUE_URL,
      MessageBody: JSON.stringify({
        subject: "You won an auction!!!",
        recipient: bidder,
        body: `What a great deal you got yourself a ${title} for Rs.${amount}.`,
      }),
    })
    .promise();

  return Promise.all([notifyBidder, notifySeller]);
}
