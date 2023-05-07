import React, { Component } from 'react';
import Main from './components/MainComponent';

// setup redux
import { Provider } from 'react-redux';
import { store } from './redux/CongfigStore/Configstore';





class App extends Component {
  render() {
    return (
      <Provider store={store}>  
          <Main />
      
      </Provider>
    );
  }
}
export default App;