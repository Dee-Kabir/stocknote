import { useState } from "react";
import { Fragment } from "react";

import MainHeader from "../Navigations/MainHeader";
import "react-quill/dist/quill.snow.css";


import MainFooter from "../Navigations/MainFooter";
import NewStockForm from './NewStockForm'
import { newStock } from "../actions/stock";
const NewNotes = () => {
  const [value, setValue] = useState({
    name: "",
    cmp: "",
    supportLevels: [],
    resistanceLevels: [],
    support: "",
    resistance: "",
    formData: new FormData(),
    show: false,
    error: '',
    loading: false
  });
 
  const [preview, setPreview] = useState({
    weeklyPreview: "https://via.placeholder.com/300.png/09f/fff",
    dailyPreview: "https://via.placeholder.com/300.png/09f/fff",
  });
  const { weeklyPreview, dailyPreview } = preview;
  const {
    name,
    cmp,
    support,
    resistance,
    supportLevels,
    formData,
    resistanceLevels,
    error,
    loading
  } = value;
  const fetchnotes = (time) => () => {
 
    if (typeof window == "undefined") {
      return "";
    }
    if (window.sessionStorage.getItem(`${time}new`)) {
      return JSON.parse(window.sessionStorage.getItem(`${time}new`));
    } else {
      return "";
    }
  };
  const [bodyWeekly, setBodyWeekly] = useState(fetchnotes("weekly"));
  const [bodyDaily, setBodyDaily] = useState(fetchnotes("daily"));

  const handleBody = (time) => (e) => {
    if (time === "daily") {
      setBodyDaily(e);
    } else {
      setBodyWeekly(e);
    }
    formData.set(time, e);
    if (typeof window != "undefined") {
      window.sessionStorage.setItem(`${time}new`, JSON.stringify(e));
    }
  };
  const handleChange = (e) => {
    formData.set([e.target.name], e.target.value)
    setValue({ ...value, [e.target.name]: e.target.value });
  };

  const showSupports = () =>
    supportLevels &&
    supportLevels.map((s, i) => (
      <li key={i} style={{ listStyle: "none" }}>
  
        <label>{s}</label>
      </li>
    ));
  const showResistances = () =>
    resistanceLevels &&
    resistanceLevels.map((r, i) => (
      
      <li key={i} style={{ listStyle: "none" }}>
   
        <label>{r}</label>
      </li>
    ));
  const handleLevels = (e) => {
    if (e.key === "Enter") {
      let supportlist = [...supportLevels]
      let resistancelist = [...resistanceLevels]
      if (e.target.name === "support" && support) {
        supportlist.push(support);
        setValue({ ...value, supportLevels: supportlist, support: "" });
        formData.set('supportLevels',supportlist);
      } else if (resistance) {
        resistancelist.push(resistance);
        setValue({
          ...value,
          resistanceLevels: resistancelist,
          resistance: "",
        });
        formData.set('resistanceLevels',resistancelist);
      }
    }
  };
  const setLevel = (e) => {
    setValue({ ...value, [e.target.name]: e.target.value });
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
      setValue({...value,loading: true})
      let token = JSON.parse(window.localStorage.getItem('auth')).token
      newStock(formData,token).then(data => {
        if(data.error){
          console.log(data.error)
        }else{
          setValue({...value,loading:false})
          clearlocalstorage()
          window.location.href = "/"
        }
      })
    }else{
      setValue({...value,error: 'Name and CMP are required'})
    }
  };
  const clearlocalstorage = () => {
    if(window.sessionStorage.getItem('weeklynew')){
      window.sessionStorage.removeItem('weeklynew')
    }
    if( window.sessionStorage.getItem('dailynew')){
      window.sessionStorage.removeItem('dailynew')
    }
  }
  
  return (
    <Fragment>
      <MainHeader />
      <div style={{ marginBottom: "16px" }}>
      

      <NewStockForm loading={loading} show={false} setLevel = {setLevel} showResistances = {showResistances} showSupports= {showSupports} name = {name} cmp = {cmp} support = {support} resistance = {resistance} bodyWeekly = {bodyWeekly} bodyDaily = {bodyDaily} weeklyPreview = {weeklyPreview} dailyPreview = {dailyPreview} handleChange = {handleChange} handleClick = {handleClick} handleBody = {handleBody} handlePreview = {handlePreview} handleLevels = {handleLevels} />
      </div>
      <div>
        <MainFooter />
      </div>
    </Fragment>
  );
};

export default NewNotes;
