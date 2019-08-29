import React from "react";
import ReactDOM from "react-dom";
import { createStore, applyMiddleware } from "redux";
import { createEpicMiddleware } from "redux-observable";
import { pingReducer, ping } from "./pingReducer";
import "./styles.css";
import { pingEpic } from "./pingReducer";
const epicMiddleWare = createEpicMiddleware();
const store = createStore(pingReducer, applyMiddleware(epicMiddleWare));

epicMiddleWare.run(pingEpic);

function App() {
  let { isPinging } = store.getState();
  let str = "pingrfwerwe" + isPinging;
  debugger;
  return (
    <div className="App">
      <h1>is pinging: {str}</h1>
      <button
        onClick={() => {
          store.dispatch(ping());
        }}
      >
        Start PING
      </button>
    </div>
  );
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
store.subscribe(() => {
  ReactDOM.render(<App />, rootElement);
});
