import React, { Component } from 'react';
import { Provider } from 'react-redux';

import './App.css';

import Screen from './components/Screen'
import store from './store'

import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faIgloo } from '@fortawesome/free-solid-svg-icons'
import { faFire } from '@fortawesome/free-solid-svg-icons'

library.add(faIgloo)
library.add(faFire)


class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <div className="App">
          <Screen />
        </div>
      </Provider>
    );
  }
}

export default App;
