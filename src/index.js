import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { store, history } from './redux/store';
import {StripeProvider} from 'react-stripe-elements';
import Routes from './Routes'

render(
  <StripeProvider apiKey="pk_test_9QPuYWOs5fSjGmRCNWCgAYHL">
    <Provider store={store}>
      <Routes history={history}/>
    </Provider>
  </StripeProvider>
,
  document.getElementById('root')
);
