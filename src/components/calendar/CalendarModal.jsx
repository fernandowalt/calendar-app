import Modal from "react-modal";
import DateTimePicker from "react-datetime-picker";
import moment from "moment";
import { useState } from "react";
import Swal from "sweetalert2";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { modalClose } from "../../actions/ui";
import {
  setStartDate,
  setendDate,
  setTitle,
  setNotes,
  reset,
} from "../../actions/setters";

import {
  eventAddNew,
  eventClearActiveEvent,
  eventUpdateActive,
} from "../../actions/CalendarEvents";

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
const now = moment().minutes(0).seconds(0).add(1, "hours");

const nowEnd = now.clone().add(1, "hours");

export const CalendarModal = () => {
  const { modalOpen } = useSelector((state) => state.ui);
  const { activeEvent } = useSelector((state) => state.calendar);
  const { setting } = useSelector((state) => state);
  const { start, end, title, notes } = useSelector((state) => state.setting);

  const [dateStart, setDateStart] = useState(now.toDate());

  const [dateEnd, setdateEnd] = useState(nowEnd.toDate());

  const [titleValid, settitleValid] = useState(true);

  const dispatch = useDispatch();

  const closeModal = () => {
    dispatch(modalClose());
    dispatch(eventClearActiveEvent());
  };

  const handleStartDateChange = (e) => {
    setDateStart(e);
    dispatch(setStartDate(e));
  };

  const handleEndDateChange = (e) => {
    setdateEnd(e);
    dispatch(setendDate(e));
  };

  const handleInputChangeTitle = ({ target }) => {
    dispatch(setTitle(target.value));
  };

  const handleInputChangeNotes = ({ target }) => {
    dispatch(setNotes(target.value));
  };

  const handleSubmitForm = (e) => {
    e.preventDefault();

    const momentStart = moment(start);
    const momentEnd = moment(end);

    if (momentStart.isSameOrAfter(momentEnd)) {
      return Swal.fire(
        "error",
        "fecha y hora fin debe ser mayor a fecha hora inicio",
        "error"
      );
    }

    if (title.trim().length < 2) {
      return settitleValid(false);
    }

    if (activeEvent) {
      dispatch(eventUpdateActive(setting));
      dispatch(eventClearActiveEvent());
    } else {
      dispatch(
        eventAddNew({
          ...setting,
          id: new Date().getTime(),
          user: {
            _id: "3251",
            name: "waltoor",
          },
        })
      );
    }

    settitleValid(true);

    dispatch(modalClose());
    dispatch(reset());
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
            value={start !== undefined ? start : dateStart}
            name="dataStart"
            className="form-control react-dateime-picker react-dateime-picker__wrapper "
          />
        </div>

        <div className="form-group">
          <label>Fecha y hora fin</label>
          <DateTimePicker
            onChange={handleEndDateChange}
            value={end !== undefined ? end : dateEnd}
            minDate={dateStart}
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
