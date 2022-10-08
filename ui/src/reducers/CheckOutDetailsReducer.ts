import type { PayloadAction } from "@reduxjs/toolkit";
import { createSlice } from "@reduxjs/toolkit";
import type { RootState } from "../redux/store";

// Define a type for the slice state
interface CheckOutDetailsState {
  timeOutValue: string,
  supportHours: string,
  emailMarketingSignupText: string
  supportPhone: string,
  checkoutSuperTerms: string
}

// Define the initial state using that type
const initialState: CheckOutDetailsState = {
  timeOutValue: "",
  supportHours: "",
  emailMarketingSignupText: "",
  supportPhone: "",
  checkoutSuperTerms: ""
};

export const CheckOutDetailsSlice = createSlice({
  name: "checkOutPage",
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    addCheckOutDetails: (state, action: PayloadAction<CheckOutDetailsState>) => {
      state = action.payload;
      return state;
    },
  },
});

export const { addCheckOutDetails } = CheckOutDetailsSlice.actions;
// Other code such as selectors can use the imported `RootState` type
export const isAccessibleValue = (state: RootState) => state.isAccessible.value;
export default CheckOutDetailsSlice.reducer;