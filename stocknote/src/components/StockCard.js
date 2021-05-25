import { Link } from "react-router-dom";
import Avatar from "antd/lib/avatar/avatar";
import { List, Button } from "semantic-ui-react";
import moment from "moment";
import { removestock } from "../actions/stock";
import { useState } from "react";

const StockCard = ({ stock, handleDelete }) => {
  return stock ? (
    <List.Item>
      <List.Icon>
        <Avatar as={Link} to={`/stock/${stock._id}`}>
          {stock.name[0].toUpperCase()}
        </Avatar>
      </List.Icon>
      <List.Content>
        <List.Header as={Link} to={`/stock/${stock._id}`}>
          {stock.name.toUpperCase()}
        </List.Header>
        <List.Description>CMP: {stock.cmp}</List.Description>
        <List.Description>
          Updated: {moment(stock.updatedAt).fromNow()}
        </List.Description>
      </List.Content>
      <List.Content floated="right">
        <Button onClick={() => handleDelete(stock._id)}>Delete</Button>
      </List.Content>
    </List.Item>
  ) : (
    ""
  );
};
export default StockCard;
