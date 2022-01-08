import React, { useState } from "react";
import { useHistory } from "react-router";
import axios from "axios";
import Loader from "react-loader-spinner";

const QuestionAnswerLogin = () => {
  const history = useHistory();
  const [answers, setAnswers] = useState({
    answer1: "",
    answer2: "",
  });
  const [load, setLoad] = useState(false);

  const handleChange = ({ target: { name, value } }) => {
    setAnswers((prev) => ({ ...prev, [name]: value }));
  };

  const { answer1, answer2 } = answers;

  const QAFun = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "https://us-central1-serverless-project-grp-4.cloudfunctions.net/safeDepositQA-fetch",
        {
          answer1: answer1,
          answer2: answer2,
        }
      );
      if (response != "") {
        setLoad(false);
        if (response.data === "found") {
          history.replace("/CC");
        } else {
          alert("Your answers to the question do not matched");
          history.replace("/QA");
        }
      }
    } catch (e) {
      console.log(e.message);
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
            <div>
              <img
                className="w-25 p-3 h-25 d-inline-block"
                src="https://cdn-icons-png.flaticon.com/512/295/295128.png"
                alt="User Icon"
              />
            </div>

            <form onSubmit={QAFun}>
              <label style={{ float: "left", marginLeft: "35px" }}>
                What is the place of your birth?
              </label>
              <input
                type="text"
                id="answer1"
                name="answer1"
                placeholder="Enter your answer"
                value={answer1}
                onChange={handleChange}
              />
              <label style={{ float: "left", marginLeft: "35px" }}>
                What is the mother's maiden name?
              </label>
              <input
                type="text"
                id="answer2"
                name="answer2"
                placeholder="Enter your answer"
                value={answer2}
                onChange={handleChange}
              />
              <input type="submit" />
            </form>
          </div>
        </div>
      )}
    </>
  );
};
export default QuestionAnswerLogin;
