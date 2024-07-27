import React, { useEffect, useState } from 'react'
import Header from '../components/Common/Headers/Header'
import TabsComponents from '../components/Dashboard/Tabs/TabsComponents'
import Search from '../components/Dashboard/search/Search';
import PaginationControll from '../components/Dashboard/Pagination/PaginationControll';
import Loader from '../components/Common/Loader/Loader';
import BackToTop from '../components/Common/BackToTop/BackToTop';
import { get100Coins } from '../functions/get100Coins';

const DashboardPage = () => {
  const [coins,setCoins]=useState([]);
  const [search,setSearch]=useState("");
  const [page, setPage] = useState(1);
  const [paginatedcoins,setPaginatedCoins]=useState([]);
  const [isLoading,setIsLoading]=useState(true);

  const handlePageChange = (event, value) => {
    setPage(value);
    var initialCount=(value-1)*10;
    setPaginatedCoins(coins.slice(initialCount, initialCount+10));
  };
  
  const onSearchChange=(e)=>{
     setSearch(e.target.value);
  }


  
  useEffect(()=>{
    getData()
  },[]);

  const getData=async()=>{
      const mycoins=await get100Coins();
      if(mycoins){
        setCoins(mycoins);
        setPaginatedCoins(mycoins.slice(0, 10));
        setIsLoading(false);
      }
  
  }

  var filteredCoins =coins.filter((coin)=>
    { return(
    coin.name.toLowerCase().includes(search.trim().toLowerCase()) ||
    coin.symbol.toLowerCase().includes(search.trim().toLowerCase())
    )
  });
  return (
    <>
    <Header/>
    <BackToTop/>
    {isLoading ? (
      <Loader/>
      ):(
        <div>
        <Search search={search} onSearchChange={onSearchChange}/>
        <TabsComponents coins={search? filteredCoins: paginatedcoins}
        />
        {!search &&(
          <PaginationControll page={page} handlePageChange={handlePageChange}/>
        )}
      </div>
      )}
    </>
  );
}

export default DashboardPage
