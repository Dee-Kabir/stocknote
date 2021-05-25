import { Message, Search } from "semantic-ui-react";
import { useEffect, useState } from "react";
import { Label } from "semantic-ui-react";
import { searchList } from "../actions/stock";
import _ from "lodash";
import { useHistory } from "react-router";
import { Fragment } from "react";
const SearchForm = ({ size, showError = true }) => {
  const history = useHistory();
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState([]);
  const [source, setSource] = useState("");
  const [value, setValue] = useState("");
  const [load, setLoad] = useState(false);
  const [error, setError] = useState("");
  useEffect(() => {
    const ac = new AbortController();
    let token = JSON.parse(window.localStorage.getItem("auth")).token;
    loadSource(token);
    return () => ac.abort();
  }, [load]);

  const loadSource = (token) => {
    searchList(token).then((data) => {
      try {
        if (data.error) {
          setError(data.error);
        } else {
          setSource(data.stocks);
          setError("");
        }
      } catch {
        setError("Error while connecting to server");
      }
    });
  };
  const handleResultSelect = () => {
    setLoading(true);

    setTimeout(() => {
      setLoading(false);
      history.push(`/stock/${result[0]._id}`);
      setValue("");
    }, 1000);
  };
  useEffect(() => {
    const re = new RegExp(_.escapeRegExp(value), "i");
    const isMatch = (result) => re.test(result.title);
    setResult(_.filter(source, isMatch));
    setLoading(false);
  }, [value]);
  const handleSearchChange = (e) => {
    setValue((value) => e.target.value);
    setLoading(true);
  };
  const resultRenderer = ({ title }) => <Label content={title} />;
  return (
    <Fragment>
      <Search
        style={size}
        loading={loading}
        onSearchChange={handleSearchChange}
        onResultSelect={(e, data) => {
          setValue(data.result.title);
          handleResultSelect();
        }}
        onFocus={() => setLoad(true)}
        results={result}
        resultRenderer={resultRenderer}
        value={value}
      />
      {error && showError && <Message>{error}</Message>}
    </Fragment>
  );
};
export default SearchForm;
