import type { PayloadAction } from "@reduxjs/toolkit";
import { createSlice } from "@reduxjs/toolkit";
import type { RootState } from "../redux/store";

// Define a type for the slice state
interface EmailState {
    email: string;
}

// Define the initial state using that type
const initialState: EmailState = {
    email: "",
};

export const EmailSlice = createSlice({
    name: "beds",
    // `createSlice` will infer the state type from the `initialState` argument
    initialState,
    reducers: {
        updateEmail: (state, action: PayloadAction<string>) => {
            state.email = action.payload;
            return state;
        },
    },
});

export const { updateEmail } = EmailSlice.actions;

// Other code such as selectors can use the imported `RootState` type
export const email = (state: RootState) => state.email.email

export default EmailSlice.reducer;
