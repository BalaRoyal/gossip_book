import { StyleSheet } from 'react-native';

import colors from '../../constants/colors';

export default styles = StyleSheet.create({
  profileAvatar: {
    backgroundColor: "#eeee",
    width: 200,
    height: 200,
    borderRadius: 100,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: -50,
    zIndex: 1,
    position: "relative",
  },
  content: {
    width: "95%",
    padding: 30,
    backgroundColor: colors.whiteColor,
    borderRadius: 10,
    paddingTop: 50,
  },
  label: {
    fontWeight: "600",
    color: colors.textColor,
    lineHeight: 32,
  },
  infoContainer: {
    display: "flex",
    flexDirection: "row",
    borderBottomColor: "#eee",
    borderBottomWidth: 1,
    marginBottom: 20,
  },
  text: {
    lineHeight: 32,
    marginLeft: 20,
    color: colors.textColor,
    fontFamily: "open-sans",
  },
  followersStat: {
    display: "flex",
    flexDirection: "row",
    backgroundColor: "#eeee",
    padding: 10,
    justifyContent: "space-evenly",
    margin: 5,
    borderRadius: 10,
    flexWrap: "wrap",
  },
  followStat: {
    textTransform: "uppercase",
    fontWeight: "500",
    color: colors.textColor,
  },
  cameraIcon: {
    position: "absolute",
    bottom: 10,
    right: 0,
    borderRadius: 50,
    backgroundColor: colors.highlighColor,
  },
});
