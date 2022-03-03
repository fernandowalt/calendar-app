import React from "react";
import { useDispatch } from "react-redux";
import { eventStartDelete} from "../../actions/CalendarEvents";

export const DeleteEvent = () => {
  const dispatch = useDispatch();

  const handleDelete = () => {
    dispatch(eventStartDelete());

  };

  return (
    <button className="btn btn-danger fab-danger" onClick={handleDelete}>
      <i className="fas fa-trash"></i>
      <span>Borrar evento</span>
    </button>
  );
};
