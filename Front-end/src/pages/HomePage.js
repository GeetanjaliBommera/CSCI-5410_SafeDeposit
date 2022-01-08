import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { Auth } from "aws-amplify";
import { useHistory } from "react-router";
import Loader from "react-loader-spinner";

const HomePage = (props) => {
  const history = useHistory();
  const [box_id, setBoxId] = useState("");
  const [message, setMessage] = useState(
    "Click above button to revice and check your message"
  );
  const [load, setLoad] = useState(false);

  useEffect(() => {
    setBoxId(localStorage.getItem("box_id"));
    console.log("box_idh", box_id);
  }, []);

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

  const receiveMessage = async () => {
    const response = await axios.post(
      "https://us-central1-cloud5410-328519.cloudfunctions.net/pull_message",
      {
        box_name: box_id,
      }
    );
    if (response != "") {
      setLoad(false);
      setMessage("You have received " + response.data.Message);
    }
  };
  return (
    <>
      {props.isAuthenticated ? (
        <>
          <div className="d-flex flex-column flex-md-row align-items-center p-3 px-md-4 mb-3 bg-white border-bottom box-shadow">
            <h5 className="my-0 mr-md-auto font-weight-normal">
              SafeDeposit Box
            </h5>
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
          <h1 className="text-center">Your box number is : {box_id}</h1>
          <div className="row">
            <div className="col-sm-8 offset-sm-2">
              <p>Welcome to the dashboard</p>
              <button onClick={receiveMessage}>Click</button>
              {load ? (
                <Loader
                  type="BallTriangle"
                  color="#00BFFF"
                  height={100}
                  width={100}
                  timeout={8000}
                />
              ) : (
                <p>{message}</p>
              )}
            </div>
          </div>
        </>
      ) : (
        <>
          <h1>Opps!</h1>
          <p>
            You are logout! Please click <Link to={"/login"}>Login</Link>
          </p>
        </>
      )}
    </>
  );
};
export default HomePage;
