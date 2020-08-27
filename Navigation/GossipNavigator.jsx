import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import { getFocusedRouteNameFromRoute } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import { Platform } from 'react-native';
import { Searchbar } from 'react-native-paper';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';

import HeaderButton from '../Components/HeaderButton';
import colors from '../constants/colors';
import { logout } from '../redux/actions/user-auth';
import AnswersScreen, { answerScreenOptions } from '../Screens/Post/Answers';
import NewPostScreen, { newPostScreenOptions } from '../Screens/Post/CreatePostScreen';
import PostOverviewScreen from '../Screens/Post/PostOverviewScreen';
import HomeScreen, { postNavigationOptions } from '../Screens/Post/Posts';

const defaultNavOptions = {
  headerStyle: {
    elevation: 0,
    shadowOpacity: 0,
    borderBottomWidth: 0,
    shadowColor: 0,
    backgroundColor: "#fff",
    borderBottomColor: "#fff",
    shadowColor: "#fff",
  },
  headerTintColor: Platform.OS === "android" ? "white" : colors.primaryColor,
  headerTitleStyle: {
    fontFamily: "open-sans-bold",
  },
  headerBackTitleStyle: {
    fontFamily: "open-sans",
  },
};

const getHeaderTitle = (route) => {
  const routeName = getFocusedRouteNameFromRoute(route) ?? "Home";

  switch (routeName) {
    case "NewPost":
      return "News Post";
    case "Answers":
      return "Answers";
    case "Notifications":
      return "Notifications";
  }
};

// TAB NAVIGATOR

const Tab = createMaterialBottomTabNavigator();

const BottomTabNavigation = () => (
  <Tab.Navigator
    activeColor={colors.primaryColor}
    defaultNavOptions={defaultNavOptions}
    barStyle={{ backgroundColor: colors.whiteColor }}
  >
    <Tab.Screen
      name="Home"
      component={HomeScreen}
      options={postNavigationOptions}
    />
    <Tab.Screen
      name="NewPost"
      component={NewPostScreen}
      options={newPostScreenOptions}
    />
    <Tab.Screen
      name="Answers"
      component={AnswersScreen}
      options={answerScreenOptions}
    />
    <Tab.Screen
      name="Notifications"
      options={newPostScreenOptions}
      component={NewPostScreen}
    />
  </Tab.Navigator>
);

// STACK NAVIGATOR

const Stack = createStackNavigator();

export const GossipStackNavigator = () => (
  <Stack.Navigator defaultNavOptions={defaultNavOptions}>
    <Stack.Screen
      name="GossipBook"
      component={BottomTabNavigation}
      options={({ route, navigation }) => ({
        headerTitle: "",
        headerStyle: defaultNavOptions.headerStyle,

        headerLeft: () => (
          <HeaderButtons HeaderButtonComponent={HeaderButton}>
            <Item
              title="Menu"
              iconName={
                Platform.OS === "android" ? "user-circle-0" : "user-circle-o"
              }
              iconSize={23}
              onPress={() => {
                // navigation.toggleDrawer();
                // console.log(navigation);
                logout();
              }}
            />
          </HeaderButtons>
        ),

        headerRight: () => (
          <Searchbar
            placeholder="search..."
            style={{
              elevation: 0,
              flexDirection: "row-reverse",
              width: 300,
              height: 40,
              padding: 0,
              right: 10,
              // marginTop: 20,
            }}
            inputStyle={{
              margin: 0,
              borderColor: "#eeee",
              borderWidth: 1,
              borderRadius: 10,
            }}
          />
        ),
      })}
    />
    <Stack.Screen
      name="Single"
      options={{ headerStyle: defaultNavOptions.headerStyle }}
      component={PostOverviewScreen}
    />
  </Stack.Navigator>
);
