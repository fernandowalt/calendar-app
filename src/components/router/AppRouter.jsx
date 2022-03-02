import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Routes, Route } from "react-router-dom";
import { startChecking } from "../../actions/auth";
import { LoginScreen } from "../auth/LoginScreen";
import { CalendarScreen } from "../calendar/CalendarScreen";
import { PrivateRoute } from "./PrivateRoute";
import { PublicRoute } from "./PublicRoute";

export const AppRouter = () => {
  const dispatch = useDispatch();
  const { uid, checking } = useSelector((state) => state.auth);

  useEffect(() => {
    dispatch(startChecking());
  }, [dispatch]);

  if (checking) {
    return(<h5>Espere...</h5>)
    
  }

  return (
    <Routes>
      <Route
        exact
        path="/login"
        element={
          <PublicRoute uid={uid}>
            <LoginScreen />
          </PublicRoute>
        }
      />
      <Route
        exact
        path="/"
        element={
          <PrivateRoute uid={uid}>
            <CalendarScreen />
          </PrivateRoute>
        }
      />
    </Routes>
  );
};
