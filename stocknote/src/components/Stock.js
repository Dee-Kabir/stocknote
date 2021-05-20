import { Image } from "antd";
import Avatar from "antd/lib/avatar/avatar";
import { Content } from "antd/lib/layout/layout";
import { Fragment, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Button, Grid, GridColumn, Header, Icon, List, Loader } from "semantic-ui-react";
import { getStock } from "../actions/stock";
import MainFooter from "../Navigations/MainFooter";
import MainHeader from "../Navigations/MainHeader";
import renderHTML from 'react-render-html'
import {API} from '../Config'
const Stock = (props) => {
  const [value, setValue] = useState({
    stock: '',
    error: ''
  });
  const { stock, error } = value;
  useEffect(() => {
    const ac = new AbortController();
    loadStock(props.match.params.stockId);
    return () => ac.abort()
  }, [props.match.params.stockId]);

  const loadStock = async (id) => {

    let token = JSON.parse(window.localStorage.getItem('auth')).token
    getStock(id,token).then(data => {
      if(data.error){
        setValue({...value, error: data.error})
      }else{
        setValue({...value,stock: data})
      }
    })
  };

  return stock ? (
    <Fragment>
      <MainHeader />
      <div style={{ marginLeft: "16px" }}>
        <Header style={{ display: "flex", alignItems: "middle" }}>
          <Avatar size="large">{stock.name[0].toUpperCase()}</Avatar>
          <Header as="h1" style={{ margin: "0", marginLeft: "8px" }}>
            {stock.name.toUpperCase()}
          </Header>
        </Header>
        <Header.Content>CMP: {stock.cmp}</Header.Content>
        <div
          style={{
            display: "flex",
            marginTop: "8px",
            justifyContent: "space-around",
          }}
        >
          <div>
            <h3 style={{ fontWeight: "600" }}>Support</h3>
            <ul
              style={{
                padding: "0",
                maxHeight: "92px",
                overflowY: "scroll",
                width: "100px",
              }}
            >
              {stock.supportLevels && stock.supportLevels.map((sup, i) => (
                <List.Item key={i}>{sup}</List.Item>
              ))}
            </ul>
          </div>
          <div>
            <h3 style={{ fontWeight: "600" }}>Resistance</h3>
            <ul
              style={{
                padding: "0",
                maxHeight: "92px",
                overflowY: "scroll",
                width: "100px",
              }}
            >
              {stock.resistanceLevels && stock.resistanceLevels.map((sup, i) => (
                <List.Item key={i}>{sup}</List.Item>
              ))}
            </ul>
          </div>
        </div>
        <Grid>
        <Grid.Row>
            <GridColumn width='10'>
            <h3 style={{fontWeight: '600'}}>Weekly Analysis</h3>
            <Content id="stock_content" style={{width: '100%'}}>{renderHTML(stock.weekly)}</Content>
            </GridColumn>
            <GridColumn width='6'>
            <Image src={stock.weeklyShot ? `${API}/photow/${stock._id}` :"https://via.placeholder.com/300.png/09f/fff"} />
            </GridColumn>
        </Grid.Row>
        <Grid.Row>
            <GridColumn width='10'>
            <h3 style={{fontWeight: '600'}}>Daily Analysis</h3>
            <Content>{renderHTML(stock.daily)}</Content>
            </GridColumn>
            <GridColumn width='6'>
            <Image src={stock.dailyShot ? `${API}/photod/${stock._id}` : "https://via.placeholder.com/300.png/09f/fff"} />
            </GridColumn>  
        </Grid.Row>
        </Grid>

        <Button as={Link}  to={{pathname : `/edit/${stock._id}`,state: stock}} color="vk"><Icon name="edit" />Edit</Button>
      </div>
      <MainFooter />
    </Fragment>
  ) : (
    <Loader size="huge" />
  );
};
export default Stock;
