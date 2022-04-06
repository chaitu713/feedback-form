import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addUser } from "../redux/Users";
import Display from "./Display";

const MultimediaFeedback = () => {
  const dispatch = useDispatch();

  const [name, setName] = useState("");
  const [mobile, setMobile] = useState("");
  const [error, setError] = useState(null);

  const handleName = (e) => setName(e.target.value);
  const handleMobile = (e) => setMobile(e.target.value);

  const [selectedVideo, setSelectedVideo] = useState(null);
  const [view, setView] = useState(true);
  const [multimedia, setMultimedia] = useState("");

  const usersLength = useSelector((state) => state.users.length);

  const handleClick = (e) => {
    e.preventDefault();
    if (
      name.match(/^[A-Za-z_ ]{7,29}$/) &&
      mobile.match(/^[0-9]{10}$/) &&
      multimedia
    ) {
      dispatch(
        addUser({
          id: usersLength + 1,
          name,
          mobile,
          multimedia,
        })
      );
      setView(false);
      setError(null);
    } else if (!name && !mobile && !multimedia) {
      setError(alert("Fill in all the fields"));
    } else {
      if (!name.match(/^[A-Za-z_ ]{7,29}$/)) {
        alert("Name should be minimum of 7 chars and maximum of 29 chars...");
        setName("");
      }
      if (!mobile.match(/^[0-9]{10}$/)) {
        alert(
          "Mobile Number should be 10 chars of length and contain only numbers..."
        );
        setMobile("");
      }
      if (!multimedia) {
        alert("Upload the file...");
      }
    }
  };

  return (
    <div>
      {view ? (
        <div className="main">
          <h3 className="main-header">Feedback Form</h3>
          <form className="create-frm">
            <div className="first-frm">
              <label htmlFor="nameInput">Name</label>
              <input
                className="txtfield"
                type="text"
                placeholder="Enter Name..."
                id="nameInput"
                onChange={handleName}
                value={name}
                required
              />
              <br />
              <label htmlFor="telInput">Mobile</label>
              <input
                className="txtfield"
                type="tel"
                placeholder="Enter Mobile Number..."
                id="phone"
                onChange={handleMobile}
                value={mobile}
                maxLength={10}
                required
              />
              <br />
              <label htmlFor="multimedia">Feedback</label>
              <input
                id="video"
                type="file"
                accept="video/*, audio/*"
                onChange={(event) => {
                  setSelectedVideo(event.target.files[0]);
                  setMultimedia(URL.createObjectURL(event.target.files[0]));
                }}
              />

              <br />
              {error && error}
              <button className="button-24" onClick={handleClick}>
                Click here to Submit
              </button>
            </div>
          </form>
        </div>
      ) : (
        <Display format={selectedVideo?.type.split("/")[0]} />
      )}
    </div>
  );
};

export default MultimediaFeedback;
