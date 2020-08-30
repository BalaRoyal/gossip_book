import { StyleSheet } from 'react-native';

import colors from '../../constants/colors';

export default styles = StyleSheet.create({
  screen: {
    justifyContent: "center",
    flexDirection: "column",
    flex: 1,
    backgroundColor: "#ffffff",
    justifyContent: "space-evenly",
    paddingBottom: 50,
  },
  buttonContainer: {
    marginLeft: "auto",
    marginRight: "auto",
  },
  welcomeText: {
    textAlign: "center",
    padding: 10,
    fontSize: 24,
    fontWeight: "300",
    margin: 20,
    lineHeight: 40,
    letterSpacing: 1.5,
    color: colors.textColor,
  },
  logoContainer: {
    borderColor: "red",
    display: "flex",
    justifyContent: "center",
  },
  logoImage: {
    width: 150,
    height: 150,
    marginLeft: "auto",
    marginRight: "auto",
  },
});
