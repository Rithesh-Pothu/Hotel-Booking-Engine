import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "../redux/store";

// Define a type for the slice state
interface ItineraryCardState {
  value: boolean;
}

// Define the initial state using that type
const initialState: ItineraryCardState = {
  value: false,
};

export const ItineraryVisibilitySlice = createSlice({
  name: "itineraryVisibility",
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    setItineraryVisibility: (state, action: PayloadAction<ItineraryCardState>) => {
      state = {...action.payload};
      return state;
    }
  },
});

export const { setItineraryVisibility } = ItineraryVisibilitySlice.actions;

// Other code such as selectors can use the imported `RootState` type
export const itineraryVisibility = (state: RootState) => state.itineraryVisibility.value;

export default ItineraryVisibilitySlice.reducer;