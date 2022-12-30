import React from 'react';
import {
  CardStyleInterpolators,
  createStackNavigator,
} from '@react-navigation/stack';
import { HeaderBackButton } from '@react-navigation/elements';
import type { RootStackParamList } from './types';
import { Screen } from 'screens';
import HotelList from 'components/HotelList/HotelList';
import HotelDetailsScreen from 'screens/HotelDetailsScreen/HotelDetailsScreen';
import FilterScreen from 'screens/FilterScreen/FilterScreen';

const AppStack = createStackNavigator<RootStackParamList>();

const AppNavigator = () => (
  <AppStack.Navigator
    screenOptions={({ navigation }) => ({
      headerStyle: { backgroundColor: '#D8315B' },
      headerTitleStyle: { color: 'white' },
      headerBackImage: () => (
        <HeaderBackButton tintColor="white" onPress={navigation.goBack} />
      ),
    })}>
    <AppStack.Screen name={Screen.HotelList} component={HotelList} />
    <AppStack.Screen
      name={Screen.HotelDetails}
      component={HotelDetailsScreen}
      options={({ route }) => ({
        headerTitle: route.params.name,
        headerBackTitleVisible: false,
      })}
    />
    <AppStack.Screen
      name={Screen.Filter}
      component={FilterScreen}
      options={{
        headerTitle: 'Filter',
        headerBackTitleVisible: false,
        cardStyleInterpolator: CardStyleInterpolators.forVerticalIOS,
      }}
    />
  </AppStack.Navigator>
);

export default AppNavigator;
