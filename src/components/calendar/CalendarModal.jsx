import Modal from "react-modal";
import DateTimePicker from "react-datetime-picker";
import moment from "moment";
import { useState } from "react";
import Swal from "sweetalert2";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { modalClose } from "../../actions/ui";

import {
  eventClearActiveEvent,
  eventStartAddNew,
  eventStartUpdate,
} from "../../actions/CalendarEvents";
import { useEffect } from "react";

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
  },
};

Modal.setAppElement("#root");

export const CalendarModal = () => {
  const { modalOpen } = useSelector((state) => state.ui);
  const { activeEvent } = useSelector((state) => state.calendar);
  const dispatch = useDispatch();

  const [values, setvalues] = useState({
    start: new Date(),
    end: new Date(),
    title: "",
    notes: "",
  });
  useEffect(() => {
    if (activeEvent) {
      setvalues({ ...activeEvent });
    }
  }, [activeEvent]);

  const { start, end, title, notes } = values;

  const [titleValid, settitleValid] = useState(true);

  const closeModal = () => {
    dispatch(modalClose());
    dispatch(eventClearActiveEvent());
  };

  const handleStartDateChange = (e) => {
    setvalues({ ...values, start: e });
  };

  const handleEndDateChange = (e) => {
    console.log(values);
    setvalues({ ...values, end: e });
  };

  const handleInputChangeTitle = ({ target }) => {
    console.log(values);
    setvalues({ ...values, title: target.value });
  };

  const handleInputChangeNotes = ({ target }) => {
    console.log(values);
    setvalues({ ...values, notes: target.value });
  };

  const handleSubmitForm = (e) => {
    e.preventDefault();

    if (activeEvent) {
      dispatch(eventStartUpdate(activeEvent, values));
    } else {
      dispatch(
        eventStartAddNew({
          ...values,
        })
      );
    }

    settitleValid(true);

    dispatch(modalClose());
    dispatch(eventClearActiveEvent());
  };

  return (
    <Modal
      className="modal"
      isOpen={modalOpen}
      //   onAfterOpen={afterOpenModal}
      onRequestClose={closeModal}
      style={customStyles}
      overlayClassName="modal-fondo"
      closeTimeoutMS={300}
    >
      <form className="container" onSubmit={handleSubmitForm}>
        <br />
        <div className="form-group">
          <label>Fecha y hora inicio</label>
          <DateTimePicker
            onChange={handleStartDateChange}
            value={start}
            name="dataStart"
            className="form-control react-dateime-picker react-dateime-picker__wrapper "
          />
        </div>

        <div className="form-group">
          <label>Fecha y hora fin</label>
          <DateTimePicker
            onChange={handleEndDateChange}
            value={end}
            name="dateEnd"
            className="form-control react-dateime-picker react-dateime-picker__wrapper "
          />
        </div>

        <div className="form-group">
          <label>Titulo y notas</label>
          <input
            type="text"
            className={`form-control is-invalid ${!titleValid && "is-invalid"}`}
            placeholder="Título del evento"
            name="title"
            autoComplete="off"
            defaultValue={title}
            onChange={handleInputChangeTitle}
          />
        </div>

        <div className="form-group">
          <textarea
            type="text"
            className={`form-control is-invalid ${!titleValid && "is-invalid"}`}
            placeholder="Notas"
            rows="5"
            name="notes"
            defaultValue={notes}
            onChange={handleInputChangeNotes}
          ></textarea>
        </div>

        <button type="submit" className="btn btn-outline-primary btn-block">
          <i className="far fa-save"></i>
          <span> Guardar</span>
        </button>
      </form>
    </Modal>
  );
};
