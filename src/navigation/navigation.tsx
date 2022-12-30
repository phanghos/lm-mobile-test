import React from 'react';
import {
  CardStyleInterpolators,
  createStackNavigator,
} from '@react-navigation/stack';
import { HeaderBackButton } from '@react-navigation/elements';
import type { RootStackParamList } from './types';
import { Screen } from 'screens';
import { Colors } from 'colors';
import HotelList from 'components/HotelList/HotelList';
import HotelDetailsScreen from 'screens/HotelDetailsScreen/HotelDetailsScreen';
import FilterScreen from 'screens/FilterScreen/FilterScreen';
import HeaderFilterButton from 'components/HeaderFilterButton/HeaderFilterButton';

const AppStack = createStackNavigator<RootStackParamList>();

const AppNavigator = () => (
  <AppStack.Navigator
    screenOptions={({ navigation }) => ({
      headerStyle: { backgroundColor: Colors.primary },
      headerTitleStyle: { color: 'white' },
      headerBackImage: () => (
        <HeaderBackButton tintColor="white" onPress={navigation.goBack} />
      ),
    })}>
    <AppStack.Screen
      name={Screen.HotelList}
      component={HotelList}
      options={{
        headerTitle: 'Hotel List',
        headerRightContainerStyle: { width: '100%' },
        headerRight: HeaderFilterButton,
      }}
    />
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
