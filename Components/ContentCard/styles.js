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
    fontWeight: "700",
    color: colors.textColorPrimary,
    fontSize: 12,
    margin: 4,
  },
  cardHeading: {
    padding: 3,
    display: "flex",
    flexDirection: "row",
  },
  userAvatar: {
    backgroundColor: "#cccc",
    width: 50,
    height: 50,
    borderRadius: 50,
    justifyContent: "center",
    alignItems: "center",
  },
  userInfo: {
    flex: 1,
    alignSelf: "center",
    fontSize: 12,
    fontFamily: "open-sans",
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
    color: colors.textColorPrimary,
    fontSize: 10,
    margin: 2,
  },
  cardTitle: {
    fontWeight: "500",
    color: colors.textColor,
    margin: 5,
  },
  avatarImage: {
    width: "100%",
    height: "100%",
    resizeMode: "cover",
    borderRadius: 50,
  },
  initials: {
    textTransform: "uppercase",
    fontSize: 24,
    color: colors.primaryColor,
  },
});
