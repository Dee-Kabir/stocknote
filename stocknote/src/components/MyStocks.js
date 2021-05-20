import { Fragment, useEffect, useState } from 'react';

import { List } from 'semantic-ui-react'
import { getStockList } from '../actions/stock';
import MainFooter from '../Navigations/MainFooter';
import MainHeader from '../Navigations/MainHeader';
import StockCard from './StockCard';

const MyStocks = () => {
    const [mystocklist,setMystocklist] = useState([]);
    useEffect(()=>{
        loadStocklist()
    },[])
    const loadStocklist = async() => {
        let token = JSON.parse(window.localStorage.getItem('auth')).token
        getStockList(token).then(data => {
            if(data.error){
                console.log(data.error)
            }else{
                setMystocklist(data.stocks)
            }
        })
    }
    return(
        <Fragment>
        <MainHeader/>
        <List divided ordered relaxed style={{marginLeft:'4px'}}>
        <List.Header>My Stocks</List.Header>
    {mystocklist.map((stock,i) => (
        
        <StockCard stock= {stock} key={i} />
        
    ))}
  </List>
  <div style={{position: mystocklist.length < 20 ? 'absolute' : '', bottom: '0px',width: '100%'}}>
  <MainFooter />
  </div>
        </Fragment>
    )
}
export default MyStocks;