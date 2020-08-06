import React from "react";
import { StyleSheet, View, Text, Image } from "react-native";
import colors from "../../constants/colors";

const ContentCard = (props) => {
  return (
    <View style={styles.card}>
      <View style={styles.cardHeading}>
        <View style={styles.userAvatar}></View>
        <View style={styles.userInfo}>
          <Text style={styles.username}> Mwibutsa Floribert </Text>
          <Text style={styles.time}> 10:57 am </Text>
        </View>
        <View style={styles.VoteStat}></View>
      </View>

      <View style={styles.cardImage}>
        <Image
          source={{
            uri: "https://fakeimg.pl/640x360",
          }}
          style={styles.image}
        />
      </View>
      <View style={styles.cardText}>
        <Text style={styles.cardText}>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Nemo, id.
          Lorem ipsum dolor.
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.whiteColor,
    width: "90%",
    margin: 5,
    alignSelf: "center",
    borderRadius: 4,
    marginBottom: 10,
    padding: 4,
    borderWidth: 0.5,
    borderColor: "#cccc",
  },
  username: {
    fontWeight: "400",
    color: colors.textColorPrimary,
    fontSize: 13,
  },
  cardHeading: {
    padding: 3,
    display: "flex",
    flexDirection: "row",
  },
  userAvatar: {
    backgroundColor: "#eee",
    padding: 10,
    width: 60,
    height: 60,
    borderRadius: 60,
  },
  userInfo: {
    flex: 1,
    alignSelf: "center",
    fontSize: 12,
    fontFamily: "open-sans",
  },
  VoteStat: {
    padding: 2,
    flex: 1,
    alignSelf: "center",
    backgroundColor: colors.brownColor,
  },
  cardImage: {},
  image: {
    minHeight: 150,
    width: "100%",
    maxHeight: 300,
  },
  cardText: {
    lineHeight: 24,
    color: colors.textColor,
    fontFamily: "open-sans",
    padding: 5,
    textAlign: "justify",
  },
  time: {
    color: colors.accentColor,
    fontSize: 8,
  },
});

export default ContentCard;
