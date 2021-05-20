import { BrowserRouter, Route, Switch } from "react-router-dom";
import Login from "./auth/Login";
import 'semantic-ui-css/semantic.min.css'
import Register from "./auth/Register";
import Home from "./Home";
import NewNotes from "./components/NewNotes";
import MyStocks from "./components/MyStocks";
import Stock from "./components/Stock";
import EditStock from "./components/EditStock";
import PrivateRoute from "./components/PrivateRoute";


const App = () => {
  return (
    <BrowserRouter>

    <Switch>
    <PrivateRoute path="/" exact component={Home} />
    <Route path="/login" exact component={Login} />
    <Route path="/register" exact component={Register} />
    <PrivateRoute path="/new" exact component={NewNotes} />
    <PrivateRoute path="/my-stocks" exact component={MyStocks} />
    <PrivateRoute path= "/stock/:stockId" exact component = {Stock} />
    <PrivateRoute path = "/edit/:stockId" exact component = {EditStock} />
    </Switch>
    </BrowserRouter>
  );
}

export default App;
