import { createSlice } from "@reduxjs/toolkit";

export interface GuestState {
  adultsCount: number;
  teensCount: number;
  kidsCount: number;
  totalCount: number;
}

const initialState: GuestState = {
  adultsCount: 1,
  teensCount: 0,
  kidsCount: 0,
  totalCount: 1,
};

export const GuestSlice = createSlice({
  name: "guests",
  initialState,
  reducers: {
    incrementAdult: (state) => {
      if (state.totalCount < 4) {
        state.adultsCount += 1;
        state.totalCount += 1;
      }
      return state;
    },
    decrementAdult: (state) => {
      if (state.totalCount > 1 && state.adultsCount > 1) {
        state.adultsCount -= 1;
        state.totalCount -= 1;
      }
      return state;
    },
    incrementTeens: (state) => {
      if (state.totalCount < 4) {
        state.teensCount += 1;
        state.totalCount += 1;
      }
      return state;
    },
    decrementTeens: (state) => {
      if (state.totalCount > 0 && state.teensCount > 0) {
        state.teensCount -= 1;
        state.totalCount -= 1;
      }
      return state;
    },
    incrementKids: (state) => {
      if (state.totalCount < 4) {
        state.kidsCount += 1;
        state.totalCount += 1;
      }
      return state;
    },
    decrementKids: (state) => {
      if (state.totalCount > 0 && state.kidsCount > 0) {
        state.kidsCount -= 1;
        state.totalCount -= 1;
      }
      return state;
    },
    // incrementByAmount: (state, action: PayloadAction<number>) => {
    //   state.value += action.payload
    // },
  },
});

// Action creators are generated for each case reducer function
export const {
  incrementAdult,
  decrementAdult,
  incrementTeens,
  decrementTeens,
  incrementKids,
  decrementKids,
} = GuestSlice.actions;

export default GuestSlice.reducer;
