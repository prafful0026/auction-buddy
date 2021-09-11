import createErrors from "http-errors";
import { getEndedAuctions } from "../utils/getEndedAuctions";
import { closeAuction } from "../utils/closeAuction";
async function processAuctions(event, context) {
  try {
    const auctionsToClose = await getEndedAuctions();
    const closePromises = auctionsToClose.map((auction) =>
      closeAuction(auction)
    );
    await Promise.all(closePromises);
    return { closed: closePromises.length };
  } catch (error) {
    throw new createErrors.InternalServerError(error);
  }
}
export const handler = processAuctions;
