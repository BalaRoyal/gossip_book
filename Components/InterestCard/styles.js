import { StyleSheet } from 'react-native';

import colors from '../../constants/colors';

export default styles = StyleSheet.create({
  card: {
    justifyContent: "flex-end",
    width: 100,
    height: 100,
    margin: 4,
    backgroundColor: colors.whiteColor,
    padding: 8,
    borderRadius: 10,
    fontWeight: "bold",
  },
  text: {
    fontWeight: "600",
    color: colors.whiteColor,
  },
  checkMark: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
  },
});
