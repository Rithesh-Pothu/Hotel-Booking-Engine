import type { PayloadAction } from "@reduxjs/toolkit";
import { createSlice } from "@reduxjs/toolkit";
import type { RootState } from "../redux/store";

// Define a type for the slice state
interface PropertyState {
  value: string;
}

// Define the initial state using that type
const initialState: PropertyState = {
  value: "Property 3",
};

export const PropertyNameSlice = createSlice({
  name: "property_name",
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    selectProperty: (state, action: PayloadAction<string>) => {
      state.value = action.payload;
      return state;
    },
  },
});

export const { selectProperty } = PropertyNameSlice.actions;

// Other code such as selectors can use the imported `RootState` type
export const selectPropertyName = (state: RootState) =>
  state.propertyName.value;

export default PropertyNameSlice.reducer;
