import { StyleSheet } from 'react-native';

import colors from '../../constants/colors';

export default styles = StyleSheet.create({
  interestContainer: {
    display: "flex",
  },
  screen: {
    display: "flex",
    backgroundColor: "#fff",
  },
  headingText: {
    margin: 10,
    fontWeight: "bold",
    color: colors.textColor,
    fontSize: 22,

    fontFamily: "open-sans",
    fontWeight: "600",
    alignSelf: "center",
  },

  interests: {
    display: "flex",
    flexDirection: "row",
    width: "100%",
    flexWrap: "wrap",
    justifyContent: "center",
  },
});
