import React from "react";
import { CircularProgress } from "@material-ui/core";
import { Label } from "reactstrap";

function LoadingData() {
  return (
    <div className="loading-data">
      <div className="d-flex align-items-center">
        <CircularProgress />
        <Label className="mb-0 ml-2" style={{ fontSize: "2em" }}>
          Loading data...
        </Label>
      </div>
    </div>
  );
}

export default LoadingData;
