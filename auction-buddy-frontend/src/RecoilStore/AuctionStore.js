import { selectorFamily, atom, selector } from "recoil";
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
export const amountBidAtom = atom({
  key: "auctionAtomState",
  default: null,
});
export const newAuction = atom({
  key: "auctionAtomState",
  default: null,
});
export const fetchAuctionsLoadingAtom=atom({
  key:"fetchAuctionsLoadingState",
  default:false
})
export const fetchAuctionsErrorAtom=atom({
  key:"fetchAuctionsErrorState",
  default:null
})
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
