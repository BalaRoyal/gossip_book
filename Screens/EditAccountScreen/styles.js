import { StyleSheet } from 'react-native';

import colors from '../../constants/colors';

export default styles = StyleSheet.create({
  formContainer: {
    width: "90%",
    marginBottom: 100,
    flex: 1,
  },
  formHeading: {
    fontWeight: "500",
    textTransform: "uppercase",
    color: colors.textColor,
  },
});
