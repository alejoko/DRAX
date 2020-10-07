import React from 'react';
import ReactDOM from 'react-dom';

//Redux and Reducer Imports
import axios from 'axios';
import { createStore, applyMiddleware } from "redux";
import { Provider } from "react-redux";
import thunk from "redux-thunk";
import { reducers } from "./store/ducks";
import { IntlProvider } from 'react-intl';
import { composeWithDevTools } from "redux-devtools-extension";

import messages_en from './translations/en.json';
import messages_es from './translations/en.json';

import App from "./components/App";

import './styles/main.scss'

const messages = {
  'en': messages_en,
  'es': messages_es
}

axios.defaults.baseURL = 'https://localhost:3000' // the prefix of the URL
axios.defaults.headers.get['Accept'] = 'application/json'   // default header for all get request
axios.defaults.headers.post['Accept'] = 'application/json'  

//Create Redux Store
const store = createStore(reducers, composeWithDevTools(applyMiddleware(thunk)));

ReactDOM.render(
  <IntlProvider locale={'en'} messages={messages['en']}>
    <Provider store={store}>
      <App />
    </Provider>
  </IntlProvider>,
  document.getElementById('root')
);