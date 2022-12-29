import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { Screen } from 'screens';
import HotelList from 'components/HotelList/HotelList';
import type { RootStackParamList } from './types';

const AppStack = createStackNavigator<RootStackParamList>();

const AppNavigator = () => (
  <AppStack.Navigator>
    <AppStack.Screen name={Screen.HotelList} component={HotelList} />
  </AppStack.Navigator>
);

export default AppNavigator;
