import { selectorFamily } from "recoil";
import { authAtom } from "./AuthStore";
import { API_BASE_URL } from "../utils/constants";
import Axios from "axios";
const axios = Axios.create({
  baseURL: API_BASE_URL,
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
              Authorization: `Bearer ${token}`
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
