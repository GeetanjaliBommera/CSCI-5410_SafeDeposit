import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useHistory } from "react-router";
import FormData from "form-data";
import axios from "axios";
import { Auth } from "aws-amplify";
import Loader from "react-loader-spinner";

const UploadImage = (props) => {
  const history = useHistory();
  const [imageUpload, setImageUpload] = useState(null);
  const [box_id, setBoxId] = useState("");
  const [load, setLoad] = useState(false);

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

  const sendImage = async (e) => {
    e.preventDefault();
    let imageData = new FormData();
    imageData.append("imageFileName", box_id + imageUpload.name);
    imageData.append("metadata", imageUpload);

    const response = await axios.post(
      "https://us-central1-serverlessproject-334022.cloudfunctions.net/UploadFile",
      imageData
    );

    if (response != "") {
      setLoad(false);
      if (response.data == "True") {
        localStorage.setItem("outputResponse", "True");
        alert("Your image is uploaded sucessfully")
        history.push("/sendmessage");
      } else {
        localStorage.setItem("outputResponse", "False");
        alert("Your image is not found in the database use some other image")
        history.replace("/uploadimage");
      }
    }
  };
  useEffect(() => {
    setBoxId(localStorage.getItem("box_id"));
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
                    src="https://png.pngtree.com/png-vector/20191129/ourlarge/pngtree-image-upload-icon-photo-upload-icon-png-image_2047547.jpg"
                    id="icon"
                    alt="User Icon"
                  />
                </div>
                <form onSubmit={sendImage}>
                  <label style={{ float: "left", marginLeft: "40px" }}>
                    Choose Image file to upload:
                  </label>
                  <input
                    type="file"
                    name="imageUpload"
                    accept="image/*"
                    onChange={(event) => {
                      console.log(event.target.files[0]);
                      setImageUpload(event.target.files[0]);
                    }}
                    required
                  />

                  <br></br>
                  <br></br>
                  <input type="submit" />
                </form>
              </div>
            </div>
          )}
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
export default UploadImage;
