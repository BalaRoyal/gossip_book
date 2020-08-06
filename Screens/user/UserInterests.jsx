import React, { useReducer } from "react";
import { ScrollView, View, StyleSheet } from "react-native";
import { Text } from "react-native-paper";
import colors from "../../constants/colors";
import InterestCard from "../../Components/shared-components/InterestCard";
import Button from "../../Components/shared-components/Button";
import { HeaderButtons, Item } from "react-navigation-header-buttons";
import HeaderButton from "../../Components/shared-components/HeaderButton";

const SELECT = "SELECT";
const DESELECT = "DESELECT";

const changeSelection = (state, id, value) => {
  const itemIndex = state.findIndex((item) => item.id === id);
  const newState = [...state];
  newState[itemIndex].selected = value;
  return newState;
};

const interestReducer = (state = [], { id, type }) => {
  switch (type) {
    case SELECT:
      return changeSelection(state, id, true);
    case DESELECT:
      return changeSelection(state, id, false);
    default:
      return state;
  }
};

const UserInterestScreen = (props) => {
  // handle card selected
  const interestList = [
    { label: "Technology", id: 1, selected: false, bgColor: "#006BA6" },
    { label: "Computer science", id: 15, selected: false, bgColor: "#16DB65" },
    { label: "Celebrities", id: 2, selected: false, bgColor: "#0496FF" },
    { label: "Art", id: 3, selected: false, bgColor: "#FFBC42" },
    { label: "Business", id: 4, selected: false, bgColor: "#D81159" },
    { label: "Autos", id: 5, selected: false, bgColor: "#8F2D56" },
    { label: "Animals", id: 6, selected: false, bgColor: "#F49097" },
    { label: "Comics", id: 7, selected: false, bgColor: "#7CA5B8" },
    { label: "Travel", id: 8, selected: false, bgColor: "#F5853F" },
    { label: "Design", id: 9, selected: false, bgColor: "#058C42" },
    { label: "Fashion", id: 10, selected: false, bgColor: "#16DB65" },
    { label: "Entertainment", id: 11, selected: false, bgColor: "#C6EBBE" },
    { label: "Social life", id: 12, selected: false, bgColor: "#7CA5B8" },
    { label: "Maths", id: 13, selected: false, bgColor: "#020887" },
    { label: "Religion", id: 14, selected: false, bgColor: "#38369A" },
  ];

  const [interests, interestDispatcher] = useReducer(
    interestReducer,
    interestList
  );

  // select interest
  const handleSelected = (id) =>
    interestDispatcher({
      id,
      type: SELECT,
    });

  // deselect interest
  const handleDeselect = (id) =>
    interestDispatcher({
      id,
      type: DESELECT,
    });

  const getSelected = () => interests.filter((item) => item.selected);

  const topics = interests.map((interest) => (
    <InterestCard
      handleSelected={() => handleSelected(interest.id)}
      handleDeselect={() => handleDeselect(interest.id)}
      selected={interest.selected}
      key={interest.id}
      bgColor={interest.bgColor}
    >
      {interest.label}
    </InterestCard>
  ));

  return (
    <ScrollView style={styles.screen}>
      <View style={styles.interestContainer}>
        <Text style={styles.headingText}>What excites you the most?.</Text>
        <View style={styles.interests}>{topics}</View>
      </View>
      <View style={{ width: "50%", alignSelf: "center" }}>
        <Button onPress={() => props.navigation.navigate("Posts")}>Next</Button>
      </View>
      <View style={{ margin: 40 }}></View>
    </ScrollView>
  );
};

export const userInterestScreenOptions = (navData) => {
  return {
    headerTitle: "",

    headerLeft: () => (
      <HeaderButtons HeaderButtonComponent={HeaderButton}>
        <Item
          title="Menu"
          iconName={
            Platform.OS === "android" ? "user-circle-0" : "user-circle-o"
          }
          iconSize={23}
          onPress={() => {
            navData.navigation.toggleDrawer();
          }}
        ></Item>
      </HeaderButtons>
    ),
  };
};

const styles = StyleSheet.create({
  interestContainer: {
    display: "flex",
  },
  screen: {
    display: "flex",
    backgroundColor: "#AC660C",
  },
  headingText: {
    margin: 10,
    fontWeight: "bold",
    color: colors.whiteColor,
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
export default UserInterestScreen;
