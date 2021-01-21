import React from "react";

function Dashboard() {
  return (
    <div>
      <p>Dashboard Page</p>
      <small>
        You are running this application in <b>{process.env.NODE_ENV}</b> mode.
      </small>
    </div>
  );
}

export default Dashboard;
