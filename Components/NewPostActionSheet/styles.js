import { StyleSheet } from 'react-native';

import colors from '../../constants/colors';

export default StyleSheet.create({
  screen: {
    display: "flex",
    flex: 1,
    justifyContent: "center",
    backgroundColor: "#fff",
  },
  saveButton: {
    borderRadius: 100,
    width: 75,
  },

  inputContainer: {
    height: 200,
  },

  heading: {
    flex: 1,
    // backgroundColor: "yellowgreen",
  },
  postType: {
    display: "flex",
    flexDirection: "row",
    width: "100%",
    alignSelf: "center",
    marginTop: 10,
    backgroundColor: "#ffff",
  },
  searchBar: {
    flex: 1,
    minWidth: 300,
    backgroundColor: "#eee",
    elevation: 0,
    flexDirection: "row-reverse",
    marginTop: 10,
    marginRight: 10,
    maxWidth: 350,
    paddingLeft: 4,
  },
  searchInput: {
    backgroundColor: "#ccc",
    flexGrow: 1,
  },
  floatingButton: {
    backgroundColor: colors.highlighColor,
    height: 50,
    width: 50,
    position: "absolute",
    zIndex: 100,
    bottom: 20,
    right: 20,
    borderRadius: 50,
    elevation: 3,
    shadowColor: "#333",
    shadowOffset: {
      width: 1,
      height: 2,
    },
    shadowOpacity: 0.7,
  },
  actionSheetHeading: {
    paddingTop: 20,
    backgroundColor: colors.whiteColor,
    display: "flex",
    justifyContent: "space-between",
    flexDirection: "row",
    alignContent: "center",
    alignItems: "center",
  },
  closeActionSheet: {
    backgroundColor: "transparent",
    marginLeft: 30,
  },
  contentInput: {
    marginTop: 20,
    width: "90%",
    alignSelf: "center",
    padding: 20,
    fontSize: 16,
    fontFamily: "open-sans",
    color: colors.textColor,
  },
});
