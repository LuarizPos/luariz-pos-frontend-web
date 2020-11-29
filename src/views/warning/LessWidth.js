import React from "react";
// import SVGImage from "../../svg/undraw_Mobile_app_p3ts.svg";
import { ReactComponent as SVGImage } from "../../svg/not_enough_width.svg";

function LessWidth() {
  const centerDiv = {
    position: "absolute",
    left: "50%",
    top: "50%",
    transform: "translate(-50%, -50%)",
    textAlign: "text-center",
  };
  return (
    <div style={centerDiv}>
      {alert("Your device is not enough width.")}
      <SVGImage width="100%" height="100%" />
    </div>
  );
}

export default LessWidth;
