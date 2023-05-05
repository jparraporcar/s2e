import React from "react";
import {
  StyleSheet,
  Text,
  TextStyle,
  TouchableWithoutFeedback,
  View,
  ViewStyle,
} from "react-native";

interface IPropsDayView {
  weekday: string;
  onPress: () => void;
  customStyles?: {
    weekContainer?: ViewStyle;
    weekDayText?: TextStyle;
  };
}

export const DayView: React.FC<IPropsDayView> = (props): JSX.Element => {
  return (
    <TouchableWithoutFeedback onPress={props.onPress}>
      <View style={[styles.weekContainer, props.customStyles?.weekContainer]}>
        <Text style={styles.weekDayText}>
          {props.weekday.charAt(0).toUpperCase() +
            props.weekday.substring(1, 3)}
        </Text>
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  weekContainer: {
    justifyContent: "center",
    alignItems: "center",
    height: 40,
    width: 40,
    borderWidth: 1,
    borderRadius: 20,
    padding: 5,
    margin: 1.5,
  },
  weekDayText: {
    fontSize: 12,
  },
});
