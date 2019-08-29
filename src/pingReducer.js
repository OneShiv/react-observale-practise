import { delay, mapTo } from "rxjs/operators";
import { ofType } from "redux-observable";
const PING = "PING";
const PONG = "PONG";

export const ping = () => ({
  type: "PING"
});

export const pong = () => ({
  type: "PONG"
});

export const pingEpic = action$ => {
  return action$.pipe(
    ofType(PING),
    delay(3000),
    mapTo(pong())
  );
};

export const pingReducer = (
  state = {
    isPinging: false
  },
  action
) => {
  switch (action.type) {
    case PING: {
      return {
        isPinging: true
      };
    }
    case PONG:
      return {
        isPinging: false
      };
    default:
      return state;
  }
};
