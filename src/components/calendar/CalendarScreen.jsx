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
import { setActive } from "../../actions/CalendarEvents";
import { AddNewFab } from "../Ui/AddNewFab";
import { DeleteEvent } from "../Ui/DeleteEvent";

const localizer = momentLocalizer(moment);

export const CalendarScreen = () => {
  const { events, activeEvent } = useSelector((state) => state.calendar);

  const [lastView, setLastView] = useState(
    localStorage.getItem("Lastview") || "month"
  );

  const dispatch = useDispatch();

  const onDoubleClick = (e) => {
    dispatch(startModal());
  };

  const onSelectEvent = (e) => {
    dispatch(setActive(e));
  };

  const onViewChange = (e) => {
    setLastView(e);
    localStorage.setItem("Lastview", e);
  };

  const [fechas, setfechas] = useState({ start: undefined, end: undefined });

  const onSelectSlot = ({ action, start, end }) => {
    if (action === "doubleClick") {
      setfechas({
        start: moment(start).minutes(0).seconds(0).add(1, "hours").toDate(),
        end: moment(end).minutes(0).seconds(0).add(2, "hours").toDate(),
      });
      dispatch(startModal());
    }
  };

  const eventStyleGetter = (event, start, end, isSelected) => {
    const style = {
      backgroundColor: "#3CD351",
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
        fechas={fechas}
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

      <CalendarModal startDate={fechas.start} endDate={fechas.end} />
    </div>
  );
};
