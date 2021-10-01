import React from "react";
import "../App";
// got the data and other props
function Footer() {
  return (
    <footer>
      <div className="footerTitle">
        <h2>Life is short</h2>
      </div>
      <div className="mainFooterMessage">
        <div>
          <h3>Take the trip</h3>
          <p>
            Life will get better as you see new places. It will be meaningful as
            you collect the moment. I collect my memories both by traveling and
            writing.
          </p>
        </div>
        <div>
          <h3>Buy the shoes</h3>
          <p>
            There is no better feeling in life than doing the things that make
            us happy. It would be buying a shoe, breaking the atom into pieces.
            It does not matter
          </p>
        </div>
        <div>
          <h3>Eat the cake</h3>
          <p>
            When we see new places, we definitely get to know new tastes. Every
            place I go, I definitely eat a local dish. This can sometimes turn
            out badly, but I am happy in this situation too. I am in love with
            Turkish cuisine and French cuisine
          </p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
