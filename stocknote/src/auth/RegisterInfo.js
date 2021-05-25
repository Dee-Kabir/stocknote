import classes from "./auth.module.css";
import { Icon } from "semantic-ui-react";

const Registerinfo = ({ heading, content }) => (
  <div>
    <div className={`${classes.registerinfo_point}`}>
      <Icon size="large" color="orange" name="check circle" />
      <div className={`${classes.registerinfo_point_content}`}>
        <div style={{ color: "#1a1f36", fontWeight: 500, fontSize: "16px" }}>
          {heading}
        </div>
        <div style={{ color: "#3c4257" }}>{content}</div>
      </div>
    </div>
  </div>
);
export default Registerinfo;
