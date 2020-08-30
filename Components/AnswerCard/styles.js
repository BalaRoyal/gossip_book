import { StyleSheet } from 'react-native';

import colors from '../../constants/colors';

export default styles = StyleSheet.create({
  card: {
    display: "flex",
    margin: 5,
    flexDirection: "row",
    borderColor: "#eee",
    borderBottomWidth: 1,
  },
  userAvatar: {
    height: 60,
    width: 60,
    backgroundColor: "#eee",
    borderRadius: 60,
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "center",
    overflow: "hidden",
  },
  answer: {
    flex: 1,
    padding: 10,
    marginLeft: 5,
  },
  text: {
    fontFamily: "open-sans",
    color: colors.textColor,
    lineHeight: 24,
    textAlign: "justify",
    padding: 4,
  },
  button: {
    fontSize: 12,
    alignSelf: "flex-start",
    margin: 10,
    borderRadius: 10,
  },
  title: {
    fontWeight: "bold",
    color: colors.textColor,
    padding: 5,
  },
  initials: {
    textTransform: "uppercase",
    fontSize: 24,
    color: colors.primaryColor,
  },
  avatarImage: {
    width: "100%",
    height: "100%",
  },
});
