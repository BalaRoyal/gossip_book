import { StyleSheet } from 'react-native';

import colors from '../../constants/colors';

export default styles = StyleSheet.create({
  screen: {
    display: "flex",
    flex: 1,
    justifyContent: "center",
    backgroundColor: "#fff",
  },

  heading: {
    flex: 1,
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
});
