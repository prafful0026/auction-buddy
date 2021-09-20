import React, { useState } from "react";
import { useRecoilValueLoadable } from "recoil";
import { auctionSelector } from "../RecoilStore/AuctionStore";
const Auctions = () => {
  const [demo, setDemp] = useState(0);
  const auctions = useRecoilValueLoadable(auctionSelector(demo));
  return (
    <div>
      <button onClick={() => setDemp((state) => state + 1)}>dwd</button>
      {demo}
      {auctions.state === "hasValue" &&
        auctions.contents.map((auction,i) => <div key={i}>{auction.title}</div>)}
      {auctions.state === "loading" && <>loading</>}
      {auctions.state === "hasError" && <>{auctions.contents}</>}
    </div>
  );
};

export default Auctions;
