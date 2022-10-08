export const DEV_URL = "http://localhost:3000/";
export const PROD_URL = "https://d20liqufh72uz8.cloudfront.net/";
export const BACKEND_URL =
  "http://team3-env-1.eba-sxuxy7mi.us-west-2.elasticbeanstalk.com/";

export const LANDING_PAGE = "/search";
export const ROOM_SEARCH_RESULTS = "/room-search-results";
export const ROOM_SEARCH = "room-search-results";
export const CONFIRMATION_PAGE = "/confirmation"
export const ROOT = "/"
export const CHECKOUT_PAGE = "/checkout";

// api endpoints
export const BACKEND_ROOT = process.env.REACT_APP_BACKEND_URL
export const COMPONENTS_CONFIGURATION_URL = BACKEND_ROOT + "landingpage/components";
export const ROOM_DETAILS = BACKEND_ROOT + "rooms/roomdetails?";
export const CALENDAR_RATES = BACKEND_ROOT + "rooms/minnightlyrates?";
export const ROOM_IMAGES = BACKEND_ROOT + "searchpage/images";
export const CHECKOUT_PAGE_DETAILS = "checkoutpage/details";
export const LANDING_PAGE_IMAGES = "landingpage/images";