import React from "react";
import { connect } from "react-redux";
import TheLayout from "./containers/TheLayout";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

export const App = (props) => {
  return (
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
