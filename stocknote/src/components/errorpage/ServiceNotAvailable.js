import { Redirect } from "react-router";
import { Link } from "react-router-dom";
import classes from "./ServiceNotAvailable.module.css";

const ServiceNotAvailabel = ({ error }) => {
  return (
    <div className={`${classes.error_page} ${classes.div_class} `}>
      <aside>
        <img
          className={classes.error_img}
          src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/4424790/Mirror.png"
          alt="404 Image"
        />
      </aside>
      <main>
        <h1>Sorry!</h1>
        <p>
          Either you aren't cool enough to visit this page or it doesn't exist{" "}
          <em>. . . like your social life.</em>
        </p>
        <p>{error}</p>
        <button className={classes.error_button}>
          <Link to="/">You can go now!</Link>
        </button>
      </main>
    </div>
  );
};
export default ServiceNotAvailabel;
