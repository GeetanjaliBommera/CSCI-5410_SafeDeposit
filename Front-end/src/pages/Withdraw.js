import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useHistory } from "react-router";
import { Auth } from "aws-amplify";
import axios from "axios";


const Withdraw = (props) => {
  const history = useHistory();
  const [amount, setAmount] = useState("");
  const [balance, setBalance] = useState("5000");
  const [box_id, setbox_id] = useState("");
  const [email, setEmail] = useState("");

  const handleChange = (event) => {
    setAmount(String(event.target.value));
  };

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
  const withdrawFunction = async (e) => {
    e.preventDefault();
    const response = await axios.post(
      "https://24est459hd.execute-api.us-east-1.amazonaws.com/test_stage/transaction",
      {
        box_id: box_id,
        balance: balance,
        user_id: email,
        withdraw: amount,
      }
    );
    console.log(response)
    setBalance(Number(balance) - Number(amount));
    setAmount("");
    history.replace("/withdraw");
  };

  const visualOpen = () =>{
    history.push("/visual");
  };
  
  useEffect(() => {
    setEmail(localStorage.getItem("email"));
    setbox_id(localStorage.getItem("box_id"));
  }, []);

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
          <div className="wrapper">
            <div id="formContent">
              <div>
                <img
                  className="w-25 p-3 h-25 d-inline-block"
                  src="https://static.vecteezy.com/system/resources/previews/002/486/468/original/withdraw-money-icon-vector.jpg"
                  id="icon"
                  alt="User Icon"
                />
              </div>
              <form onSubmit={withdrawFunction}>
                <label>Available balance</label>
                <input
                  type="text"
                  id="Balance"
                  name="Balance"
                  placeholder={balance}
                  disabled
                  required
                  style={{ textAlign: "center" }}
                />
                <input
                  type="number"
                  id="amount"
                  name="amount"
                  placeholder="Enter amount"
                  value={amount}
                  onChange={handleChange}
                  required
                />

                <br></br>
                <br></br>
                <input type="submit" />
              </form>
              <button onClick={visualOpen}className="btn btn-outline-primary">Visualize transaction</button>
              <br></br>
              <br></br>
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
export default Withdraw;
