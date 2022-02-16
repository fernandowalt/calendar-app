import React from "react";

export const Navbar = () => {
  return (
    <div className="navbar navbar-dark bg-dark mb-4">
      <span className="navbar-brand">Walter!!</span>

      <button className="btn btn-outline-danger">
        <i className="fas fa-sing-out-alt" />
        <samp> Salir</samp>
      </button>
    </div>
  );
};
