import React from "react";
import {
  Animated,
  StyleSheet,
  Text,
  View,
  Dimensions,
  Pressable,
  ViewStyle,
} from "react-native";
import Swipeable from "react-native-gesture-handler/Swipeable";
import Ionicons from "react-native-vector-icons/Ionicons";
import { useTheme } from "@react-navigation/native";
import { colorsPalette } from "../const/colors";
import { TBook, TCourse } from "../store/slices/goalSlice";

const SCREEN_WIDTH = Dimensions.get("window").width;

type TResource = TBook | TCourse;

interface IPropsResource {
  inputGeneric?: { [key: string]: string };
  inputResource?: TResource;
  customStyles?: {
    ["containerSwipeable"]?: ViewStyle;
    ["containerLeftAction"]?: ViewStyle;
  };
  onPressDelete: () => void;
}

export const Resource: React.FC<IPropsResource> = (props) => {
  const { colors } = useTheme();

  const handleOnPressDelete = () => {
    props.onPressDelete();
  };
  const renderLeftActions = () => {
    return (
      <Pressable
        onPress={handleOnPressDelete}
        style={({ pressed }) => pressed && styles.pressed}
      >
        <View
          style={[
            styles.containerLeftAction,
            props.customStyles && props.customStyles.containerLeftAction
              ? props.customStyles.containerLeftAction
              : undefined,
          ]}
        >
          <Ionicons name="trash-outline" size={28} color="black" />
        </View>
      </Pressable>
    );
  };

  return (
    <Swipeable renderLeftActions={renderLeftActions}>
      <View
        style={[
          styles.containerSwipeable,
          props.customStyles && props.customStyles.containerSwipeable
            ? props.customStyles.containerSwipeable
            : undefined,
        ]}
      >
        {props.inputResource
          ? Object.keys(props.inputResource).map((key, index) => (
              <Text key={index}>{`${key}: ${
                props.inputResource![key as keyof TResource]
              }`}</Text>
            ))
          : ""}
      </View>
    </Swipeable>
  );
};

const styles = StyleSheet.create({
  containerSwipeable: {
    marginTop: 10,
    borderWidth: 0.5,
    width: SCREEN_WIDTH,
    height: 75,
    backgroundColor: colorsPalette.primary_yellow_90,
    borderColor: colorsPalette.secondary_grey_100,
    justifyContent: "center",
    alignItems: "flex-start",
    paddingLeft: 15,
    paddingVertical: 5,
  },
  containerLeftAction: {
    marginTop: 20,
    height: 75,
    borderWidth: 0.5,
    borderBottomLeftRadius: 10,
    borderTopLeftRadius: 10,
    borderColor: colorsPalette.secondary_grey_100,
    backgroundColor: colorsPalette.primary_yellow_80,
    justifyContent: "center",
    width: 75,
    alignItems: "center",
  },
  pressed: { opacity: 0.6 },
});
