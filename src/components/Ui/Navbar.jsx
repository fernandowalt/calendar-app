import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { startLogout } from "../../actions/auth";
import {
  eventClearActiveEvent,
  eventReset,
} from "../../actions/CalendarEvents";

export const Navbar = () => {
  const dispatch = useDispatch();

  const handleLogout = (e) => {
    e.preventDefault();
    dispatch(startLogout());
    dispatch(eventClearActiveEvent());
    dispatch(eventReset());
  };

  const { name } = useSelector((state) => state.auth);
  return (
    <div className="navbar navbar-dark bg-dark mb-4">
      <span className="navbar-brand">{name}</span>

      <button className="btn btn-outline-danger" onClick={handleLogout}>
        <i className="fas fa-sing-out-alt" />
        <samp> Salir</samp>
      </button>
    </div>
  );
};
