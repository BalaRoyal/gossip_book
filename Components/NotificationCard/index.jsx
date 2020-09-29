import { MaterialIcons } from '@expo/vector-icons';
import moment from 'moment';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

import colors from '../../constants/colors';

const NotificationCard = (props) => {
  return (
    <View style={styles.card}>
      <View style={styles.body}>
        <Text>
          <MaterialIcons name="info" size={24} color={colors.blueColor} />
        </Text>
        <Text style={styles.bodyText}>{props.body}</Text>
      </View>
      <Text style={styles.time}>{moment(props.created_at).fromNow()}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#F7F7F2",
    elevation: 1,
    shadowColor: "rgba(0,0,0,0.3)",
    shadowOffset: {
      width: 0,
      height: 1,
    },

    width: "100%",
    alignSelf: "center",
    shadowOpacity: 0.7,
    minHeight: 50,
    justifyContent: "center",
    paddingLeft: 20,
    marginBottom: 10,
  },
  bodyText: {
    color: colors.textColor,
    fontFamily: "open-sans",
    margin: 5,
  },
  body: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    paddingLeft: 10,
  },
  time: {
    margin: 5,
    color: colors.textColorPrimary,
    paddingLeft: 10,
    alignSelf: "flex-end",
  },
});
export default NotificationCard;
