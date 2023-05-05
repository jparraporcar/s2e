import React from "react";
import { Dimensions, StyleSheet, Text, View } from "react-native";
import { colorsPalette } from "../const/colors";
import { TouchableWithoutFeedback } from "react-native-gesture-handler";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import goalSlice, {
  IGoalState,
  toggleSelectedDay,
} from "../store/slices/goalSlice";
import { DayView } from "./DayView";

const SCREEN_WIDTH = Dimensions.get("window").width;
// TODO: how to transform the keys in IGoalState into an array like the following
// and in general make the typing easier in this component
const daysArray = [
  "monday",
  "tuesday",
  "wednesday",
  "thursday",
  "friday",
  "saturday",
  "sunday",
];

export const Dedication: React.FC = (): JSX.Element => {
  const goalState = useAppSelector((state) => state.goal);
  const dispatch = useAppDispatch();
  console.log(goalState.dedication);
  return (
    <View style={styles.mainContainer}>
      {daysArray.map((dayEl: string, index: number) => (
        <DayView
          weekday={dayEl}
          onPress={() =>
            dispatch(
              toggleSelectedDay({
                day: dayEl as keyof IGoalState["dedication"],
              })
            )
          }
          customStyles={{
            weekContainer: {
              backgroundColor: goalState.dedication[
                dayEl as keyof IGoalState["dedication"]
              ].isSelected
                ? colorsPalette.primary_yellow_100
                : colorsPalette.secondary_grey_80,
            },
          }}
        />
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    flexDirection: "row",
    borderWidth: 0.5,
    justifyContent: "center",
    alignItems: "center",
    width: SCREEN_WIDTH - 40,
    borderRadius: 10,
    backgroundColor: colorsPalette.primary_yellow_80,
  },
});
