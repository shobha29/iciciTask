import React from 'react';
import {Provider} from 'react-redux';
import 'react-native-gesture-handler';

import Route from './src/route';
import store from './src/redux/store';

function App() {
  return (
    <Provider store={store}>
      <Route />
    </Provider>
  );
}

export default App;
