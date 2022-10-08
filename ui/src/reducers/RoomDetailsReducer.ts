import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export interface Tax {
    name: string
    percent: number
}

export interface Fee {
    name: string
    amount: number
}

export interface FeeTax {
    fees: Fee[],
    taxes: Tax[],
    vat: number,
    lengthOfStay: number
}

export interface RoomType {
    roomType: string,
    price: number,
    ratesInRange: {}
}

export interface SelectedRoomPlanState {
    roomType: string,
    price: number,
    amountDueAtProperty: number,
    amountDueNow: number,
    fees: Fee[],
    taxes: Tax[],
    totalAfterTax: number,
    totalBeforeTax: number,
    ratesInRange: {},
    lengthOfStay: number,
    totalTax: number,
    vat: number
}
    
const initialState: SelectedRoomPlanState = {
    roomType: "",
    price: 0,
    amountDueAtProperty: 0,
    amountDueNow: 0,
    fees: [],
    taxes: [],
    totalAfterTax: 0,
    totalBeforeTax: 0,
    ratesInRange: {},
    lengthOfStay: 0,
    totalTax: 0,
    vat: 0
}

const roundToTwo = (val: number) => Math.round(val * 100.0)/100.0;

export const RoomDetailsSlice = createSlice({
    name: "roomPlanRate",
    // `createSlice` will infer the state type from the `initialState` argument
    initialState,
    reducers: {
      addRoomRatePlan: (state, action: PayloadAction<SelectedRoomPlanState>) => {
        state = {...action.payload};
        return state;
      },
      addFeeTax: (state, action: PayloadAction<FeeTax>) => {
        const rates = action.payload;
        state = {...state, ...rates}
        return state;
      },
      addRoomType: (state, action: PayloadAction<RoomType>) => {
        const newState = action.payload
        const subTotal = roundToTwo(newState.price * state.lengthOfStay);
        const vatPrice = roundToTwo(state.vat*subTotal/100);
        const totalTax = roundToTwo(state.taxes.map((item)=>item.percent).reduce((a,b)=> a+b, 0) * state.lengthOfStay);
        const totalFee = state.fees.map((item)=>item.amount).reduce((a,b)=> a+b, 0) * state.lengthOfStay;
        const totalAfterTax = roundToTwo(totalTax+subTotal+vatPrice);
        const dueNow = roundToTwo((totalAfterTax+totalFee)/state.lengthOfStay)/2;
        const amountDueAtProperty = roundToTwo(totalAfterTax-dueNow);
        const tempState = {
            amountDueNow: dueNow,
            amountDueAtProperty: amountDueAtProperty,
            totalAfterTax: totalAfterTax,
            totalBeforeTax: subTotal,
            totalTax: totalTax,
            vat: vatPrice,
            roomType: newState.roomType,
            price: newState.price,
            ratesInRange: newState.ratesInRange
        }
        state = {...state,...tempState};
        return state;
      },
    },
  });
  
export const { addRoomRatePlan, addFeeTax, addRoomType } = RoomDetailsSlice.actions;  
export default RoomDetailsSlice.reducer;