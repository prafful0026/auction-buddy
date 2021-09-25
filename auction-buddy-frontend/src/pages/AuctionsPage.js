import React, { useEffect } from "react";
import Auction from "../components/Auction";
import BidModal from "../components/BidModal";
import {
  auctionsAtom,
  fetchAuctionsErrorAtom,
  fetchAuctionsLoadingAtom,
  biddingOnAuctionAtom,
} from "../RecoilStore/AuctionStore";
import { Fab, makeStyles } from "@material-ui/core";
import AddIcon from "@material-ui/icons/Add";
import { useRecoilState, useRecoilValue } from "recoil";
import { useHistory } from "react-router";
import { useAuth0 } from "@auth0/auth0-react";
import LoadingSpinner from "../components/LoadingSpinner";
import Error from "../components/Error";
const containerWidth = 1000;
const cardPadding = 14;
const cardWidth = containerWidth / 2 - cardPadding * 2;

const useStyles = makeStyles({
  auctionsContainer: {
    display: "flex",
    flexWrap: "wrap",
    maxWidth: containerWidth,
    margin: "auto",
    "@media (max-width: 900px)": {
      alignItems: "center",
      justifyContent: "center",
    },
  },
  auctionCard: {
    flexBasis: cardWidth,
    flexShrink: 0,
    padding: cardPadding,
  },
  fabContainer: {
    position: "fixed",
    bottom: 20,
    right: 20,
  },
  createAuctionButton: {
    background:
      "linear-gradient(90deg, rgba(190,52,32,1) 0%, rgba(231,75,77,1) 48%, rgba(231,148,74,1) 100%)",
  },
});

const AuctionsPage = () => {
  const auctions = useRecoilValue(auctionsAtom);
  const loading = useRecoilValue(fetchAuctionsLoadingAtom);
  const error = useRecoilValue(fetchAuctionsErrorAtom);
  const { user } = useAuth0();
  const email = user.name;
  const classes = useStyles();
  const history = useHistory();
  const [biddingOnAuction, setBiddingOnAuction] =
    useRecoilState(biddingOnAuctionAtom);

  useEffect(() => {});
  const geeBidState = (auction) => {
    let bidState = "CAN_BID";

    if (auction.seller === email) {
      bidState = "OWN_AUCTION";
    }

    if (auction.highestBid.bidder === email) {
      bidState = "HIGHEST_BIDDER";
    }

    return bidState;
  };

  const RenderAuctions = () => {
    return (
      <>
        {auctions.length > 0 ? (
          auctions.map((auction) => {
            const bidState = geeBidState(auction);
            return (
              <div key={auction.id} className={classes.auctionCard}>
                <Auction
                  auction={auction}
                  bidState={bidState}
                  onBid={() => setBiddingOnAuction(auction)}
                />
              </div>
            );
          })
        ) : (
          <div style={{ textAlign: "center", width: "100%" }}>
            <h4>No fetchAuctions available. Create one?</h4>
          </div>
        )}
      </>
    );
  };

  return (
    <>
      <LoadingSpinner display={loading} />
      <Error isError={error} errorMessage={error} />
      <div className={classes.auctionsContainer}>
        {biddingOnAuction && <BidModal />}
        <RenderAuctions />
        <div className={classes.fabContainer}>
          <Fab
            color='primary'
            aria-label='add'
            className={classes.createAuctionButton}
            onClick={() => history.push("/create")}
          >
            <AddIcon />
          </Fab>
        </div>
      </div>
    </>
  );
};

export default AuctionsPage;
