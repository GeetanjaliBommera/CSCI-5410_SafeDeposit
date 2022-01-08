import React from "react";
import { Link } from "react-router-dom";

const Welcome = () => {
  return (
    <>
      <div className="d-flex flex-column flex-md-row align-items-center p-3 px-md-4 mb-3 bg-white border-bottom box-shadow">
        <h5 className="my-0 mr-md-auto font-weight-normal">SafeDeposit Box</h5>
      </div>
      <h1 className="text-center">SafeDeposit Box</h1>
      <div className="row">
        <div className="col-sm-6 offset-sm-3">
          <div className="jumbotron">
            Welcome to SafeDeposit Box. You have been successfully registered. Do go to your given email to confirm your registeration and then click on <Link className="p-2 text-dark" to="/login">
                Log In
              </Link> to enter into SafeDeposit Box.
          </div>
        </div>
      </div>
    </>
  );
};
export default Welcome;
