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
  FontAwesome,
  MaterialCommunityIcons,
  SimpleLineIcons,
  Entypo,
} from "@expo/vector-icons";

import colors from "../constants/colors";

import UserInterestScreen, {
  userInterestScreenOptions,
} from "../Screens/user/UserInterests";
import PostsScreen, { postsScreenOptions } from "../Screens/posts/Posts";
import LoginOptionScreen from "../Screens/user/AuthScreen";

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
const AuthStack = createStackNavigator();

export const AuthNavigator = () => {
  return (
    <AuthStack.Navigator screenOptions={defaultNavOptions}>
      <AuthStack.Screen name="Feed" component={LoginOptionScreen} />
    </AuthStack.Navigator>
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
        backgroundColor: colors.highlighColor,
        padding: 5,
      }}
      inactiveColor={colors.textColor}
    >
      <PostTabNavigator.Screen
        name="Feed"
        component={HomeNavigation}
        options={{
          tabBarIcon: (props) => (
            <SimpleLineIcons
              name={Platform.OS === "android" ? "book-open" : "book-open"}
              size={23}
              color={props.color}
            />
          ),
          tabBarLabel: "Gossips",
          tabBarColor: colors.highlighColor,
        }}
      />

      <PostTabNavigator.Screen
        name="Cheaters"
        component={HomeNavigation}
        options={{
          tabBarIcon: (props) => (
            <Entypo
              name={Platform.OS === "android" ? "slideshare" : "slideshare"}
              size={23}
              color={props.color}
            />
          ),
          tabBarLabel: "Cheaters",
          tabBarColor: colors.highlighColor,
        }}
      />

      <PostTabNavigator.Screen
        name="Questions"
        component={HomeNavigation}
        options={{
          tabBarIcon: (props) => (
            <SimpleLineIcons
              name={Platform.OS === "android" ? "question" : "question"}
              size={23}
              color={props.color}
            />
          ),
          tabBarLabel: "Questions",
          tabBarColor: colors.highlighColor,
        }}
      />
    </PostTabNavigator.Navigator>
  );
};

const DrawerNavigator = createDrawerNavigator();

export const MainNavigator = (props) => {
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
            <Button title="Logout" />
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
