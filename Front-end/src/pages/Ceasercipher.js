import React, { useState, useEffect } from "react";
import { useHistory } from "react-router";
import axios from "axios";
import Loader from "react-loader-spinner";
var randomWords = require("random-words");


const Ceasercipher = () => {
  const history = useHistory();
  const [userCipher, setUserCipher] = useState("");
  const [key, setKey] = useState("3");
  const [word, setWord] = useState("");
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [wordRandom, setWordRandom] = useState(randomWords());
  const [load, setLoad] = useState(false);

  const handleChange = (event) => {
    setUserCipher(String(event.target.value));
  };

  const CipherFun = async (e) => {
    e.preventDefault();
    if (userCipher === wordRandom) {
      const response = await axios.post(
        "https://upur8wfskk.execute-api.us-east-1.amazonaws.com/safeUser",
        {
          username: username,
          email: email,
        }
      );
      const response1 = await axios.post(
        "https://us-central1-cloud5410-328519.cloudfunctions.net/topic_create",
        {
          box: response.data.box_id,
          email: email,
        }
      );
      if (response != "") {
        setLoad(false);
        history.replace("/welcome");
      }
    } else {
      alert("Not correct cipher");
    }
  };

  const getCipher = async () => {
    const response = await axios.post(
      "https://upur8wfskk.execute-api.us-east-1.amazonaws.com/cipher",
      {
        word: wordRandom,
        key:key,
      }
    );
    setWord(response.data.cipher_text);
  };

  useEffect(() => {
    setEmail(localStorage.getItem("email"));
    setUsername(localStorage.getItem("username"));
    getCipher();
  }, []);

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

            <form onSubmit={CipherFun}>
              <label>
                You have to convert below word by shifting each letter by{" "}
                <b>{key}</b> backword
              </label>
              <input
                type="text"
                disabled
                id="userCipher"
                name="userCipher"
                placeholder={word}
                style={{ textAlign: "center", fontSize: "22px" }}
              />
              <input
                type="text"
                id="userCipher"
                name="userCipher"
                placeholder="Enter your converted message"
                value={userCipher}
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
export default Ceasercipher;
