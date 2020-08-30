import { StyleSheet } from 'react-native';

import colors from '../../constants/colors';

export default styles = StyleSheet.create({
  card: {
    backgroundColor: "#fff",
    width: "98%",
    alignSelf: "center",
    marginBottom: 5,
    padding: 4,
    paddingLeft: 10,
    paddingRight: 10,
    elevation: 1,
    shadowOffset: {
      width: 1,
      height: 0,
    },
    shadowColor: "#D9DECE",
    shadowOpacity: 1.0,
    margin: 2,
    borderRadius: 10,
  },
  username: {
    fontWeight: "400",
    color: colors.textColorPrimary,
    fontSize: 13,
  },
  cardHeading: {
    padding: 3,
    display: "flex",
    flexDirection: "row",
  },
  userAvatar: {
    backgroundColor: "#cccc",
    padding: 10,
    width: 60,
    height: 60,
    borderRadius: 60,
  },
  userInfo: {
    flex: 1,
    alignSelf: "center",
    fontSize: 12,
    fontFamily: "open-sans",
  },
  VoteStat: {
    padding: 2,
    flex: 1,
    alignSelf: "center",
    backgroundColor: colors.brownColor,
  },
  cardImage: {},
  image: {
    width: "100%",
    maxHeight: 300,
  },
  cardText: {
    lineHeight: 24,
    color: colors.textColor,
    fontFamily: "open-sans",
    padding: 5,
    textAlign: "justify",
  },
  time: {
    color: colors.accentColor,
    fontSize: 8,
  },
  cardTitle: {
    fontWeight: "500",
    color: colors.textColor,
    margin: 5,
  },
});
