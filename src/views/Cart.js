import React, { useState } from "react";
import { connect } from "react-redux";

function Cart(props) {
  const [id, setId] = useState("");
  const [title, setTitle] = useState("");

  const handleSubmit = (evt) => {
    evt.preventDefault();
    props.dispatch({
      type: "ADD_POST",
      payload: { id: id, title: title },
    });
  };
  return (
    <form onSubmit={handleSubmit}>
      <label>
        ID:
        <input type="text" value={id} onChange={(e) => setId(e.target.value)} />
        <br />
        Title:
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <br />
      </label>
      <input type="submit" value="Submit" />
    </form>
  );
}

const mapDispatchToProps = (dispatch) => {
  return {
    dispatch,
  };
};

export default connect(null, mapDispatchToProps)(Cart);
