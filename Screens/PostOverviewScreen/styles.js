import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  screen: {
    backgroundColor: "#ffffff",
    display: "flex",
    flex: 1,
    paddingTop: 10,
    marginBottom: 20,
    position: "relative",
  },
  form: {
    display: "flex",
    flexDirection: "row",
    borderBottomWidth: 1,
    marginLeft: 5,
    marginRight: 5,
    alignItems: "center",
    borderColor: "#eee",
    paddingTop: 2,
    paddingBottom: 2,
  },
  buttons: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    alignItems: "center",
  },
  sendIcon: {
    marginRight: 10,
    padding: 3,
    alignSelf: "flex-end",
  },

  buttonLabelStyle: { fontSize: 10, marginLeft: 6, fontWeight: "bold" },
});

export default styles;
