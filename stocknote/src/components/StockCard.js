import { Link } from 'react-router-dom';
import Avatar from 'antd/lib/avatar/avatar';
import { List } from 'semantic-ui-react'
import moment from 'moment';

const StockCard = ({stock}) => {

    return (stock ? <List.Item as={Link} to={`/stock/${stock._id}`} >
    
    <List.Icon><Avatar>{stock.name[0].toUpperCase()}</Avatar></List.Icon>
    <List.Content>
    <List.Header>{stock.name.toUpperCase()}</List.Header>
    <List.Description>CMP: {stock.cmp}</List.Description>
    <List.Description>Updated: {moment(stock.updatedAt).fromNow()}</List.Description>
    </List.Content>
    </List.Item>: '')
}
export default StockCard;