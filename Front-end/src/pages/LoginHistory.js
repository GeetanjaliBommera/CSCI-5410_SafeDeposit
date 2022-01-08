import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import Loader from "react-loader-spinner";
import { Auth } from "aws-amplify";
import { useHistory } from "react-router";

const LoginHistory = (props) => {
  const history = useHistory();
  const [email, setEmail] = useState("");
  const [loginHistory, setLoginHistory] = useState([]);
  const [load, setLoad] = useState(false);

  const LogOut = (event) => {
    event.preventDefault();
    try {
      Auth.signOut();
      props.setIsAuthenticated(false);
      history.replace("/");
    } catch (error) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    getLoginHistory();
  }, []);

  const getLoginHistory = async () => {
    const email = localStorage.getItem("email");
    setEmail(localStorage.getItem("email"));
    try {
      const response = await axios.post(
        "https://upur8wfskk.execute-api.us-east-1.amazonaws.com/fetchUserHistory",
        {
          email,
        }
      );
      console.log(response);
      if (response != "") {
        setLoad(false);
        response.data.forEach((element) => {
          let temp = {};
          temp["timeDate"] = element.timeDate;
          setLoginHistory((prev) => [...prev, temp]);
        });
      }
    } catch (err) {
      console.log(err);
    }
  };

  console.log(email);
  return (
    <>
      <div className="d-flex flex-column flex-md-row align-items-center p-3 px-md-4 mb-3 bg-white border-bottom box-shadow">
        <h5 className="my-0 mr-md-auto font-weight-normal">SafeDeposit Box</h5>
        <nav className="my-2 my-md-0 mr-md-3">
          <>
            <Link className="p-2 text-dark" to="/withdraw">
              Withdraw
            </Link>
            <Link className="p-2 text-dark" to="/loginhistory">
              Login History
            </Link>
            <Link className="p-2 text-dark" to="/uploadimage">
              Send Message
            </Link>
            <a
              className="p-2 text-dark"
              onClick={LogOut}
              style={{ cursor: "pointer" }}
            >
              Logout
            </a>
          </>
        </nav>
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
        <>
          <h1 className="text-start">Login History</h1>
          <div className="row">
            <div className="col-sm-8 offset-sm-2">
              <table className="table table-striped">
                <thead>
                  <tr>
                    <th scope="col">#</th>
                    <th scope="col">Date and time of logged in</th>
                  </tr>
                </thead>
                <tbody>
                  {!!loginHistory.length &&
                    loginHistory.map((element, index) => (
                      <tr key={index}>
                        <th scope="row">{index + 1}</th>
                        <td>{element.timeDate}</td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>
          </div>
        </>
      )}
    </>
  );
};
export default LoginHistory;
