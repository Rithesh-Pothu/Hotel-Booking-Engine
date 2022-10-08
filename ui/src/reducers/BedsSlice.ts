import type { PayloadAction } from "@reduxjs/toolkit";
import { createSlice } from "@reduxjs/toolkit";
import type { RootState } from "../redux/store";

// Define a type for the slice state
interface BedState {
  value: string;
}

// Define the initial state using that type
const initialState: BedState = {
  value: "1",
};

export const BedsSlice = createSlice({
  name: "beds",
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    selectBeds: (state, action: PayloadAction<string>) => {
      state.value = action.payload;
      return state;
    },
  },
});

export const { selectBeds } = BedsSlice.actions;

// Other code such as selectors can use the imported `RootState` type
export const roomsValue = (state: RootState) => state.beds.value;

export default BedsSlice.reducer;
