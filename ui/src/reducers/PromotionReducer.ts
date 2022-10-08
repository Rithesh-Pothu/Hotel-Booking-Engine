import type { PayloadAction } from "@reduxjs/toolkit";
import { createSlice } from "@reduxjs/toolkit";

// Define a type for the slice state
interface PromotionState {
  title: string,
  description: string,
  discountedPrice: number,
  promotionId?: number
}

// Define the initial state using that type
const initialState: PromotionState = {
  title: "",
  description: "",
  discountedPrice: 0,
  promotionId: 0
};

export const PromotionSlice = createSlice({
  name: "promotion",
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    addPromotion: (state, action: PayloadAction<PromotionState>) => {
      state = action.payload;
      return state;
    },
  },
});

export const { addPromotion } = PromotionSlice.actions;
export default PromotionSlice.reducer;