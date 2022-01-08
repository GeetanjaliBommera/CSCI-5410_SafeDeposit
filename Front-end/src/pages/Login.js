import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Auth } from "aws-amplify";
import { useHistory } from "react-router";
import axios from "axios";
import Loader from "react-loader-spinner";

const Login = (props) => {
  const history = useHistory();
  const [userDetails, setUserDetails] = useState({
    username: "",
    password: "",
  });
  const [email, setEmail] = useState("");
  const [load, setLoad] = useState(false);

  const handleChange = ({ target: { name, value } }) => {
    setUserDetails((prev) => ({ ...prev, [name]: value }));
  };

  const { username, password } = userDetails;

  const loginFun = async (e) => {
    e.preventDefault();
    try {
      const user = await Auth.signIn(username, password);
      console.log(user);
      const email_verified = user.storage["email"];
      setEmail(email_verified);
      if (email_verified) {
        setLoad(true);
        const response = await axios.post(
          "https://upur8wfskk.execute-api.us-east-1.amazonaws.com/fetchBox",
          {
            email: email_verified,
          }
        );
        const response1 = await axios.post(
          "https://upur8wfskk.execute-api.us-east-1.amazonaws.com/storeUserHistory",
          {
            email: email_verified,
          }
        );
        if (response != "") {
          setLoad(false);
          props.setIsAuthenticated(true);
          localStorage.setItem("box_id", response.data.box_id);
          localStorage.setItem("username", username);
          localStorage.setItem("email", email_verified);
          history.replace("/QA");
        }
      }
    } catch (error) {
      // if (error.message === "Incorrect username or password.") {
      //   alert(
      //     "Either the username or password is incoorect or You are not registered user"
      //   );
      //   history.replace("/login");
      // } else {
      //   history.replace("/welcome");
      // }
    }
  };
  return (
    <>
      <div className="d-flex flex-column flex-md-row align-items-center p-3 px-md-4 mb-3 bg-white border-bottom box-shadow">
        <h5 className="my-0 mr-md-auto font-weight-normal">SafeDeposit Box</h5>
      </div>
      {load ? (
        <Loader
          type="BallTriangle"
          color="#00BFFF"
          height={100}
          width={100}
          timeout={8000}
        />
      ) : (
        <div className="wrapper">
          <div id="formContent">
            <>
              <div>
                <img
                  className="w-25 p-3 h-25 d-inline-block"
                  src="https://cdn-icons-png.flaticon.com/512/295/295128.png"
                  alt="User Icon"
                />
              </div>

              <form onSubmit={loginFun}>
                <input
                  type="text"
                  id="Username"
                  name="username"
                  placeholder="Username"
                  value={username}
                  onChange={handleChange}
                />
                <input
                  type="password"
                  id="password"
                  name="password"
                  placeholder="Password"
                  value={password}
                  onChange={handleChange}
                />
                <input type="submit" />
                <p className="forgot-password">
                  New User{" "}
                  <Link to="/register">
                    <b>Register?</b>
                  </Link>
                </p>
                <br></br>
              </form>
            </>
          </div>
        </div>
      )}
    </>
  );
};
export default Login;
