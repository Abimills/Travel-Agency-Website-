import React from "react";
import ClipLoader from "react-spinners/ClipLoader";
import "./Loading.css";

const Loading = () => {
  return (
    <div className="loading">
      <ClipLoader
        color={"white"}
        size={80}
        aria-label="Loading Spinner"
      />
    </div>
  );
};

export default Loading;
