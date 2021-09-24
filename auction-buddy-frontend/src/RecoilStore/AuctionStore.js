import { selectorFamily, atom, selector } from "recoil";
import { authAtom } from "./AuthStore";
import { API_BASE_URL } from "../utils/constants";
import Axios from "axios";
const axios = Axios.create({
  baseURL: API_BASE_URL,
});
export const biddingOnAuctionAtom = atom({
  key: "biddingOnAuctionState",
  default: null,
});

export const auctionsAtom = atom({
  key: "auctionsState",
  default: [],
});
export const amountBidAtom = atom({
  key: "auctionAtomState",
  default: null,
});

export const auctionsFetchSelector = selectorFamily({
  key: "auctionsFetchState",
  get:
    (demo) =>
    async ({ get }) => {
      const token = get(authAtom);
      if (token) {
        try {
          const auctions = await axios.get("/auction?status=OPEN", {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
          return auctions.data;
        } catch (error) {
          throw error.response.data.message;
        }
      }
    },
});

export const placeBidSelector = selector({
  key: "placeBidState",
  get: async ({ get }) => {
    const amount = get(amountBidAtom);
    console.log(amount);
    if (amount) {
      const token = get(authAtom);
      const auction = get(biddingOnAuctionAtom);
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
        throw error.response.data.message;
      }
    } else {
      return false;
    }
  },
});
