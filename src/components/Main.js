import React from "react";
import { useNavigate } from "react-router-dom";

const Main = () => {
  let navigate = useNavigate();
  const handleText = () => {
    navigate("/text");
  };
  const handleMultimedia = () => {
    navigate("/multi");
  };
  return (
    <div>
      <div className="row">
        <div className="column">
          <div className="card">
            <h1>To submit feedback in Text Form</h1>
            <br />
            <button className="button-67" onClick={handleText}>
              Click Here
            </button>
            <br />
          </div>
        </div>
        <div className="column">
          <div className="card">
            <h1>To submit feedback in Audio/Video Form</h1>
            <br />
            <button className="button-67" onClick={handleMultimedia}>
              Click Here
            </button>
            <br />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Main;
