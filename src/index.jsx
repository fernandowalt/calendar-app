import ReactDom from "react-dom";
import { CalendarApp } from "./CalendarApp";
import { BrowserRouter } from "react-router-dom";
import './components/styles.css'

ReactDom.render(
  <BrowserRouter>
    <CalendarApp />
  </BrowserRouter>,

  document.getElementById("root")
);
