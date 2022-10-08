import type { PayloadAction } from "@reduxjs/toolkit";
import { createSlice } from "@reduxjs/toolkit";
import type { RootState } from "../redux/store";

// Define a type for the slice state
interface RoomState {
  value: string;
  room_type_id: number,
  room_type: string
}

// Define the initial state using that type
const initialState: RoomState = {
  value: "1",
  room_type_id: 13,
  room_type: "SUPER_DELUXE"
};

export const RoomsSlice = createSlice({
  name: "rooms",
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    selectRooms: (state, action: PayloadAction<string>) => {
      state.value = action.payload;
      return state;
    },

    setRoomTypeId: (state, action: PayloadAction<number>) => {
      state.room_type_id = action.payload;
      return state;
    },

    setRoomType: (state, action: PayloadAction<string>) => {
      state.room_type = action.payload;
      return state;
    }

  },
});

export const { selectRooms, setRoomTypeId, setRoomType } = RoomsSlice.actions;

// Other code such as selectors can use the imported `RootState` type
export const roomsValue = (state: RootState) => state.rooms.value;

export default RoomsSlice.reducer;
