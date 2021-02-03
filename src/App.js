import React from "react";
import { connect } from "react-redux";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import TheLayout from "./containers/TheLayout";
import NotLoggedInLayout from "./views/login/NotLoggedInLayout";

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

  const NotLoggedIn = (
    <Router>
      <Switch>
        <Route path="/">
          <div className="App">
            <NotLoggedInLayout />
          </div>
        </Route>
      </Switch>
    </Router>
  );

  return session === null ? NotLoggedIn : LoggedIn;
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
