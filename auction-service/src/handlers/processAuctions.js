import { getEndedAuctions } from "../utils/getEndedAuctions";

async function processAuctions(event, context) {
  const auctionsToClose = await getEndedAuctions();
  console.log(auctionsToClose);
}
export const handler = processAuctions;
