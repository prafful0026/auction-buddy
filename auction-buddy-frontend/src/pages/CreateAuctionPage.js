import React, { useState, useEffect } from "react";
import {
  Container,
  FormControl,
  makeStyles,
  TextField,
} from "@material-ui/core";
import { useHistory } from "react-router-dom";
import LoadingButton from "../components/LoadingButton";
import PictureUpload from "../components/PictureUpload";
import { createAuctionSelector } from "../RecoilStore/AuctionStore";
import { useRecoilValueLoadable, useSetRecoilState } from "recoil";
import { auctionsAtom } from "../RecoilStore/AuctionStore";
const useStyles = makeStyles((theme) => ({
  form: {
    maxWidth: 400,
  },
  pictureUpload: {
    marginTop: 20,
    marginBottom: 20,
  },
}));

const CreateAuctionPage = () => {
  const history = useHistory();
  const [title, setTitle] = useState("");
  const [base64, setBase64] = useState(null);
  const setAuctions = useSetRecoilState(auctionsAtom);
  const [dataToBeSend, setDataToBeSend] = useState(null);
  const classes = useStyles();
  const createdAuction = useRecoilValueLoadable(
    createAuctionSelector(dataToBeSend)
  );
  const createAuction = (e) => {
    e.preventDefault();
    setDataToBeSend({ title, pictureBase64: base64 });
  };
  useEffect(() => {
    if (createdAuction.state === "hasValue" && createdAuction.contents !== -1) {
      setAuctions((auctions) => [createdAuction.contents, ...auctions]);
      history.push("/");
    }
  }, [setAuctions, createdAuction.state, createdAuction.contents, history]);

  return (
    <Container width={200} fixed>
      <h1>Create an Auction</h1>
      <form
        className={classes.form}
        noValidate
        autoComplete='off'
        onSubmit={createAuction}
      >
        <FormControl fullWidth>
          <TextField
            label='Auction Title'
            id='standard-adornment-amount'
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Example: Lemonade from the '60s"
            type='string'
            variant='outlined'
          />
        </FormControl>
        <div className={classes.pictureUpload}>
          <PictureUpload onPictureSelected={(base64) => setBase64(base64)} />
        </div>
        <div>
          <LoadingButton
            variant='outlined'
            type='submit'
            loading={createdAuction.state === "loading"}
            title='Create Auction'
            disabled={!title?.length || !base64}
          />
        </div>
      </form>
    </Container>
  );
};

export default CreateAuctionPage;
