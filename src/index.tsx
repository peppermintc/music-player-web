import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import createMockServer from "./mockServer/createMockServer";
import { applyMiddleware, createStore, Store } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import { Provider } from "react-redux";
import ReduxThunk from "redux-thunk";
import rootReducer from "./modules";

export const store: Store = createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(ReduxThunk))
);

createMockServer();

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById("root") || document.createElement("div")
);
