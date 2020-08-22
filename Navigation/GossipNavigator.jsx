import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import {
  createDrawerNavigator,
  DrawerItemList,
} from "@react-navigation/drawer";

import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";
import { SafeAreaView, Button, View, Platform } from "react-native";

import {
  Ionicons,
  MaterialCommunityIcons,
  AntDesign,
} from "@expo/vector-icons";

import colors from "../constants/colors";

import UserInterestScreen, {
  userInterestScreenOptions,
} from "../Screens/user/UserInterests";
import PostsScreen, { postsScreenOptions } from "../Screens/posts/Posts";
import { useDispatch } from "react-redux";
import { logout } from "../redux/actions/user-auth";
import CreatePostScreen from "../Screens/posts/CreatePostScreen";

const defaultNavOptions = {
  headerStyle: {
    backgroundColor: Platform.OS === "android" ? colors.primaryColor : "",
  },
  headerTintColor: Platform.OS === "android" ? "white" : colors.primaryColor,
  headerTitleStyle: {
    fontFamily: "open-sans-bold",
  },
  headerBackTitleStyle: {
    fontFamily: "open-sans",
  },
};

const InterestingTopicStack = createStackNavigator();

const TopicsNavigator = () => {
  return (
    <InterestingTopicStack.Navigator>
      <InterestingTopicStack.Screen
        component={UserInterestScreen}
        name="Customize your feed"
        options={userInterestScreenOptions}
      />
    </InterestingTopicStack.Navigator>
  );
};

const PostStack = createStackNavigator();

export const HomeNavigation = () => {
  return (
    <PostStack.Navigator screenOptions={defaultNavOptions}>
      <PostStack.Screen
        name="Home"
        component={PostsScreen}
        options={postsScreenOptions}
      />
    </PostStack.Navigator>
  );
};
const PostTabNavigator = createMaterialBottomTabNavigator();

export const PostNavigator = (props) => {
  return (
    <PostTabNavigator.Navigator
      shifting={true}
      activeColor={colors.primaryColor}
      barStyle={{
        backgroundColor: colors.whiteColor,
      }}
      inactiveColor={colors.textColor}
    >
      <PostTabNavigator.Screen
        name="Home"
        component={HomeNavigation}
        options={{
          tabBarIcon: (props) => (
            <AntDesign
              name={Platform.OS === "android" ? "home" : "home"}
              size={24}
              color={props.color}
            />
          ),
          tabBarLabel: "Home",
          tabBarColor: "#F2E9DC",
        }}
      />

      <PostTabNavigator.Screen
        name="NewPost"
        component={CreatePostScreen}
        options={{
          tabBarIcon: (props) => (
            <Ionicons
              name={Platform.OS === "android" ? "md-create" : "ios-create"}
              size={23}
              color={props.color}
            />
          ),
          tabBarLabel: "New post",
          tabBarColor: "#FCFFEB",
        }}
      />

      <PostTabNavigator.Screen
        name="Notifications"
        component={HomeNavigation}
        options={{
          tabBarIcon: (props) => (
            <Ionicons
              name={
                Platform.OS === "android"
                  ? "ios-notifications"
                  : "ios-notifications-outline"
              }
              size={23}
              color={props.color}
            />
          ),
          tabBarLabel: "Notifications",
          tabBarColor: "#F8FFF4",
        }}
      />
    </PostTabNavigator.Navigator>
  );
};

const DrawerNavigator = createDrawerNavigator();

export const MainNavigator = (props) => {
  const dispatch = useDispatch();
  return (
    <DrawerNavigator.Navigator
      drawerContent={(props) => (
        <View style={{ flex: 1, paddingTop: 20 }}>
          <SafeAreaView
            forceInset={{
              top: "always",
              horizontal: "never",
            }}
          >
            <DrawerItemList {...props} />
            <Button title="Logout" onPress={() => dispatch(logout())} />
          </SafeAreaView>
        </View>
      )}
      drawerContentOptions={{
        activeTintColor: colors.primaryColor,
      }}
    >
      <DrawerNavigator.Screen
        name="Profile"
        component={PostNavigator}
        options={{
          drawerIcon: (props) => (
            <MaterialCommunityIcons
              name={
                Platform.OS === "android"
                  ? "account-settings"
                  : "account-settings"
              }
              size={23}
              color={props.color}
            />
          ),
        }}
      />
      <DrawerNavigator.Screen
        name="Interesting topics"
        component={TopicsNavigator}
        options={{
          drawerIcon: (props) => (
            <MaterialCommunityIcons
              name={Platform.OS === "android" ? "wunderlist" : "wunderlist"}
              size={23}
              color={props.color}
            />
          ),
        }}
      />
    </DrawerNavigator.Navigator>
  );
};
