import { combineReducers, configureStore } from "@reduxjs/toolkit";
import AccessibilityReducer from "../reducers/AccessibleReducer";
import BedsReducer from "../reducers/BedsSlice";
import DateRangeReducer from "../reducers/DateRangeReducer";
import GuestReducer from "../reducers/GuestsReducer";
import PromoCodeReducer from "../reducers/PromoCodeReducer";
import PropertyReducer from "../reducers/PropertyNameSlice";
import RoomsReducer from "../reducers/RoomsSlice";
import { loadState } from "./reduxInLocalStorage";
import CurrencyReducer from "../reducers/CurrencyReducer";
import BookingInfoReducer from "../reducers/BookingInfoReducer";
import CheckoutFormOpenStateReducer from "../reducers/CheckoutFormOpenStateReducer";
import ItineraryVisibilityReducer from "../reducers/ItineraryVisibilityReducer";
import PromotionReducer from "../reducers/PromotionReducer";
import RoomDetailsReducer from "../reducers/RoomDetailsReducer";
import TimerReducer from "../reducers/TimerReducer"
import CheckOutDetailsReducer from "../reducers/CheckOutDetailsReducer";
import EmailReducer from "../reducers/EmailReducer";

const reducers = combineReducers({
  propertyName: PropertyReducer,
  rooms: RoomsReducer,
  guests: GuestReducer,
  beds: BedsReducer,
  isAccessible: AccessibilityReducer,
  daterange: DateRangeReducer,
  promoCode: PromoCodeReducer,
  promotion: PromotionReducer,
  selectedRatePlan: RoomDetailsReducer,
  isTimerCompleted: TimerReducer,
  checkOutDetails: CheckOutDetailsReducer,
  currency: CurrencyReducer,
  bookingInfo: BookingInfoReducer,
  checkOutForms: CheckoutFormOpenStateReducer,
  itineraryVisibility: ItineraryVisibilityReducer,
  email: EmailReducer
});

export const store = configureStore({
  devTools: true,
  reducer: reducers,
  preloadedState: loadState(),
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
