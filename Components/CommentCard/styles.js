import { StyleSheet } from 'react-native';

import colors from '../../constants/colors';

export default styles = StyleSheet.create({
  comment: {
    display: "flex",
    flexDirection: "row",
    width: "80%",
    alignSelf: "center",
    margin: 10,
    padding: 10,
    borderRadius: 20,
    backgroundColor: "#f8f8f8",
  },
  avatar: {
    borderRadius: 100,
    backgroundColor: "#eee",
    width: 40,
    height: 40,
    justifyContent: "center",
    alignItems: "center",
  },
  textCommentContainer: {
    flex: 1,
    justifyContent: "space-evenly",
    marginLeft: 5,
    marginRight: 5,
    borderRadius: 20,
  },
  commentText: {
    padding: 10,
    fontFamily: "open-sans",
    color: colors.textColor,
  },
  avatarImage: {
    width: "100%",
    height: "100%",
    borderRadius: 50,
  },
  avatarInitials: {
    fontSize: 18,
    textTransform: "uppercase",
    color: colors.primaryColor,
  },
  username: {
    paddingLeft: 10,
    fontWeight: "600",
    color: colors.textColor,
  },
});
