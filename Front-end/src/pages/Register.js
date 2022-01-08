import React, { useState } from "react";
import { Auth } from "aws-amplify";
import { Link } from "react-router-dom";
import { useHistory } from "react-router";

const Register = () => {
  const history = useHistory();
  const [userDetails, setUserDetails] = useState({
    username: "",
    email: "",
    password: "",
  });

  const handleChange = ({ target: { name, value } }) => {
    setUserDetails((prev) => ({ ...prev, [name]: value }));
  };

  const { username, email, password } = userDetails;

  const registerFunction = async (e) => {
    e.preventDefault();
    try {
      await Auth.signUp({
        username: username,
        password: password,
        attributes: {
          email: email,
        },
      });
      localStorage.setItem("username", username);
      localStorage.setItem("email", email);
      localStorage.setItem("password", password);
      history.replace("/mfa1");
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <>
      <div className="d-flex flex-column flex-md-row align-items-center p-3 px-md-4 mb-3 bg-white border-bottom box-shadow">
        <h5 className="my-0 mr-md-auto font-weight-normal">SafeDeposit Box</h5>
      </div>
      <div className="wrapper">
        <div id="formContent">
          <div>
            <img
              className="w-25 p-3 h-25 d-inline-block"
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ03jzaoR-gT3vldfqiu94Z8FEi0KXzVzMPjQ&usqp=CAU"
              id="icon"
              alt="User Icon"
            />
          </div>
          <form onSubmit={registerFunction}>
            <input
              type="text"
              id="username"
              name="username"
              placeholder="Enter Username"
              value={username}
              onChange={handleChange}
              required
            />
            <input
              type="email"
              id="email"
              name="email"
              placeholder="Enter Email"
              value={email}
              onChange={handleChange}
              required
            />
            <input
              type="password"
              id="password"
              name="password"
              placeholder="Enter Password"
              value={password}
              onChange={handleChange}
            />
            <br></br>
            <input type="submit" />
          </form>
          <p className="forgot-password text-right">
              Already registered{" "}
              <Link to="/login">
                <b>Log in?</b>
              </Link>
            </p>
            <br></br>
        </div>
      </div>
    </>
  );
};
export default Register;
