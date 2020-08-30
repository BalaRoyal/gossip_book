import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  screen: {
    backgroundColor: "#ffffff",
    display: "flex",
    flex: 1,
    paddingTop: 10,
    marginBottom: 20,
  },
  form: {
    display: "flex",
    flexDirection: "row",
    borderBottomWidth: 1.5,
    borderTopWidth: 1.5,
    marginLeft: 5,
    marginRight: 5,
    justifyContent: "center",
    alignItems: "center",
    borderColor: "#ddd",
    paddingTop: 2,
    paddingBottom: 2,
  },
  buttons: {
    display: "flex",
    flexDirection: "row",
    alignSelf: "flex-start",
  },
  inputContainer: {
    flex: 1,
    borderRadius: 20,
    flexDirection: "row",
    borderColor: "#eeee",
    borderWidth: 1,
    marginRight: 3,
  },
  input: {
    flex: 1,
    borderRadius: 20,
    paddingLeft: 10,
    maxHeight: 100,
  },
  sendIcon: {
    marginRight: 10,
    padding: 3,
    alignSelf: "flex-end",
  },
  voteButton: {
    width: 60,
  },
  buttonLabelStyle: { fontSize: 10, marginLeft: 6, fontWeight: "bold" },
});

export default styles;
