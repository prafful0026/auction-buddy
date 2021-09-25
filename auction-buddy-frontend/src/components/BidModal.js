import React, { useState, useEffect } from "react";
import {
  Modal,
  makeStyles,
  Fade,
  FormControl,
  InputLabel,
  Input,
  InputAdornment,
} from "@material-ui/core";
import LoadingButton from "./LoadingButton";
import {
  biddingOnAuctionAtom,
  placeBidSelector,
  auctionsAtom,
} from "../RecoilStore/AuctionStore";
import {
  useRecoilState,
  useSetRecoilState,
  useRecoilValueLoadable,
} from "recoil";
import Error from "./Error";
const useStyles = makeStyles((theme) => ({
  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    outline: 0,
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(2, 4, 3),
    outline: 0,
    borderRadius: 10,
  },
}));

const BidModal = () => {
  const classes = useStyles();
  const [auction, setAuction] = useRecoilState(biddingOnAuctionAtom);

  const [amt, setAmt] = useState(0);
  const [amount, setAmount] = useState(null);
  const placeBid = useRecoilValueLoadable(placeBidSelector(amount));
  const setAuctions = useSetRecoilState(auctionsAtom);
  useEffect(() => {
    if (placeBid.state === "hasValue" && placeBid.contents !== -1) {
      setAuctions((auctions) => {
        return auctions.map((singleAuction) =>
          singleAuction.id === placeBid.contents.id
            ? placeBid.contents
            : singleAuction
        );
      });
      setAuction(null);
    }
  }, [placeBid.state, placeBid.contents, setAuctions, setAuction]);
  const placeBidHandler = () => {
    setAmount(amt);
  };

  return (
    <Modal
      aria-labelledby='transition-modal-title'
      aria-describedby='transition-modal-description'
      className={classes.modal}
      open={!!auction}
      onClose={() => setAuction(null)}
      closeAfterTransition
    >
      <Fade in={!!auction}>
        <div className={classes.paper}>
          <Error
            isError={placeBid.state === "hasError"}
            errorMessage={placeBid.contents}
          />
          <h2>Bid on "{auction.title}"</h2>
          <form noValidate autoComplete='off'>
            <FormControl fullWidth className={classes.margin}>
              <InputLabel htmlFor='standard-adornment-amount'>
                Bid Amount
              </InputLabel>
              <Input
                id='standard-adornment-amount'
                value={amt}
                onChange={(e) => setAmt(e.target.value)}
                type='number'
                startAdornment={
                  <InputAdornment position='start'>$</InputAdornment>
                }
              />
            </FormControl>
            <br />
            <br />
            <div>
              <LoadingButton
                style={{ float: "right" }}
                onClick={placeBidHandler}
                title='Place Bid'
                loading={placeBid.state === "loading"}
              />
            </div>
          </form>
        </div>
      </Fade>
    </Modal>
  );
};

export default BidModal;
