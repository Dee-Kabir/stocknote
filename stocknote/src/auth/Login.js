import { Fragment, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  Button,
  Message,
  Divider,
  Form,
  Grid,
  Header,
  Input,
} from "semantic-ui-react";
import { setCookie, signin } from "../actions/auth";
import MainFooter from "../Navigations/MainFooter";
import cookie from "js-cookie";

const Login = (props) => {
  const [value, setValue] = useState({
    email: "",
    password: "",
    error: "",
    loading: false,
  });
  const { email, password, loading, error } = value;
  const handleChange = (e) => {
    setValue({ ...value, [e.target.name]: e.target.value, error: "" });
  };
  useEffect(() => {
    if (cookie.get("token")) {
      props.history.push("/");
    }
  });
  const handleSubmit = () => {
    if (isFormEmpty) {
      setValue({ ...value, loading: true });
      signin({ email, password }).then((data) => {
        try {
          if (data.error) {
            setValue({ ...value, error: data.error, loading: false });
          } else {
            setCookie("token", data.token);
            window.localStorage.setItem("auth", JSON.stringify(data));
            setValue({
              ...value,
              loading: false,
              email: "",
              password: "",
              error: "",
            });
            window.location.href = "/";
          }
        } catch {
          setValue({
            ...value,
            error: "Error While connecting to server",
            loading: false,
          });
        }
      });
    } else {
      setValue({ ...value, error: "All fields are required." });
    }
  };
  const isFormEmpty = () => {
    return email && password;
  };
  const LoginForm = () => {
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
        <Grid.Row>
          <Grid.Column
            style={{
              overflow: "hidden",
              padding: "56px 48px",
              minWidth: "300px",
              maxWidth: 400,
              border: "2px solid #ddd",
              background: "#fff",
              borderRadius: "4px",
              boxShadow:
                "0 15px 35px 0 rgba(60,66,87,.08),0 5px 15px 0 rgba(0,0,0,.12)",
            }}
          >
            <Grid.Row>
              <Header
                style={{
                  color: "#2a2f45",
                  fontWeight: "600",
                  fontSize: "1.5rem",
                }}
              >
                Sign in to your Account
              </Header>
            </Grid.Row>
            <Divider />
            <br />
            <br />
            <Form onSubmit={handleSubmit}>
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
              <br />
              <Form.Field>
                <Input
                  icon="unlock"
                  label="Password"
                  type="password"
                  value={password}
                  name="password"
                  placeholder="Enter Password"
                  onChange={handleChange}
                />
              </Form.Field>
              <br />
              <Button
                size="large"
                style={{ width: "100%" }}
                color="orange"
                content="Login"
                loading={loading}
                disabled={loading}
                type="submit"
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
              Not registered yet?{" "}
              <Link to="/register" style={{ color: "blue" }}>
                Register
              </Link>
            </Message>
            {error ? (
              <Message error={error ? true : false}>{error}</Message>
            ) : (
              ""
            )}
          </Grid.Column>
        </Grid.Row>
      </Grid>
    );
  };
  return (
    <Fragment>
      <div className="app">
        <div
          className="ant-row-center"
          style={{
            background: "#f7fafc",
            height: "90vh",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-around",
          }}
        >
          <div className="ant-col-sm-20 ant-col-md-20 ant-col-lg-20">
            {LoginForm()}
          </div>
        </div>
        <MainFooter />
      </div>
    </Fragment>
  );
};
export default Login;
