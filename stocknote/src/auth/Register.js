import { Fragment, useState } from "react";
import { Link } from "react-router-dom";
import {
  Button,
  Divider,
  Form,
  Grid,
  Header,

  Input,
  Message,
} from "semantic-ui-react";
import { register } from "../actions/auth";
import MainFooter from "../Navigations/MainFooter";
import classes from "./auth.module.css";
import Registerinfo from "./RegisterInfo";

const Register = () => {
  const [value, setValue] = useState({
    email: "",
    password: "",
    name: "",
    confirmPassword: "",
    loading: false,
    error: "",
    message: "",
  });
  const { email, password, name, confirmPassword, loading, error, message } =
    value;
  const handleChange = (e) => {
    setValue({ ...value, [e.target.name]: e.target.value, error: "" });
  };
  const handleSubmit = () => {
    if (isFormEmpty()) {
      if (ispasswordmatch()) {
        setValue({ ...value, loading: true });
        register({ name, email, password }).then((data) => {
          console.log(data);
          if (data.error) {
            setValue({ ...value, error: data.error, loading: false });
          } else {
            setValue({
              ...value,
              name: "",
              email: "",
              password: "",
              error: "",
              confirmPassword: "",
              message: data.message ,
              loading: false,
            });
            window.location.href = "/login" 
          }
        });
      } else {
        setValue({
          ...value,
          error: "Password and Confirm Password must match.",
        });
      }
    } else {
      setValue({ ...value, error: "All Fields are required." });
    }
  };
  const ispasswordmatch = () => {
    return password === confirmPassword;
  };
  const isFormEmpty = () => {
    return email && password && name && confirmPassword;
  };
  const registerForm = () => {
    return (
      <Grid
        style={{ background: "#f7fafc", alignContent: "center" }}
        stackable
        textAlign="center"
        verticalAlign="middle"
      >
        <Grid.Row>
          <Header
            style={{
              color: "#2a2f45",
              fontWeight: "600",
              fontSize: "1.5rem",
              marginBottom: "16px",
            }}
          >
            stocknote
          </Header>
        </Grid.Row>
        <Grid.Row style={{}}>
          <Grid.Column
            style={{
              overflow: "hidden",
              padding: "16px",
              minWidth: "300px",
              maxWidth: 400,
              border: "2px solid #ddd",
              background: "#fff",
              borderRadius: "4px",
              boxShadow:
                "0 15px 35px 0 rgba(60,66,87,.08),0 5px 15px 0 rgba(0,0,0,.12)",
            }}
          >
            <Header
              as="h2"
              style={{
                color: "#3c4257",
                paddingTop: "8px",
                fontsize: "1.6rem",
              }}
            >
              Create your Stocknote account
            </Header>
            <Divider />
            <br />
            <Form onSubmit={handleSubmit}>
              <Form.Field>
                <Input
                  icon="user"
                  name="name"
                  value={name}
                  label="Name"
                  placeholder="Enter Name"
                  onChange={handleChange}
                />
              </Form.Field>
              <Form.Field>
                <Input
                  icon="mail"
                  label="Email"
                  value={email}
                  name="email"
                  placeholder="Enter Email"
                  onChange={handleChange}
                />
              </Form.Field>
              <Form.Field>
                <Input
                  icon="unlock"
                  type="password"
                  label="Password"
                  value={password}
                  name="password"
                  placeholder="Enter Password"
                  onChange={handleChange}
                />
              </Form.Field>
              <Form.Field>
                <Input
                  icon="repeat"
                  label="Confirm Password"
                  type="password"
                  value={confirmPassword}
                  name="confirmPassword"
                  placeholder="Enter Password Again"
                  onChange={handleChange}
                />
              </Form.Field>
              <br />
              <Button
                type="submit"
                size="large"
                loading={loading}
                content="Register"
                color="orange"
                disabled={loading}
                fluid
              />
            </Form>
            <Divider />
            <Message
              style={{
                background: "#fff",
                border: "none",
                padding: "0",
                boxShadow: "none",
              }}
            >
              {" "}
              Already a user? <Link to="/login" style={{color: 'aliceblue'}}>Login</Link>
            </Message>
            {message ? (
              <Message success={message?true:false}>{message}</Message>
            ) : (
              ""
            )}
            {error ? <Message error={error?true:false}>{error}</Message> : ""}
          </Grid.Column>
        </Grid.Row>
      </Grid>
    );
  };
  const registercomp = () => {
    return (
      <div
        className="flex-column"
        style={{
          paddingTop: "55px",
          marginLeft: "16px",
          justifyContent: "flex-start",
        }}
      >
        <Header style={{ marginLeft: "45px", fontSize: "1.6rem" }}>
          stocknote
        </Header>
        <Registerinfo
          heading="Get Started Quickly"
          content="Register for Free and make notes that make you ear profit"
        />
        <Registerinfo
          heading="Do Organized Study"
          content="Organized notes make you a better Analyst"
        />
        <Registerinfo
          heading="Unlimited Stocknotes"
          content="stocknotes helps you make unlimited notes for Free"
        />
      </div>
    );
  };
  return (
    <Fragment>
      <div className="app">
        <div
          className="ant-row-center"
          style={{
            height: "90vh",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-around",
            background: "#f7fafc"
          }}
        >
          <div
            className={`${classes.registerinfo} ant-col-sm-0 ant-col-md-0 ant-col-lg-12`}
          >
            {registercomp()}
          </div>
          <div className="ant-col-sm-24 ant-col-md-24 ant-col-lg-12">
            {registerForm()}
          </div>
        </div>

        <MainFooter />
      </div>
    </Fragment>
  );
};
export default Register;
