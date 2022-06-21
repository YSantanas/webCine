import React from "react";
import ReactDOM from "react-dom";
import "bootstrap/dist/css/bootstrap.css";
import "./components/styles/global.css";

import BadgeNew from "./pages/BadgeNew.js";

const contenedor = document.getElementById("app");

// ReactDOM.render(__qué__, __dónde__);
ReactDOM.render(<BadgeNew />, contenedor);
