import type { PayloadAction } from "@reduxjs/toolkit";
import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../redux/store";

import { TravellerInfoState } from "../pages/checkOutPage/TravellerInfo";

export interface PaymentInfoState {
  cardNumber: string;
  expiryMonth: string;
  expiryYear: string;
  cvvCode: string;
}

export interface BillingInfoState {
  firstName: string;
  lastName: string;
  mailingAddress1: string;
  mailingAddress2: string;
  country: string;
  city: string;
  state: string;
  zip: string;
  phone: string;
  email: string;
}

export interface CreateBookingProps {
  check_in_date: string,
  check_out_date: string,
  amount_due_at_resort: number,
  adult_count: number,
  child_count: number,
  promotion_id?: number,
  property_id: number,
  status_id: number,
  total_cost: number,
  room_type_id: number,
  room_type: string,
  rooms: string
}

const billingInfo: BillingInfoState = {
  firstName: "",
  lastName: "",
  mailingAddress1: "",
  mailingAddress2: "",
  country: "",
  city: "",
  state: "",
  zip: "",
  phone: "",
  email: "",
};

const paymentInfo: PaymentInfoState = {
  cardNumber: "",
  expiryMonth: "",
  expiryYear: "",
  cvvCode: "",
};

const travellerInfo: TravellerInfoState = {
  firstName: "",
  lastName: "",
  phone: "",
  email: "",
  // canSendSpecialOffers: false,
};

const createBookingProps: CreateBookingProps = {
  amount_due_at_resort: 800,
  adult_count: 0,
  check_in_date: "",
  check_out_date: "",
  child_count: 0,
  promotion_id: 2,
  property_id: 3,
  status_id: 3,
  total_cost: 1200,
  room_type_id: 13,
  room_type: "",
  rooms: "1"
};

export interface BookingInfoState {
  travellerInfo: TravellerInfoState;
  billingInfo: BillingInfoState;
  paymentInfo: PaymentInfoState;
  createBookingProps: CreateBookingProps;
}

// Define the initial state using that type
const initialState: BookingInfoState = {
  travellerInfo,
  billingInfo,
  paymentInfo,
  createBookingProps,
};

export const BookingInfoSlice = createSlice({
  name: "bookingInfo",
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    updateTravellerInfo: (state, action: PayloadAction<TravellerInfoState>) => {
      const { firstName, lastName, phone, email } = action.payload;
      state.travellerInfo.firstName = firstName;
      state.travellerInfo.lastName = lastName;
      state.travellerInfo.phone = phone;
      state.travellerInfo.email = email;
      return state;
    },
    updateBillingInfo: (prevState, action: PayloadAction<BillingInfoState>) => {
      const {
        firstName,
        lastName,
        mailingAddress1,
        mailingAddress2,
        country,
        city,
        state,
        zip,
        phone,
        email,
      } = action.payload;

      prevState.billingInfo.firstName = firstName;
      prevState.billingInfo.lastName = lastName;
      prevState.billingInfo.mailingAddress1 = mailingAddress1;
      prevState.billingInfo.mailingAddress2 = mailingAddress2;
      prevState.billingInfo.country = country;
      prevState.billingInfo.city = city;
      prevState.billingInfo.state = state;
      prevState.billingInfo.zip = zip;
      prevState.billingInfo.phone = phone;
      prevState.billingInfo.email = email;

      return prevState;
    },

    updatePaymentInfo: (state, action: PayloadAction<PaymentInfoState>) => {
      const { cardNumber, expiryMonth, expiryYear, cvvCode } = action.payload;
      state.paymentInfo.cardNumber = cardNumber;
      state.paymentInfo.expiryMonth = expiryMonth;
      state.paymentInfo.expiryYear = expiryYear;
      state.paymentInfo.cvvCode = cvvCode;
      // updateCreateBookingProps()
      return state;
    },

    updateCreateBookingProps: (state, action: PayloadAction<CreateBookingProps>) => {
      const {
        amount_due_at_resort,
        adult_count,
        check_in_date,
        check_out_date,
        child_count,
        promotion_id,
        property_id,
        status_id,
        total_cost,
        rooms,
        room_type_id,
        room_type
      } = action.payload;

      // console.log('ACTION.PAYLOAD', amount_due_at_resort)

      state.createBookingProps.amount_due_at_resort = amount_due_at_resort;
      state.createBookingProps.adult_count = adult_count;
      state.createBookingProps.check_in_date = check_in_date;
      state.createBookingProps.check_out_date = check_out_date;
      state.createBookingProps.child_count = child_count;
      state.createBookingProps.promotion_id = promotion_id;
      state.createBookingProps.property_id = property_id;
      state.createBookingProps.status_id = status_id;
      state.createBookingProps.total_cost = total_cost;
      state.createBookingProps.room_type_id = room_type_id
      state.createBookingProps.rooms = rooms
      state.createBookingProps.room_type = room_type

      return state;
    },
  },
});



export const { updateBillingInfo, updatePaymentInfo, updateTravellerInfo, updateCreateBookingProps } = BookingInfoSlice.actions;

// Other code such as selectors can use the imported `RootState` type
export const getTravellerInfo = (state: RootState) => {
  return state.bookingInfo.travellerInfo;
};
export const getBillingInfo = (state: RootState) => {
  return state.bookingInfo.billingInfo;
};
export const getPaymentInfo = (state: RootState) => {
  return state.bookingInfo.paymentInfo;
};

export default BookingInfoSlice.reducer;
