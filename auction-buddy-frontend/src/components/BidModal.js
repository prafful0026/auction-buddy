import React, { useState } from "react";
import {
  Modal,
  makeStyles,
  Fade,
  FormControl,
  InputLabel,
  Input,
  InputAdornment,
  Button,
} from "@material-ui/core";
import { biddingOnAuctionAtom } from "../RecoilStore/AuctionStore";
import { amountBidAtom } from "../RecoilStore/AuctionStore";
import { useRecoilState, useSetRecoilState} from "recoil";
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
  const setAmount = useSetRecoilState(amountBidAtom);
  
  if (!auction) {
    return null;
  }

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
          <h2>Bid on "{auction.title}"</h2>
          <form noValidate autoComplete='off'>
            <FormControl fullWidth className={classes.margin}>
              <InputLabel htmlFor='standard-adornment-amount'>
                Bid Amount
              </InputLabel>
              <Input
                id='standard-adornment-amount'
                value={amt}
                // value='1'
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
              <Button style={{ float: "right" }} onClick={() => setAmount(amt)}>
                Place Bid
              </Button>
            </div>
          </form>
        </div>
      </Fade>
    </Modal>
  );
};

export default BidModal;
