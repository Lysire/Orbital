import React, { useState } from 'react';
import * as Font from 'expo-font';
import { AppLoading } from 'expo';
import { OverflowMenuProvider } from 'react-navigation-header-buttons';
import { enableScreens } from 'react-native-screens';
import { createStore, combineReducers } from 'redux';
import { Provider } from 'react-redux';

import categoriesReducer from './store/reducers/categories';
import eventsReducer from './store/reducers/events';
import MainNavigator from './navigation/MainNavigator';

enableScreens(); // to enable react-native-screens for navigation (stack)

// combine different reducers to create root reducer
const rootReducer = combineReducers({
  categories: categoriesReducer,
  events: eventsReducer
});

const store = createStore(rootReducer); // create store, arg is the root reducer

const fetchFonts = () => {
  return Font.loadAsync({
    'open-sans': require('./assets/fonts/OpenSans-Regular.ttf'),
    'open-sans-bold': require('./assets/fonts/OpenSans-Bold.ttf')
  });
};

export default function App() {
  const [fontLoaded, setFontLoaded] = useState(false);

  if (!fontLoaded) {
    return (
      <AppLoading
        startAsync={fetchFonts}
        onFinish={() => setFontLoaded(true)}
      />
    );
  }

  return ( // remember to set the store for the provider wrapper
    <Provider store={store}>
      <OverflowMenuProvider>
        <MainNavigator />
      </OverflowMenuProvider>
    </Provider>
  );
}
