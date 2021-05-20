import { Fragment } from "react";
import { Link } from "react-router-dom";
import classes from "./ErrorPage.module.css";
const ErrorPage = () => {
  return (
    <Fragment>
      <div className={classes.bodyError}>
        <div className={classes.mainbox}>
          <div className={classes.err}>4</div>
          <i className={`${classes.far} fa-question-circle fa-spin`}></i>
          <div className={classes.err2}>4</div>
          <div className={classes.msg}>
            Maybe this page moved? Got deleted? May be you are not logged In?
          
            <p>
              Let's go <Link to="/">Home</Link> and try from there.
            </p>
          </div>
        </div>
      </div>
    </Fragment>
  );
};
export default ErrorPage;
