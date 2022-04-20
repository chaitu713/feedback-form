import React from "react";
import { useSelector } from "react-redux";

const Display = (props) => {
  const displayUsers = useSelector((state) => state.users);
  const { format } = props;
  return (
    <div>
      <h2 align="center">Users Feedback</h2>
      <div className="row">
        {displayUsers.map(({ id, name, mobile, feedback, multimedia }, i) => (
          <div className="column" key={i}>
            <div className="card">
              <h4>{name}</h4>
              <h5>{mobile}</h5>
              {feedback?.length > 0 && <p>{feedback}</p>}
              {multimedia?.length > 0 && format === "audio" && (
                <audio controls src={multimedia} />
              )}
              {multimedia?.length > 0 && format === "video" && (
                <div className="alert alert-success alert-dismissible">
                  <button type="button" className="close" data-dismiss="alert">
                    &times;
                  </button>
                  <video
                    className="vdo"
                    controls
                    src={multimedia}
                    width={"350px"}
                    height={"200px"}
                  />
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Display;
