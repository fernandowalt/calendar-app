import React from "react";
import { Routes, Route } from "react-router-dom";
import { LoginScreen } from "../auth/LoginScreen";
import { CalendarScreen } from "../calendar/CalendarScreen";

export const AppRouter = () => {
  return (
    <Routes>
      <Route exact path="/login" element={<LoginScreen />} />
      <Route exact path="/" element={<CalendarScreen />} />
   
    </Routes>
  );
};
