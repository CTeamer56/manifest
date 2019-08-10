import React from 'react';
import { Platform } from 'react-native';
import { createStackNavigator, createDrawerNavigator } from 'react-navigation';
import TabBarIcon from '../components/TabBarIcon';

import HomeScreen from '../screens/HomeScreen';
import SettingsScreen from '../screens/SettingsScreen';
import PlaidScreen from '../screens/PlaidScreen';
import GoalsScreen from '../screens/GoalsScreen';
import TransactionsScreen from '../screens/TransactionsScreen';
import LogOutScreen from '../screens/LogOutScreen';
import GamesScreen from '../screens/GamesScreen';
import DKScreen from '../games/DonkeyKong';

const config = Platform.select({
  web: { headerMode: 'screen' },
  default: {},
});

const HomeStack = createStackNavigator(
  {
    HomePg: {
      screen: HomeScreen,
    },
  },
  config
);

HomeStack.navigationOptions = {
  tabBarLabel: 'Home',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={
        Platform.OS === 'ios'
          ? `ios-information-circle${focused ? '' : '-outline'}`
          : 'md-information-circle'
      }
    />
  ),
};

HomeStack.path = 'app/home/';

const PlaidStack = createStackNavigator(
  {
    Plaid: {
      screen: PlaidScreen,
    },
  },
  config
);

PlaidStack.navigationOptions = {
  tabBarLabel: 'Plaid',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon focused={focused} name={Platform.OS === 'ios' ? 'ios-link' : 'md-link'} />
  ),
};

PlaidStack.path = 'app/plaid';

const GoalsStack = createStackNavigator(
  {
    Goals: {
      screen: GoalsScreen,
    },
  },
  config
);

GoalsStack.navigationOptions = {
  tabBarLabel: 'Goals',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon focused={focused} name={Platform.OS === 'ios' ? 'ios-link' : 'md-link'} />
  ),
};

GoalsStack.path = 'app/goals';

const TransactionsStack = createStackNavigator(
  {
    Transactions: {
      screen: TransactionsScreen,
    },
  },
  config
);

TransactionsStack.navigationOptions = {
  tabBarLabel: 'Transactions',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon focused={focused} name={Platform.OS === 'ios' ? 'ios-link' : 'md-link'} />
  ),
};

TransactionsStack.path = 'app/transactions';

const SettingsStack = createStackNavigator(
  {
    Settings: {
      screen: SettingsScreen,
    },
  },
  config
);

SettingsStack.navigationOptions = {
  tabBarLabel: 'Settings',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon focused={focused} name={Platform.OS === 'ios' ? 'ios-options' : 'md-options'} />
  ),
};

SettingsStack.path = 'app/settings';

const GamesStack = createStackNavigator(
  {
    Games: {
      screen: GamesScreen,
    },
    DK: {
      screen: DKScreen,
    },
  },
  config.extends({
    initialRouteName: 'Games',
  })
);

GamesStack.navigationOptions = {
  tabBarLabel: 'Games',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon focused={focused} name={Platform.OS === 'ios' ? 'ios-options' : 'md-options'} />
  ),
};

GamesStack.path = 'app/games';

const drawerNavigator = createDrawerNavigator(
  {
    Home: HomeStack,
    Plaid: PlaidStack,
    Goals: GoalsStack,
    Transactions: TransactionsStack,
    Settings: SettingsStack,
    LogOut: {
      screen: LogOutScreen,
    },
    Games: GamesStack,
  },
  {
    initialRouteName: 'Home',
    hideStatusBar: true,
    drawerBackgroundColor: 'rgba(255,255,255,.9)',
    overlayColor: '#49d5b6',
    contentOptions: {
      activeTintColor: '#fff',
      activeBackgroundColor: '#49d5b6',
    },
    backBehavior: 'initialRoute',
  }
);

drawerNavigator.path = 'app/';

export default drawerNavigator;
