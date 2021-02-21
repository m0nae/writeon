import React, {
  createContext,
  useContext,
  useReducer,
  useRef,
} from "react";

import { ModeContext } from "./ModeContext";
import { useInterval } from "../utils";

export const TimeLimitContext = createContext();

export function TimeLimitProvider(props) {
  const { toggledSwitches } = useContext(ModeContext);
  const initialState = {
    timeLimit: null,
    isCountdownActive: false,
    count: null,
  };

  const [state, timeLimitDispatch] = useReducer(reducer, initialState);

  function reducer(state, action) {
    const { type, payload } = action;
    return { ...state, [type]: payload };
  }

  const { timeLimit, isCountdownActive, count } = state;

  const numberInputRef = useRef();

  useInterval(() => {
    if (count <= 0 || !toggledSwitches.includes("timeLimitMode")) {
      timeLimitDispatch({ type: "isCountdownActive", payload: false });
    }
    if (!isCountdownActive || count <= 0) {
      return;
    }
    timeLimitDispatch({ type: "count", payload: count - 1 });
    console.log(count);
  }, 1000);

  function activateCountdown() {
    const value = numberInputRef.current.value;

    if (value <= 0) {
      return;
    }

    timeLimitDispatch({ type: "timeLimit", payload: value * 60 });
    timeLimitDispatch({ type: "count", payload: value * 60 + 1 });
    timeLimitDispatch({ type: "isCountdownActive", payload: true });
  }

  return (
    <TimeLimitContext.Provider
      value={{
        timeLimit: timeLimit,
        numberInputRef: numberInputRef,
        activateCountdown: activateCountdown,
        isCountdownActive: isCountdownActive,
        count: count,
        timeLimitDispatch: timeLimitDispatch,
      }}
    >
      {props.children}
    </TimeLimitContext.Provider>
  );
}
