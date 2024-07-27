import React, { useEffect, useState } from 'react'
import Coininfo from '../components/Coins/Coininfo/Coininfo';
import LineChart from '../components/Coins/LineChart/LineChart';
import PriceType from '../components/Coins/PriceType/PriceType';
import Header from '../components/Common/Headers/Header'
import Loader from '../components/Common/Loader/Loader';
import SelectCoin from '../components/Compare/SelectCoin/SelectCoin'
import Lists from '../components/Dashboard/List/Lists';
import { get100Coins } from '../functions/get100Coins';
import { getCoinData } from '../functions/getCoinData';
import { getCoinPrices } from '../functions/getCoinPrices';
import { settingChartData } from '../functions/settingChartData';
import { CoinObject } from '../functions/CoinObject';

const ComparePage = () => {   
    const [allCoins,setAllCoins]=useState([]);
    const [isLoading, setLoading] = useState(false);

    const [crypto1, setCrypto1] = useState("bitcoin");
    const [crypto2, setCrypto2] = useState("ethereum");

    const [crypto1Data,setCrypto1Data] = useState({});
    const [crypto2Data,setCrypto2Data] = useState({});

    const [days,setdays]=useState(30);
    const [priceType,setPriceType] = useState("prices");
    const [chartData,setChartData]=useState({labels:[],datasets:[],});

    
    useEffect(()=>{
       getData();
    },[])
    
    const getData = async () => {
      setLoading(true);
      try {
        const coins = await get100Coins();
        if (coins) {
          setAllCoins(coins);
          const coinData1 = await getCoinData(crypto1);
          const coinData2 = await getCoinData(crypto2);
    
          if (coinData1 && coinData2) {
            CoinObject(setCrypto1Data, coinData1);
            CoinObject(setCrypto2Data, coinData2);
    
            const prices1 = await getCoinPrices(crypto1, days, priceType);
            const prices2 = await getCoinPrices(crypto2, days, priceType);
            settingChartData(setChartData, prices1, prices2);
          } else {
            console.error('Error: Coin data is missing.');
          }
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };
    
          


    const handleCoinChange = async (e, isCoin2) => {
      setLoading(true);
      try {
        const newCoinId = e.target.value;
        if (isCoin2) {
          setCrypto2(newCoinId);
          const coinData2 = await getCoinData(newCoinId);
          if (coinData2) {
            CoinObject(setCrypto2Data, coinData2);
          }
        } else {
          setCrypto1(newCoinId);
          const coinData1 = await getCoinData(newCoinId);
          if (coinData1) {
            CoinObject(setCrypto1Data, coinData1);
          }
        }
        const prices1 = await getCoinPrices(crypto1, days, priceType);
        const prices2 = await getCoinPrices(crypto2, days, priceType);
        settingChartData(setChartData, prices1, prices2);
      } catch (error) {
        console.error('Error handling coin change:', error);
      } finally {
        setLoading(false);
      }
    };
    
    
      
    const handleDaysChange = async(event)=>{
      const newDays=event.target.value;
      setLoading(true);
      setdays(newDays);
      const prices1 = await getCoinPrices(crypto1, newDays,priceType);
      const prices2 = await getCoinPrices(crypto2, newDays,priceType);
      settingChartData(setChartData,prices1,prices2);
      setLoading(false);
  };
      const handlePriceTypeChange= async (event)=>{
        const newPriceType=event.target.value;
        setLoading(true);
        setPriceType(newPriceType);
        const prices1 = await getCoinPrices(crypto1, days,newPriceType);
        const prices2 = await getCoinPrices(crypto2, days,newPriceType);
        settingChartData(setChartData,prices1,prices2);
        setLoading(false);
        };

  return (
    <div>
      <Header />
      {isLoading || !crypto1Data?.id || !crypto2Data?.id ?(
        <Loader/>
      ):(
      <>
      <div className="coins-days-flex">
      {allCoins.length > 0 && (
        <SelectCoin 
          allCoins={allCoins}
          handleCoinChange={handleCoinChange}
          crypto1={crypto1}
          crypto2={crypto2}
          handleDaysChange={handleDaysChange}
        />
      )}
      </div>
      <div className="grey-wrapper ">
        <Lists coin={crypto1Data} />
      </div>
      <div className="grey-wrapper ">
            <Lists coin={crypto2Data} />
      </div>

      <div className="grey-wrapper ">
      <PriceType priceType={priceType} handlePriceTypeChange={handlePriceTypeChange} />
      <LineChart chartData={chartData} priceType={priceType} multiAxis={true}/>
      </div>

      <Coininfo heading={crypto1Data.name} key={crypto1Data.id} desc={crypto1Data.desc}/>
      <Coininfo heading={crypto2Data.name} key={crypto2Data.id} desc={crypto2Data.desc}/>
      </>
      )}
    </div>
  );
}

export default ComparePage
