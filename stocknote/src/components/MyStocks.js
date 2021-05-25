import { Fragment, useEffect, useState } from "react";

import { List } from "semantic-ui-react";
import { getStockList,removestock } from "../actions/stock";
import MainFooter from "../Navigations/MainFooter";
import MainHeader from "../Navigations/MainHeader";
import ServiceNotAvailabel from "./errorpage/ServiceNotAvailable";
import StockCard from "./StockCard";

const MyStocks = () => {
  const [mystocklist, setMystocklist] = useState([]);
<<<<<<< HEAD
=======
  const [value, setValue] = useState({
    error: "",
    message: "",
  });
  const { error } = value;
>>>>>>> new
  useEffect(() => {
    loadStocklist();
  }, []);
  const loadStocklist = async () => {
    let token = JSON.parse(window.localStorage.getItem("auth")).token;
    getStockList(token).then((data) => {
      try {
        if (data.error) {
          setValue({ ...value, error: data.error });
        } else {
          setMystocklist(data.stocks);
          setValue({ ...value, message: data.message, error: "" });
        }
      } catch {
        setValue({ ...value.error, error: "Error while connecting to Server" });
      }
    });
  };
<<<<<<< HEAD
  const handleDelete = (id) => {
    let token = JSON.parse(window.localStorage.getItem("auth")).token;
    removestock(id, token).then((data) => {
      console.log(data);
      if (data.error) {
        setValue({ ...value, error: data.error });
      } else {
        setMystocklist(data.stocks);
=======

  const handleDelete = (id) => {
    let token = JSON.parse(window.localStorage.getItem("auth")).token;
    removestock(id, token).then((data) => {
      try {
        if (data.error) {
          setValue({ ...value, error: data.error });
        } else {
          setValue({ ...value, message: data.message, error: "" });
          setMystocklist(data.stocks);
        }
      } catch {
        setValue({ ...value.error, error: "Error while connecting to Server" });
>>>>>>> new
      }
    });
  };
  return (
    <Fragment>
      <MainHeader />
      {!error ? (
        <List divided ordered relaxed style={{ marginLeft: "4px" }}>
          <List.Header>My Stocks</List.Header>
          {mystocklist.map((stock, i) => (
            <StockCard stock={stock} handleDelete={handleDelete} key={i} />
          ))}
        </List>
      ) : (
        <ServiceNotAvailabel error={error} />
      )}
      <div
        style={{
          position: mystocklist.length < 20 ? "absolute" : "",
          bottom: "0px",
          width: "100%",
        }}
      >
        <MainFooter />
      </div>
    </Fragment>
  );
};
export default MyStocks;
