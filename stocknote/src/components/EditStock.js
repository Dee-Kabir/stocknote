import { Fragment, useEffect, useState } from "react";
import { Header, Loader } from "semantic-ui-react";
import MainFooter from "../Navigations/MainFooter";
import MainHeader from "../Navigations/MainHeader";
import NewStockForm from "./NewStockForm";
import {API} from '../Config'

import { update } from "../actions/stock";
import ErrorPage from "./ErrorPage";

const EditStock = (props) => {
  
  const [value, setValue] = useState({
    name: "",
    cmp: "",
    resistanceLevels: "",
    supportLevels: "",
    resistance: "",
    support: "",
    error: '',
    formData: new FormData()
  });
  const [preview, setPreview] = useState({
    weeklyPreview: "https://via.placeholder.com/300.png/09f/fff",
    dailyPreview: "https://via.placeholder.com/300.png/09f/fff",
  });
  const { weeklyPreview, dailyPreview } = preview;
  const [bodyWeekly, setBodyWeekly] = useState('');
  const [bodyDaily, setBodyDaily] = useState('');
  const [checkedC, setCheckedC] = useState([]);
  const [checkedR, setCheckedR] = useState([]);

  const {
    name,
    cmp,
    resistanceLevels,
    supportLevels,
    resistance,
    support,
    formData,
    error
  } = value;
  useEffect(()=>{
    const ac =new AbortController()
      let data = props.location.state
      loadstock(data);
      return () => ac.abort()
  },[window.location.pathname])
  const loadstock = async(data) => {
      if(data){
          console.log(props.location.state)
          let {name,cmp,resistanceLevels,supportLevels,weekly,daily,weeklyShot,dailyShot} = data;
          setValue({...value,name,cmp,resistanceLevels,supportLevels});
          setBodyDaily(daily)
          setBodyWeekly(weekly)
          alreadypresentC(data.supportLevels);
          alreadypresentR(data.resistanceLevels);
          if(dailyShot){
            setPreview({...preview,dailyPreview: `${API}/photod/${data._id}`});
        }
          if(weeklyShot){
              setPreview((preview) => ({...preview,weeklyPreview: `${API}/photow/${data._id}`}));
          }
          
      }else{
          setValue({...value,error: "Go back and Try Again Later"})
      }
  }
  const alreadypresentC = (blogcategories) => {
    let apc = [];
    blogcategories.map((cat, i) => (
      apc.push(cat)
    ));
    setCheckedC(apc);
  };
  const alreadypresentR = (blogcategories) => {
    let apc = [];
    blogcategories.map((cat, i) => 
      apc.push(cat)
    );
    setCheckedR(apc);
  };
  const handleToggleC = (c) => () => {
  
    const clickedCategory = checkedC.indexOf(c);
    const all = [...checkedC];
    if (clickedCategory === -1) {
      all.push(c);
    } else {
      all.splice(clickedCategory, 1);
    }
    setCheckedC(all);
    formData.set("supportLevels", all);
  };
  const handleToggleR = (c) => () => {
  
    const clickedCategory = checkedR.indexOf(c);
    const all = [...checkedR];
    if (clickedCategory === -1) {
      all.push(c);
    } else {
      all.splice(clickedCategory, 1);
    }
    setCheckedR(all);
    formData.set("resistanceLevels", all);
  };
  const setLevel = (e) => {
    setValue({ ...value, [e.target.name]: e.target.value });
  };
  const handleBody = (time) => (e) => {
    if (time === "daily") {
      setBodyDaily(e);
    } else {
      setBodyWeekly(e);
    }
    formData.set(time, e);
    
  };
  const presentinc = (id) => {
    if (checkedC.indexOf(id) !== -1) {
      return true;
    } else {
      return false;
    }
  };
  const presentinr = (id) => {
    if (checkedR.indexOf(id) !== -1) {
      return true;
    } else {
      return false;
    }
  };
  const handleChange = (e) => {
    formData.set([e.target.name], e.target.value);
    setValue({ ...value, [e.target.name]: e.target.value });
  };
  const showSupports = () =>
    supportLevels &&
    supportLevels.map((s, i) => (
      s ? <li key={i} style={{ listStyle: "none" }}>
        <input type="checkbox" onChange={handleToggleC(s)}
        checked={presentinc(s)}/>
        <label>{s}</label>
      </li> : ''
    ));
  const showResistances = () =>
    resistanceLevels &&
    resistanceLevels.map((r, i) => (
      <li key={i} style={{ listStyle: "none" }}>
        <input type="checkbox" onChange={handleToggleR(r)}
        checked={presentinr(r)}/>
        <label>{r}</label>
      </li>
    ));
  const handleLevels = (e) => {
    if (e.key === "Enter") {
      let supportlist = [...supportLevels];
      let resistancelist = [...resistanceLevels];
      if (e.target.name === "support" && support) {
        supportlist.push(support);
        setValue({ ...value, supportLevels: supportlist, support: "" });
        formData.set("supportLevels", supportlist);
      } else if (resistance) {
        resistancelist.push(resistance);
        setValue({
          ...value,
          resistanceLevels: resistancelist,
          resistance: "",
        });
        formData.set("resistanceLevels", resistancelist);
      }
    }
  };
  const handlePreview = (e) => {
    let img = e.target.files[0];
    if (img)
      if (e.target.name === "weeklyShot") {
        setValue({ ...value, weeklyShot: img });

        setPreview({ ...preview, weeklyPreview: URL.createObjectURL(img) });
      } else if (e.target.name === "dailyShot") {
        setValue({ ...value, dailyShot: img });
        setPreview({ ...preview, dailyPreview: URL.createObjectURL(img) });
      }
    formData.set([e.target.name], e.target.files[0]);
  };
  const handleClick = (e) => {
    e.preventDefault();
    if (name && cmp) {
      let auth = JSON.parse(window.localStorage.getItem("auth"));
      formData.set("postedBy",auth.user._id)
      update(formData, auth.token,props.match.params.stockId).then((data) => {
        if (data.error) {
          console.log(data.error);
        } else {
          
          window.location.href = "/my-stocks";
        }
      });
    } else {
      setValue({ ...value, error: "Name and CMP are required" });
    }
  };
  
  return (name ?
    <Fragment>
      <MainHeader />
      <Header style={{textAlign: 'center'}}>{name.toUpperCase()}</Header>
      <NewStockForm
      show={true}
      handleToggle = {handleToggleC}
        setLevel={setLevel}
        showResistances={showResistances}
        showSupports={showSupports}
        cmp={cmp}
        support={support}
        resistance={resistance}
        bodyWeekly={bodyWeekly}
        bodyDaily={bodyDaily}
        weeklyPreview={weeklyPreview}
        dailyPreview={dailyPreview}
        handleChange={handleChange}
        handleClick={handleClick}
        handleBody={handleBody}
        handlePreview={handlePreview}
        handleLevels={handleLevels}
      />
      <MainFooter />
    </Fragment>:
    <ErrorPage />
  );
};
export default EditStock;
