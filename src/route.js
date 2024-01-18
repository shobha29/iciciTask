import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {createDrawerNavigator} from '@react-navigation/drawer';

import {Filter, Leads, Task} from './screens';
import {StatusBar} from 'react-native';
import {colors} from './utils/colors';

const Stack = createStackNavigator();

const Drawer = createDrawerNavigator();

const DrawerNavigator = () => {
  return (
    <Drawer.Navigator screenOptions={{headerShown: false}}>
      <Drawer.Screen name="Task" component={Task} />
      <Drawer.Screen name="Leads" component={Leads} />
    </Drawer.Navigator>
  );
};

const Route = () => {
  return (
    <NavigationContainer>
      <StatusBar backgroundColor={colors.header1} />
      <Stack.Navigator
        initialRouteName="Task"
        screenOptions={{headerShown: false}}>
        <Stack.Screen name="Task" component={DrawerNavigator} />
        <Stack.Screen name="Filter" component={Filter} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Route;
