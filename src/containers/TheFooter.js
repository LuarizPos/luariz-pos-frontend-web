import React from "react";

function TheFooter() {
  return (
    <footer className="bg-light p-2 text-center text-muted">
      LuarizPOS © {new Date().getFullYear()}
    </footer>
  );
}

export default TheFooter;
