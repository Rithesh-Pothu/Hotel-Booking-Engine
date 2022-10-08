import type { PayloadAction } from "@reduxjs/toolkit";
import { createSlice } from "@reduxjs/toolkit";
import { addDays } from "date-fns";


// Define a type for the slice state
interface DateRangeState {
  startDate: Date;
  endDate: Date;
  key: string;
}

// Define the initial state using that type
const initialState: DateRangeState[] = [
  {
    startDate: new Date(),
    endDate: addDays(new Date(), 1),
    key: "selection",
  },
];

export const DateRangeSlice = createSlice({
  name: "date_range",
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    updateRange: (state, action: PayloadAction<any>) => {
      state[0] = action.payload;
      return state;
    },
  },
});

export const { updateRange } = DateRangeSlice.actions;

// Other code such as selectors can use the imported `RootState` type
// export const current_date_range = (state: RootState) => state.daterange[0];

export default DateRangeSlice.reducer;
