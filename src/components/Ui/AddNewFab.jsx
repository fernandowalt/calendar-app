import React from "react";
import { useDispatch } from "react-redux";
import { startModal } from "../../actions/ui";

export const AddNewFab = () => {
  const dispatch = useDispatch();

  const openModal = () => {
    dispatch(startModal());
  };
  return (
    <button className="btn btn bg-primary fab" onClick={openModal}>
      <i className="fas fa-plus"></i>
    </button>
  );
};
