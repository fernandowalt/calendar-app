import Modal from "react-modal";
import DateTimePicker from "react-datetime-picker";
import moment from "moment";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { modalClose } from "../../actions/ui";

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

const initEvent = {
  title: "",
  note: "",
  start: now.toDate(),
  end: nowEnd.toDate(),
};

export const CalendarModal = (props) => {
  const { startDate, endDate } = { ...props };

  const { modalOpen } = useSelector((state) => state.ui);
  const { activeEvent } = useSelector((state) => state.calendar);

  const [dateStart, setDateStart] = useState(now.toDate());

  const [dateEnd, setdateEnd] = useState(nowEnd.toDate());

  const [titleValid, settitleValid] = useState(true);

  const [formValues, setFormValues] = useState(initEvent);

  const { notes, title, start, end } = formValues;

  useEffect(() => {
    if (activeEvent) {
      setFormValues(activeEvent);
    } else {
      setFormValues(initEvent);
    }
  }, [activeEvent, setFormValues]);

  const dispatch = useDispatch();

  const closeModal = () => {
    dispatch(modalClose());
    dispatch(eventClearActiveEvent());
    setFormValues(initEvent);
  };

  const handleStartDateChange = (e) => {
    setDateStart(end);
    setFormValues({
      ...formValues,
      start: e,
    });
  };

  const handleEndDateChange = (e) => {
    setdateEnd(e);
    setFormValues({
      ...formValues,
      end: e,
    });
  };

  const handleInputChange = ({ target }) => {
    setFormValues({
      ...formValues,
      [target.name]: target.value,
    });
  };

  const handleSubmitForm = (e) => {
    e.preventDefault();

    handleStartDateChange();
    handleEndDateChange();

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
      dispatch(eventUpdateActive(formValues));
      dispatch(eventClearActiveEvent());
    } else {
      dispatch(
        eventAddNew({
          ...formValues,
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
            value={props.startDate !== undefined ? startDate : dateStart}
            className="form-control react-dateime-picker react-dateime-picker__wrapper "
          />
        </div>

        <div className="form-group">
          <label>Fecha y hora fin</label>
          <DateTimePicker
            onChange={handleEndDateChange}
            value={props.endDate !== undefined ? endDate : dateEnd}
            minDate={dateStart}
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
            value={title}
            onChange={handleInputChange}
          />
        </div>

        <div className="form-group">
          <textarea
            type="text"
            className={`form-control is-invalid ${!titleValid && "is-invalid"}`}
            placeholder="Notas"
            rows="5"
            name="notes"
            value={notes}
            onChange={handleInputChange}
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
