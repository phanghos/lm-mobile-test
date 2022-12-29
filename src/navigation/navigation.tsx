import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { HeaderBackButton } from '@react-navigation/elements';
import type { RootStackParamList } from './types';
import { Screen } from 'screens';
import HotelList from 'components/HotelList/HotelList';
import HotelDetailsScreen from 'screens/HotelDetailsScreen/HotelDetailsScreen';

const AppStack = createStackNavigator<RootStackParamList>();

const AppNavigator = () => (
  <AppStack.Navigator
    screenOptions={{
      headerStyle: { backgroundColor: '#D8315B' },
      headerTitleStyle: { color: 'white' },
    }}>
    <AppStack.Screen
      name={Screen.HotelList}
      component={HotelList}
      options={{ headerTitle: 'Hotel List' }}
    />
    <AppStack.Screen
      name={Screen.HotelDetails}
      component={HotelDetailsScreen}
      options={({ route, navigation }) => ({
        headerTitle: route.params.name,
        headerBackTitleVisible: false,
        headerBackImage: () => (
          <HeaderBackButton tintColor="white" onPress={navigation.goBack} />
        ),
      })}
    />
  </AppStack.Navigator>
);

export default AppNavigator;
