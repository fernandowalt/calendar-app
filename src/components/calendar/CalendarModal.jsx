import Modal from "react-modal";
import DateTimePicker from "react-datetime-picker";
import moment from "moment";
import { useEffect, useState } from "react";
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
  userSelected,
} from "../../actions/setters";

import {
  eventClearActiveEvent,
  eventStartAddNew,
  eventStartUpdate,
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

export const CalendarModal = () => {
  const dispatch = useDispatch();
  const { modalOpen } = useSelector((state) => state.ui);

  const { activeEvent } = useSelector((state) => state.calendar);

  const { init } = useSelector((state) => state.setting);

  const { start, end, title, notes } = useSelector(
    (state) => state.setting.init
  );

  const [titleValid, settitleValid] = useState(true);

  useEffect(() => {
    if (activeEvent) {
      dispatch(userSelected(activeEvent));
    }
  }, [activeEvent, dispatch]);

  const closeModal = () => {
    dispatch(modalClose());
    dispatch(eventClearActiveEvent());
    dispatch(reset());
  };

  const handleStartDateChange = (e) => {
    dispatch(setStartDate(e));
  };

  const handleEndDateChange = (e) => {
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

    const momentStart = moment(activeEvent ? activeEvent.start : start);
    const momentEnd = moment(activeEvent ? activeEvent.end : end);

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
      dispatch(eventStartUpdate(init));
      dispatch(eventClearActiveEvent());
      dispatch(reset());
    } else {
      dispatch(
        eventStartAddNew({
          ...init,
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
            value={activeEvent ? activeEvent.start : start}
            name="dataStart"
            className="form-control react-dateime-picker react-dateime-picker__wrapper "
          />
        </div>

        <div className="form-group">
          <label>Fecha y hora fin</label>
          <DateTimePicker
            onChange={handleEndDateChange}
            value={activeEvent ? activeEvent.end : end}
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
            defaultValue={activeEvent ? activeEvent.title : title}
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
            defaultValue={activeEvent ? activeEvent.notes : notes}
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
