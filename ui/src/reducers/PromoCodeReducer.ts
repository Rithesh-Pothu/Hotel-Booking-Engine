import type { PayloadAction } from "@reduxjs/toolkit";
import { createSlice } from "@reduxjs/toolkit";
import type { RootState } from "../redux/store";

// Define a type for the slice state
interface PromoCodeState {
  value: string;
}

// Define the initial state using that type
const initialState: PromoCodeState = {
  value: "",
};

export const PromoCodeSlice = createSlice({
  name: "promo_code",
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    addPromoCode: (state, action: PayloadAction<string>) => {
      state.value = action.payload;
      return state;
    },
  },
});

export const { addPromoCode } = PromoCodeSlice.actions;

// Other code such as selectors can use the imported `RootState` type
export const selectPropertyName = (state: RootState) =>
  state.propertyName.value;

export default PromoCodeSlice.reducer;
