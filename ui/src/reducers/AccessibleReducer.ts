import { createSlice } from "@reduxjs/toolkit";
import type { RootState } from "../redux/store";

// Define a type for the slice state
interface AccessibleCheckState {
  value: boolean;
}

// Define the initial state using that type
const initialState: AccessibleCheckState = {
  value: false,
};

export const AccessibilityCheckSlice = createSlice({
  name: "accessibleCheck",
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    updateAccessibility: (state) => {
      state.value = !state.value;
      return state;
    },
  },
});

export const { updateAccessibility } = AccessibilityCheckSlice.actions;

// Other code such as selectors can use the imported `RootState` type
export const isAccessibleValue = (state: RootState) => state.isAccessible.value;

export default AccessibilityCheckSlice.reducer;
