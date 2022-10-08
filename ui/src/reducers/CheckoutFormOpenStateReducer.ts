import type { PayloadAction } from "@reduxjs/toolkit";
import { createSlice } from "@reduxjs/toolkit";
import type { RootState } from "../redux/store";

// Define a type for the slice state
interface CheckoutFormOpenState {
  openTravellerInfo: boolean;
  openBillingInfo: boolean;
  openPaymentInfo: boolean;
}

// Define the initial state using that type
const initialState: CheckoutFormOpenState = {
  openTravellerInfo: true,
  openBillingInfo: false,
  openPaymentInfo: false,
};

export const CheckoutFormOpenStateSlice = createSlice({
  name: "checkOutForms",
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    setOpenTravellerInfo: (state, action: PayloadAction<boolean>) => {
      state.openTravellerInfo = action.payload;
      return state;
    },
    setOpenBillingInfo: (state, action: PayloadAction<boolean>) => {
      state.openBillingInfo = action.payload;
      return state;
    },
    setOpenPaymentInfo: (state, action: PayloadAction<boolean>) => {
      state.openPaymentInfo = action.payload;
      return state;
    },
  },
});

export const { setOpenTravellerInfo, setOpenBillingInfo, setOpenPaymentInfo } =
  CheckoutFormOpenStateSlice.actions;

// Other code such as selectors can use the imported `RootState` type
export const getOpenTravellerInfo = (state: RootState) =>
  state.checkOutForms.openTravellerInfo;
export const getOpenBillingInfo = (state: RootState) =>
  state.checkOutForms.openBillingInfo;
export const getOpenPaymentInfo = (state: RootState) =>
  state.checkOutForms.openPaymentInfo;

export default CheckoutFormOpenStateSlice.reducer;
