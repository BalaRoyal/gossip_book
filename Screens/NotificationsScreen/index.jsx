import { MaterialIcons } from '@expo/vector-icons';
import React, { useEffect } from 'react';
import { ActivityIndicator, FlatList, StyleSheet, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';

import NotificationCard from '../../Components/NotificationCard';
import colors from '../../constants/colors';
import { getUserNotifications } from '../../redux/actions/notifications';

const NotificationsScreen = (props) => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getUserNotifications());
  }, [dispatch, getUserNotifications]);

  const { notifications, loading } = useSelector(
    ({ userNotifications }) => userNotifications
  );

  let content = <ActivityIndicator size="large" color={colors.primaryColor} />;

  if (!loading) {
    content = (
      <FlatList
        data={notifications}
        renderItem={({ item }) => (
          <NotificationCard {...item} body={item.message} />
        )}
        keyExtractor={(item) => `${item.id}`}
      />
    );
  } else if (!loading && !notifications.length) {
    content = <NotificationCard body="No notifications!" />;
  }
  return <View style={styles.screen}>{content}</View>;
};

const styles = StyleSheet.create({
  screen: {
    display: "flex",
    padding: 5,
    backgroundColor: "#fff",
    flex: 1,
  },
});

export const NotificationNavigationOptions = (navData) => ({
  tabBarLabel: "Notifications",
  tabBarIcon: ({ color }) => (
    <MaterialIcons name="notifications" size={24} color={color} />
  ),
});
export default NotificationsScreen;
