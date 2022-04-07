import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addUser } from "../redux/Users";
import Display from "./Display";
import IconButton from "@mui/material/IconButton";
import MicRecorder from "mic-recorder-to-mp3";
import MicIcon from "@mui/icons-material/Mic";
import MicOffIcon from "@mui/icons-material/MicOff";
import RemoveCircleRoundedIcon from "@mui/icons-material/RemoveCircleRounded";

const Mp3Recorder = new MicRecorder({
  bitRate: 128,
});

const MultimediaFeedback = () => {
  const dispatch = useDispatch();

  const [name, setName] = useState("");
  const [mobile, setMobile] = useState("");
  const [error, setError] = useState(null);
  const [start, setStart] = useState(true);
  const [recording, setRecording] = useState(false);
  const [blobURL, setBlobURL] = useState("");
  const [blocked, setBlocked] = useState(false);

  const handleName = (e) => setName(e.target.value);
  const handleMobile = (e) => setMobile(e.target.value);

  const [selectedVideo, setSelectedVideo] = useState(null);
  const [view, setView] = useState(true);
  const [multimedia, setMultimedia] = useState("");

  const usersLength = useSelector((state) => state.users.length);

  const startAudio = () => {
    navigator.getUserMedia(
      { audio: true },
      () => {
        console.log("Permission Granted");
        setBlocked(false);
      },
      () => {
        console.log("Permission Denied");
        setBlocked(true);
      }
    );
    if (blocked) {
      console.log("Permission Denied");
    } else {
      setStart(false);
      Mp3Recorder.start()
        .then(() => {
          setRecording(true);
        })
        .catch((e) => console.log(e));
    }
  };

  const stopAudio = () => {
    setStart(true);
    Mp3Recorder.stop()
      .getMp3()
      .then(([buffer, blob]) => {
        console.log(blob);
        console.log(blobURL);
        console.log(recording);
        setBlobURL(URL.createObjectURL(blob));
        setRecording(false);
        setSelectedVideo(blob);
        setMultimedia(URL.createObjectURL(blob));
        alert("Audio Recorded Successfully...");
      })
      .catch((e) => console.log(e));
  };

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
    } else if (!name || !mobile || !multimedia) {
      setError(alert("Fill in all the fields"));
    } else {
      if (!name.match(/^[A-Za-z_ ]{7,29}$/)) {
        alert("Name should be minimum of 7 chars and maximum of 29 chars");
        setName("");
      }
      if (!mobile.match(/^[0-9]{10}$/)) {
        alert(
          "Mobile Number should be 10 chars of length and contain only numbers"
        );
        setMobile("");
      }
      // if (!multimedia) {
      //   alert("Please upload the file");
      // }
    }
  };

  return (
    <div>
      {view ? (
        <div className="main">
          <h3 className="main-header">Feedback Form</h3>
          <form className="create-frm">
            <div className="first-frm">
              <label htmlFor="nameInput">Name:</label>
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
              <label htmlFor="telInput">Mobile:</label>
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
              <div className="feed">
                <label htmlFor="multimedia">Feedback:</label>
              </div>

              <div className="audioo">
                <label htmlFor="multimedia">Record Audio</label>
                {start ? (
                  <div title="Start" className="startt">
                    <IconButton color="success">
                      <MicIcon onClick={startAudio} />
                    </IconButton>
                  </div>
                ) : (
                  <div title="Stop" className="stopp">
                    <IconButton color="error">
                      <MicOffIcon onClick={stopAudio} />
                    </IconButton>
                  </div>
                )}
              </div>
              <h4 align="center" className="or">
                OR
              </h4>
              <div className="videoo">
                <label htmlFor="multimedia">Upload Video</label>
                <input
                  className="filee"
                  id="video"
                  type="file"
                  accept="video/*"
                  onChange={(event) => {
                    setSelectedVideo(event.target.files[0]);
                    setMultimedia(URL.createObjectURL(event.target.files[0]));
                  }}
                />
              </div>
              <br />
              <div title="Remove" className="removee">
                <label>Remove File</label>
                <IconButton color="error">
                  <RemoveCircleRoundedIcon
                    fontSize="large"
                    className="btn"
                    onClick={() => {
                      setSelectedVideo(null);
                      setMultimedia("");
                      if (multimedia) {
                        alert("File removed successfully");
                      } else {
                        alert("No files to remove");
                      }
                    }}
                  />
                </IconButton>
              </div>

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
