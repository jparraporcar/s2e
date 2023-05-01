import React from "react";
import {
  Animated,
  StyleSheet,
  Text,
  View,
  Dimensions,
  Pressable,
} from "react-native";
import Swipeable from "react-native-gesture-handler/Swipeable";
import Ionicons from "react-native-vector-icons/Ionicons";
import { useTheme } from "@react-navigation/native";
import { colorsPalette } from "../const/colors";

const SCREEN_WIDTH = Dimensions.get("window").width;

export const Resource: React.FC = () => {
  const { colors } = useTheme();
  const renderLeftActions = () => {
    return (
      <Pressable
        onPress={() => console.log("pressed")}
        style={({ pressed }) => pressed && styles.pressed}
      >
        <View style={styles.containerLeftAction}>
          <Ionicons name="trash-outline" size={28} color="black" />
        </View>
      </Pressable>
    );
  };

  return (
    <Swipeable renderLeftActions={renderLeftActions}>
      <View style={styles.containerSwipeable}>
        <Text>Name:</Text>
        <Text>Author:</Text>
        <Text>Pages:</Text>
        <Text>Year:</Text>
      </View>
    </Swipeable>
  );
};

const styles = StyleSheet.create({
  containerSwipeable: {
    borderWidth: 0.5,
    width: SCREEN_WIDTH,
    height: 75,
    backgroundColor: colorsPalette.primary_yellow_90,
    borderColor: colorsPalette.secondary_grey_borders_100,

    justifyContent: "center",
    alignItems: "flex-start",
    paddingLeft: 15,
    paddingVertical: 5,
  },
  containerLeftAction: {
    height: 75,
    borderWidth: 0.5,
    borderBottomLeftRadius: 10,
    borderTopLeftRadius: 10,
    borderColor: colorsPalette.secondary_grey_borders_100,
    backgroundColor: colorsPalette.primary_yellow_80,

    justifyContent: "center",
    width: 75,
    alignItems: "center",
  },
  pressed: { opacity: 0.6 },
});
