import React from "react";
import { Link } from "react-router-dom";
import LexChat from "react-lex-plus";


const StartPage = () => {
  return (
    <>
      <div className="d-flex flex-column flex-md-row align-items-center p-3 px-md-4 mb-3 bg-white border-bottom box-shadow">
        <h5 className="my-0 mr-md-auto font-weight-normal">SafeDeposit Box</h5>
        <nav className="my-2 my-md-0 mr-md-3">
          <>
            <Link className="p-2 text-dark" to="/login">
              Log In
            </Link>
            <Link className="p-2 text-dark" to="/register">
              Register
            </Link>
          </>
        </nav>
      </div>
      <h1 className="text-center">SafeDeposit Box</h1>
      <div className="row">
        <div className="col-sm-6 offset-sm-3">
          <div className="jumbotron">
            Welcome to SafeDeposit Box. You can use this to easily transfer
            money and chat with your friends or family members. You can register
            and login to use all the features of this SafeDeposit Box.
          </div>
        </div>
      </div>
      <LexChat
        botName="SafeDeposit"
        IdentityPoolId="us-east-1:757c86a5-29af-4885-8c72-b1e9006cdd43"
        placeholder="Placeholder text"
        backgroundColor="#FFFFFF"
        height="430px"
        region="us-east-1"
        headerText="Chat support"
        headerStyle={{ backgroundColor: "#56baed", fontSize: "20px" }}
        greeting={
          "Hello there"
        }
      />
    </>
  );
};
export default StartPage;
