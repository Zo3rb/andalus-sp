import React from "react";
import ReactDOM from "react-dom";
import App from "./App";

// Adding The Bootstrap & Modification Files for CSS Styling
import "bootstrap/dist/css/bootstrap.min.css";
import "./bootstrap.min.css";
import "./index.css";

// Getting The Redux Store & Adding it
import { Provider } from 'react-redux';
import store from './redux/store';

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById("root")
);
