import { Fragment } from "react"

import MainHeader from "./Navigations/MainHeader"
import SearchForm from "./components/SearchForm";
import MainFooter from "./Navigations/MainFooter";
import { Icon } from "semantic-ui-react";

const Home = () => {
  
  return (
    <Fragment>
    <MainHeader />
    <div className="home_page" >
    <div className="home_box">
    <div className="home_heading">Stocknote...<Icon name="pencil" /> </div>
    <SearchForm size={{width: '50%'}}/>
    </div>
    </div>
    <MainFooter />
    </Fragment>
  )
}
export default Home