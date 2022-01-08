import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useHistory } from "react-router";
import axios from "axios";
import { Auth } from "aws-amplify";


const SendMessage = (props) => {
  const history = useHistory();
  const [message, setMessage] = useState("");
  const [outputResponse, setOutputResponse] = useState("");
  const [box_id, setbox_id] = useState("");

  const handleChange = (event) => {
    setMessage(String(event.target.value));
  };

  const LogOut = (event) => {
    event.preventDefault();
    try {
      Auth.signOut();
      props.setIsAuthenticated(false);
      history.replace("/login");
    } catch (error) {
      console.log(error.message);
    }
  };

  const sendMessage1 = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "https://us-central1-cloud5410-328519.cloudfunctions.net/send_message",
        {
          "image": outputResponse,
          "box_name": box_id,
          "Message": message,
        }
      );
    } catch (e) {
      history.replace("/homepage");
    }
  };
  useEffect(() => {
    setOutputResponse(localStorage.getItem("outputResponse"));
    setbox_id(localStorage.getItem("box_id"));
  }, []);
  return (
    <>
    {props.isAuthenticated ? (
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
            <a className="p-2 text-dark" onClick={LogOut} style={{cursor:"pointer"}}>
                  Logout
                </a>
          </>
        </nav>
      </div>
      <div className="wrapper">
        <div id="formContent">
          <div>
            <img
              className="w-25 p-3 h-25 d-inline-block"
              src="https://media.istockphoto.com/vectors/paper-airplane-icon-isolated-on-a-blue-circle-send-message-icon-vector-id906857980?k=20&m=906857980&s=170667a&w=0&h=UV1dpRHs0uzcPjzTZm_6ESnN__x_OeSmyV2txVfor88="
              id="icon"
              alt="User Icon"
            />
          </div>
          <form onSubmit={sendMessage1}>
            <input
              type="text"
              id="message"
              name="message"
              placeholder="Enter your message"
              onChange={handleChange}
              required
            />
            <br></br>
            <br></br>
            <input type="submit" />
          </form>
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
export default SendMessage;
