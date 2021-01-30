import React from "react";
import { connect } from "react-redux";
import TheLayout from "./containers/TheLayout";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Login from "./views/login/Login";

export const App = (props) => {
  // Get session data from sessionStorage
  let session = sessionStorage.getItem("session");
  // sessionStorage.setItem("session", "session");
  console.log("session", session);

  const LoggedIn = (
    <Router>
      <Switch>
        <Route path="/">
          <div className="App">
            <TheLayout />
          </div>
        </Route>
      </Switch>
    </Router>
  );

  return session === null ? <Login /> : LoggedIn;
};

const mapDispatchToProps = (dispatch) => {
  return {
    dispatch,
  };
};
const mapStateToProps = (state) => {
  return { posts: state.posts };
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
