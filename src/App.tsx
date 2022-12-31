/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import { StatusBar } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import AppNavigator from 'navigation/navigation';
import { Colors } from 'colors';

const App = () => (
  <>
    <StatusBar barStyle="light-content" backgroundColor={Colors.primary} />
    <NavigationContainer>
      <AppNavigator />
    </NavigationContainer>
  </>
);

export default App;
