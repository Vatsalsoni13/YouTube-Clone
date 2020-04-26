import React, {useEffect} from 'react';
import {
  NavigationContainer,
  DefaultTheme,
  DarkTheme,
  useTheme,
} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import HomeScreen from './src/screens/HomeScreen';
import SearchScreen from './src/screens/SearchScreen';
import VideoPlayerScreen from './src/screens/VideoPlayerScreen';
import ExploreScreen from './src/screens/ExploreScreen';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {Provider, useSelector} from 'react-redux';
import {themeReducer} from './src/reducers/themeReducer';
import {createStore} from 'redux';
import {combineReducers} from 'redux';
import {reducer} from './src/reducers/reducer';
const Stack = createStackNavigator();
const Tabs = createBottomTabNavigator();

const rootReducer = combineReducers({
  cardData: reducer,
  myDarkMode: themeReducer,
});
const store = createStore(rootReducer);
const customDarkTheme = {
  ...DarkTheme,
  colors: {
    ...DarkTheme.colors,
    headerColor: '#404040',
    iconColor: '#FFF',
    tabIcon: '#FFF',
  },
};
const customDefaultTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    headerColor: '#FFF',
    iconColor: 'black',
    tabIcon: 'red',
  },
};
const RootHome = () => {
  const {colors} = useTheme();
  return (
    <Tabs.Navigator
      screenOptions={({route}) => ({
        tabBarIcon: ({color}) => {
          let iconName;

          if (route.name === 'Home') {
            iconName = 'home';
          } else if (route.name === 'Explore') {
            iconName = 'explore';
          } else if (route.name === 'Subscribe') {
            iconName = 'subscriptions';
          }
          return <MaterialIcons name={iconName} size={32} color={color} />;
        },
      })}
      tabBarOptions={{
        activeTintColor: colors.tabIcon,
        inactiveTintColor: 'gray',
      }}>
      <Tabs.Screen name="Home" component={HomeScreen} />
      <Tabs.Screen name="Explore" component={ExploreScreen} />
    </Tabs.Navigator>
  );
};
export default () => {
  return (
    <Provider store={store}>
      <Navigation />
    </Provider>
  );
};
export function Navigation() {
  let currentTheme = useSelector((state) => {
    return state.myDarkMode;
  });
  return (
    <NavigationContainer
      theme={currentTheme ? customDarkTheme : customDefaultTheme}>
      <Stack.Navigator headerMode="none">
        <Stack.Screen name="rootHome" component={RootHome} />
        <Stack.Screen name="Search" component={SearchScreen} />
        <Stack.Screen name="VideoPlayer" component={VideoPlayerScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
