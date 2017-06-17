import React from 'react';
import ReactDOM from 'react-dom';
import { AppContainer } from 'react-hot-loader';
import AppState from './stores/AppState';
import App from './components/App';
import injectTapEventPlugin from 'react-tap-event-plugin';
import { Logger } from 'react-console-logger';

import './styles.scss';
require('./favicon.ico');
import 'font-awesome/css/font-awesome.css';
import 'flexboxgrid/css/flexboxgrid.css';

// instantiate ui state store
const appState = new AppState();

// instantiate logger
const logger = new Logger();

// enable tap events plugin
injectTapEventPlugin();

ReactDOM.render(
  <AppContainer>
    <App store={appState} logger={logger} />
  </AppContainer>,
  document.getElementById('app')
);

// Hot Module Replacement API
if (module.hot) {
  module.hot.accept('./components/App', () => {
    ReactDOM.render(
      <AppContainer>
        <App store={appState} />
      </AppContainer>
      ,
      document.getElementById('app')
    );
  });
}