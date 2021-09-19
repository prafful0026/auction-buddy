import { selectorFamily } from "recoil";
import { authAtom } from "./AuthStore";
import Axios from "axios";
const axios = Axios.create({
  baseURL: "https://qwveq8ogu8.execute-api.eu-west-1.amazonaws.com/dev",
});
export const auctionSelector = selectorFamily({
  key: "auctionState",
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
          console.log(auctions.data);
          return auctions.data;
        } catch (error) {
          throw error.response.data.message;
        }
      }
    },
});
