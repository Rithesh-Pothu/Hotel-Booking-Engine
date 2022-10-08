import { ThemeProvider } from '@mui/material/styles';
import { debounce } from "debounce";
import React from 'react';
import 'react-date-range/dist/styles.css'; // main style file
import 'react-date-range/dist/theme/default.css'; // theme css file
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { BrowserRouter } from "react-router-dom";
import { store } from './redux/store';
import reportWebVitals from './reportWebVitals';
import { theme } from './theme/Theme';

import './index.css';
import { saveState } from './redux/reduxInLocalStorage';
import Routing from './routing/Routing';
import * as Sentry from "@sentry/react";
import { BrowserTracing } from "@sentry/tracing";


import Smartlook from 'smartlook-client'

const smartLookKey: string = process.env.REACT_APP_SMART_LOOK_KEY as string


const initializeSmartLook = () => {
  Smartlook.init(smartLookKey)
}

const recordAllDetails = () => {
  Smartlook.record({
    emails: true,
    forms: true,
    numbers: true,
  })
}


initializeSmartLook()
recordAllDetails()



Sentry.init({
  dsn: "https://9465507665b84b9bad4658321465792b@o1428690.ingest.sentry.io/6779133",
  integrations: [new BrowserTracing()],

  // We recommend adjusting this value in production, or using tracesSampler
  // for finer control
  tracesSampleRate: 1.0,
});

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

store.subscribe(
  // we use debounce to save the state once each 800ms
  // for better performances in case multiple changes occur in a short time
  debounce(() => {
    saveState(store.getState());
  }, 800)
);

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <BrowserRouter>
          <Routing />
        </BrowserRouter>
      </ThemeProvider>
    </Provider>
  </React.StrictMode>
);
reportWebVitals();