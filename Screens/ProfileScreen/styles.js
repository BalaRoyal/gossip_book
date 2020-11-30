import { Dimensions, StyleSheet } from 'react-native';

import colors from '../../constants/colors';

const HEIGHT = Dimensions.get("window").height;
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
  image: {
    resizeMode: "cover",
    height: HEIGHT / 2.5,
    position: "relative",
    textAlign: "center",
  },
  screen: {
    flex: 1,
    flexDirection: "column",
    backgroundColor: "white",
  },
  avatarImage: {
    width: 200,
    height: 200,
    backgroundColor: "#fff",
    position: "absolute",
    bottom: -60,
    alignSelf: "center",
    borderRadius: 100,
    borderWidth: 5,
    borderColor: "#f7f7f7",
    alignContent: "center",
    justifyContent: "center",
    overflow: "hidden",
  },
  profileImage: {
    width: 200,
    height: 200,
    borderRadius: 100,
  },
  nameContainer: {
    display: "flex",
    height: 100,
    alignItems: "center",
    justifyContent: "flex-end",
  },
  name: {
    fontSize: 24,
    color: colors.textColor,
    textTransform: "capitalize",
    fontWeight: "bold",
    fontFamily: "open-sans",
  },

  profileStats: {
    marginTop: 70,
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-around",
  },
  statValue: {
    fontSize: 20,
    fontWeight: "bold",
    color: colors.textColor,
    textAlign: "center",
  },
  statsLabel: {
    fontFamily: "open-sans",
    color: colors.textColorPrimary,
    textTransform: "uppercase",
    fontSize: 12,
    textAlign: "center",
  },
  followButton: {
    width: 200,
    alignSelf: "center",
    marginTop: 20,
  },
  chatButton: {
    position: "absolute",
    bottom: 20,
    right: 20,
    elevation: 3,
    shadowColor: "#333",
    shadowOffset: {
      width: 3,
      height: 3,
    },
    shadowOpacity: 0.7,
    backgroundColor: "#aaaa",
  },
});