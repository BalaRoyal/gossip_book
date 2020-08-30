import { createDrawerNavigator, DrawerItemList } from '@react-navigation/drawer';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import { Button, Platform, View } from 'react-native';
import { Searchbar } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import { useDispatch } from 'react-redux';

import HeaderButton from '../Components/HeaderButton';
import colors from '../constants/colors';
import { logout } from '../redux/actions/user-auth';
import AnswersScreen, { answerScreenOptions } from '../Screens/AnswersScreen';
import EditAccountScreen from '../Screens/EditAccountScreen';
import PostOverviewScreen from '../Screens/PostOverviewScreen';
import HomeScreen, { postNavigationOptions } from '../Screens/PostsScreen';
import ProfileScreen from '../Screens/ProfileScreen';

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
      name="Answers"
      component={AnswersScreen}
      options={answerScreenOptions}
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
      options={({ navigation }) => ({
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
                navigation.toggleDrawer();
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

// DRAWER NAVIGATOR

// Profile stack screen

// profile tabs

const TopTab = createMaterialTopTabNavigator();

const ProfileTabNavigation = () => (
  <TopTab.Navigator
    tabBarOptions={{
      labelStyle: {
        fontSize: 12,
        textTransform: "capitalize",
      },
      indicatorStyle: {
        backgroundColor: colors.primaryColor,
        height: 1,
      },
      allowFontScaling: true,
    }}
  >
    <TopTab.Screen name="Profile" component={ProfileScreen} />
    <TopTab.Screen name="Posts" component={ProfileScreen} />
    <TopTab.Screen name="Settings" component={EditAccountScreen} />
  </TopTab.Navigator>
);
const ProfileNavigation = ({ navigation }) => (
  <Stack.Navigator>
    <Stack.Screen
      options={{
        headerLeft: () => (
          <HeaderButtons HeaderButtonComponent={HeaderButton}>
            <Item
              title="Menu"
              iconName={
                Platform.OS === "android" ? "user-circle-0" : "user-circle-o"
              }
              iconSize={23}
              onPress={() => {
                navigation.toggleDrawer();
              }}
            />
          </HeaderButtons>
        ),
        headerStyle: defaultNavOptions.headerStyle,
        headerTitle: "Account information",
        headerTitleStyle: {
          fontWeight: "200",
          color: colors.textColor,
        },
      }}
      component={ProfileTabNavigation}
      name="Profile"
    />
  </Stack.Navigator>
);

const Drawer = createDrawerNavigator();

export const MainNavigator = () => {
  const dispatch = useDispatch();
  return (
    <Drawer.Navigator
      drawerContent={(props) => {
        return (
          <View>
            <SafeAreaView forceInset={{ top: "always", horizontal: "never" }}>
              <DrawerItemList {...props} />
              <Button title="Logout" onPress={() => dispatch(logout())} />
            </SafeAreaView>
          </View>
        );
      }}
    >
      <Drawer.Screen name="Home" component={GossipStackNavigator} />
      <Drawer.Screen
        name="View profile"
        options={{
          headerTitle: null,
        }}
        component={ProfileNavigation}
      />
    </Drawer.Navigator>
  );
};
