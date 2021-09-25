import { selectorFamily, atom } from "recoil";
import { authAtom } from "./AuthStore";
import axios from "../utils/axiosUtil";

export const biddingOnAuctionAtom = atom({
  key: "biddingOnAuctionState",
  default: null,
});
export const auctionsAtom = atom({
  key: "auctionsState",
  default: [],
});
export const fetchAuctionsSelector = selectorFamily({
  key: "fetchAuctionsState",
  get:
    (trigger) =>
    async ({ get }) => {
      const token = get(authAtom);
      if (token) {
        try {
          const newAuctions = await axios.get("/auction?status=OPEN", {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
          return newAuctions.data;
        } catch (error) {
          console.log(error);
          throw error.response.data.message;
        }
      } else return -1;
    },
});
export const placeBidSelector = selectorFamily({
  key: "placeBidState",
  get:
    (amount) =>
    async ({ get }) => {
      const auction = get(biddingOnAuctionAtom);
      const token = get(authAtom);
      if (amount !== null && auction && token) {
        try {
          const id = auction.id;
          const updatedAuction = await axios.patch(
            `/auction/${id}/bid`,
            { amount },
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );
          return updatedAuction.data;
        } catch (error) {
          console.log(error);
          throw error.response.data.message;
        }
      } else {
        return -1;
      }
    },
});

export const createAuctionSelector = selectorFamily({
  key: "placeBidState",
  get:
    (newAuction) =>
    async ({ get }) => {
      if (newAuction && newAuction.title && newAuction.pictureBase64) {
        const { title, pictureBase64 } = newAuction;
        try {
          const token = get(authAtom);
          const createAuctionResult = await axios.post(
            "/auction",
            { title, pictureBase64 },
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );
          return createAuctionResult.data;
        } catch (error) {
          console.error(error);
          throw error.response.data.message;
        }
      } else return -1;
    },
});
