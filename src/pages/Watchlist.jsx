import React, { useEffect, useState } from "react";
import { get100Coins } from "../functions/get100Coins";
import Header from "../components/Common/Headers/Header";
import TabsComponents from "../components/Dashboard/Tabs/TabsComponents";
import Button from "../components/Common/Buttons/Button";

function Watchlist() {
  const watchlist = JSON.parse(localStorage.getItem("watchlist"));
  const [coins, setCoins] = useState([]);

  useEffect(() => {
    if (watchlist) {
      getData();
    }
  }, []);

  const getData = async () => {
    const allCoins = await get100Coins();
    if (allCoins) {
      setCoins(allCoins.filter((coin) => watchlist.includes(coin.id)));
    }
  };

  return (
    <div>
      <Header />
      {watchlist?.length > 0 ? (
        <TabsComponents coins={coins} />
      ) : (
        <div>
          <h1 style={{ textAlign: "center" }}>
            Sorry, No Items In The Watchlist.
          </h1>
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              margin: "2rem",
            }}
          >
            <a href="/dashboard">
              <Button text="Dashboard" onClick={()=>"btn-clicked"}/>
            </a>
          </div>
        </div>
      )}
    </div>
  );
}

export default Watchlist;
