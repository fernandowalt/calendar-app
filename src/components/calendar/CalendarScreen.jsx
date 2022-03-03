import React, { useState } from "react";
import "react-big-calendar/lib/css/react-big-calendar.css";

import moment from "moment";
import "moment/locale/es";
import { Navbar } from "../Ui/Navbar";
import { Calendar, momentLocalizer } from "react-big-calendar";
import { messages } from "../../helpers/calendar-messages";
import { CalendarEvent } from "./CalendarEvent";
import { CalendarModal } from "./CalendarModal";
import { useDispatch, useSelector } from "react-redux";
import { startModal } from "../../actions/ui";
import { eventStartLoading, setActive } from "../../actions/CalendarEvents";
import { AddNewFab } from "../Ui/AddNewFab";
import { DeleteEvent } from "../Ui/DeleteEvent";
import { setStartDate, setendDate } from "../../actions/setters";
import { useEffect } from "react";

const localizer = momentLocalizer(moment);

export const CalendarScreen = () => {
  const { events, activeEvent } = useSelector((state) => state.calendar);
  const { uid } = useSelector((state) => state.auth);

  const [lastView, setLastView] = useState(
    localStorage.getItem("Lastview") || "month"
  );

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(eventStartLoading());
  }, [dispatch]);

  const onSelectEvent = (e) => {
    dispatch(setActive(e));
  };
  const onDoubleClick = (e) => {
    dispatch(startModal());
  };

  const onViewChange = (e) => {
    setLastView(e);
    localStorage.setItem("Lastview", e);
  };

  const onSelectSlot = ({ action, start, end }) => {
    if (action === "doubleClick") {
      const inicio = moment(start)
        .minutes(0)
        .seconds(0)
        .add(1, "hours")
        .toDate();
      const fin = moment(end).minutes(0).seconds(0).add(2, "hours").toDate();

      dispatch(setStartDate(inicio));
      dispatch(setendDate(fin));

      dispatch(startModal());
    }
  };

  const eventStyleGetter = (event, start, end, isSelected) => {
    const style = {
      backgroundColor: uid === event.user ? "#3CD351" : "#465660",
      borderRadius: "0px",
      opacity: 0.8,
      display: "block",
      color: "white",
    };
    return { style };
  };
  return (
    <div className="calendar-screen">
      <Navbar />
      <Calendar
        localizer={localizer}
        events={events}
        startAccessor="start"
        endAccessor="end"
        messages={messages}
        eventPropGetter={eventStyleGetter}
        components={{ event: CalendarEvent }}
        onDoubleClickEvent={onDoubleClick}
        onSelectSlot={onSelectSlot}
        selectable={true}
        onSelectEvent={onSelectEvent}
        onView={onViewChange}
        view={lastView}
      />
      <AddNewFab />
      {activeEvent && <DeleteEvent />}

      <CalendarModal />
    </div>
  );
};
