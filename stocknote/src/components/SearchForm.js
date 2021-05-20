import { Search } from "semantic-ui-react";
import { useEffect, useState } from "react"
import { Label } from "semantic-ui-react"
import { searchList } from "../actions/stock";
import _ from 'lodash'
import { useHistory } from "react-router";
const SearchForm = ({size}) => {
    const history = useHistory()
    const [loading,setLoading] = useState(false);
  const [result,setResult] = useState([]);
  const [source,setSource] = useState('');
  const [value,setValue] = useState('');
  useEffect(()=>{
      const ac =new AbortController()
    let token = JSON.parse(window.localStorage.getItem('auth')).token
    loadSource(token)
    return () => ac.abort();
  },[])
  const loadSource = (token) => {
    searchList(token).then(data => {
      if(data.error){
        console.log(data.eror)
      }else{
        setSource(data.stocks)
      }
    })
  }
  const handleResultSelect = () => {
    setLoading(true)
    console.log(result)
    setTimeout(() => {
      setLoading(false)
      history.push(`/stock/${result[0]._id}`)
      setValue('')
    },1000)
    
  }
  useEffect(()=>{
    const re = new RegExp(_.escapeRegExp(value), 'i')
      const isMatch = (result) => re.test(result.title)
      setResult(_.filter(source,isMatch));
      setLoading(false)
  },[value])
  const handleSearchChange = (e) => {
    setValue((value) => e.target.value)
    setLoading(true)
    
  }
  const resultRenderer = ({ title }) => <Label content={title} />
    return(
        <Search 
        style = {size}
    loading={loading}
    onSearchChange={handleSearchChange}
    onResultSelect={(e,data) => {setValue(data.result.title)
    handleResultSelect()
    }}
    results={result}
    resultRenderer = {resultRenderer}
    value={value}
    />
    )
}
export default SearchForm;