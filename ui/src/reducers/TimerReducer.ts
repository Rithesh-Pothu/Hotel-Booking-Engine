import { createSlice } from "@reduxjs/toolkit";
import type { RootState } from "../redux/store";

// Define a type for the slice state
interface TimerCompletedState {
  checkOutTime: Date
  value: boolean
}

// Define the initial state using that type
const initialState: TimerCompletedState = {
  value: true,
  checkOutTime: new Date()
};

export const TimerSlice = createSlice({
  name: "timerSlice",
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    changeCompleted: (state) => {
      state.value = !state.value;
      return state;
    },
    setCheckOutTime: (state) => {
      state = {...state, checkOutTime: new Date(Date.now())};
      return state;
    }
  },
});

export const { changeCompleted, setCheckOutTime } = TimerSlice.actions;

// Other code such as selectors can use the imported `RootState` type
export const isTimerCompleted = (state: RootState) => state.isTimerCompleted;

export default TimerSlice.reducer;