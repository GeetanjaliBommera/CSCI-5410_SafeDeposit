import React, { useState, useEffect } from "react";
import "./App.css";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import { Auth } from "aws-amplify";

import HomePage from "./pages/HomePage";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Welcome from "./pages/Welcome";
import StartPage from "./pages/StartPage";
import Ceasercipher from "./pages/Ceasercipher";
import CeasercipherLogin from "./pages/CeasercipherLogin";
import QuestionAnswerR from "./pages/QuestionAnswerRegister";
import QuestionAnswerL from "./pages/QuestionAnswerLogin";
import Lex from "./pages/lex";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Withdraw from "./pages/Withdraw";
import LoginHistory from "./pages/LoginHistory";
import SendMessage from "./pages/SendMessage";
import UploadImage from "./pages/UploadImage";
import Visualization from "./pages/visualization";


const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isAuthenticating, setIsAuthenticating] = useState(true);

  useEffect(() => {
    setSession();
  }, []);

  const setSession = async () => {
    try {
      const session = await Auth.currentSession();
      setIsAuthenticated(true);
    } catch (error) {
      if (error !== "No current user") {
        console.log(error);
      }
    }
    setIsAuthenticating(false);
  };

  return (
    <BrowserRouter>
      {!isAuthenticating && (
        <div className="App">
          <Switch>
          <Route
              exact
              path="/login"
              component={(props) => (
                <Login
                  {...props}
                  isAuthenticated={isAuthenticated}
                  setIsAuthenticated={setIsAuthenticated}
                />
              )}
            />
            <Route
              exact
              path="/homepage"
              component={(props) => (
                <HomePage
                  {...props}
                  isAuthenticated={isAuthenticated}
                  setIsAuthenticated={setIsAuthenticated}
                />
              )}
            />
            <Route
              exact
              path="/mfa1"
              component={(props) => (
                <QuestionAnswerR
                  {...props}
                  isAuthenticated={isAuthenticated}
                  setIsAuthenticated={setIsAuthenticated}
                />
              )}
            />
            <Route
              exact
              path="/welcome"
              component={(props) => (
                <Welcome
                  {...props}
                  isAuthenticated={isAuthenticated}
                  setIsAuthenticated={setIsAuthenticated}
                />
              )}
            />
            <Route
              exact
              path="/register"
              component={(props) => (
                <Register
                  {...props}
                  isAuthenticated={isAuthenticated}
                  setIsAuthenticated={setIsAuthenticated}
                />
              )}
            />
            <Route
              exact
              path="/mfa2"
              component={(props) => (
                <Ceasercipher
                  {...props}
                  isAuthenticated={isAuthenticated}
                  setIsAuthenticated={setIsAuthenticated}
                />
              )}
            />
            <Route
              exact
              path="/CC"
              component={(props) => (
                <CeasercipherLogin
                  {...props}
                  isAuthenticated={isAuthenticated}
                  setIsAuthenticated={setIsAuthenticated}
                />
              )}
            />
            <Route
              exact
              path="/QA"
              component={(props) => (
                <QuestionAnswerL
                  {...props}
                  isAuthenticated={isAuthenticated}
                  setIsAuthenticated={setIsAuthenticated}
                />
              )}
            />
            <Route
              exact
              path="/withdraw"
              component={(props) => (
                <Withdraw
                  {...props}
                  isAuthenticated={isAuthenticated}
                  setIsAuthenticated={setIsAuthenticated}
                />
              )}
            />
            <Route
              exact
              path="/loginhistory"
              component={(props) => (
                <LoginHistory
                  {...props}
                  isAuthenticated={isAuthenticated}
                  setIsAuthenticated={setIsAuthenticated}
                />
              )}
            />
            <Route
              exact
              path="/uploadimage"
              component={(props) => (
                <UploadImage
                  {...props}
                  isAuthenticated={isAuthenticated}
                  setIsAuthenticated={setIsAuthenticated}
                />
              )}
            />
            <Route
              exact
              path="/sendmessage"
              component={(props) => (
                <SendMessage
                  {...props}
                  isAuthenticated={isAuthenticated}
                  setIsAuthenticated={setIsAuthenticated}
                />
              )}
            />
            <Route exact path="/" component={StartPage} />
            <Route exact path="/visual" component={Visualization} />
          </Switch>
        </div>
      )}
      )
    </BrowserRouter>
  );
};

export default App;
