import axios from "./axiosUtil";
export const fetchAuctions = async (
  setError,
  setLoading,
  token,
  setAuctions
) => {
  let auctions = [];
  if (token) {
    try {
      setLoading(true);
      setError(null);
      const newAuctions = await axios.get("/auction?status=OPEN", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setAuctions(newAuctions.data);
      setLoading(false);
      return;
    } catch (error) {
      console.log(error);
      setLoading(false);
      setError(error.response.data.message);
    }
  }
  setAuctions(auctions);
};
