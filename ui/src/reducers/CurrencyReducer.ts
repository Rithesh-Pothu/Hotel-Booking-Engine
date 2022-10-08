import type { PayloadAction } from "@reduxjs/toolkit";
import { createSlice } from "@reduxjs/toolkit";
import type { RootState } from "../redux/store";

// Define a type for the slice state
interface CurrencyState {
  value: string;
}

// Define the initial state using that type
const initialState: CurrencyState = {
  value: "USD",
};

export const CurrencySlice = createSlice({
  name: "currency",
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    selectCurrency: (state, action: PayloadAction<string>) => {
      state.value = action.payload;
      return state;
    },
  },
});

export const { selectCurrency } = CurrencySlice.actions;

// Other code such as selectors can use the imported `RootState` type
export const getCurrencyValue = (state: RootState) => state.currency.value;

export default CurrencySlice.reducer;
