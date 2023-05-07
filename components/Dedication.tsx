import React, { useState } from "react";
import { Dimensions, Modal, StyleSheet, Text, View } from "react-native";
import { colorsPalette } from "../const/colors";
import { TouchableWithoutFeedback } from "react-native-gesture-handler";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import goalSlice, {
  IGoalState,
  setCurrentToggleDay,
  setDedicationHours,
  toggleSelectedDay,
} from "../store/slices/goalSlice";
import { DayView } from "./DayView";
import { CustomTimePicker } from "./CustomTimePicker";

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
  const [showCustomPicker, setShowCustomPicker] = useState<boolean | undefined>(
    false
  );
  const goalState = useAppSelector((state) => state.goal);
  const dispatch = useAppDispatch();
  return (
    <>
      <Modal
        animationType="slide"
        transparent={true}
        visible={showCustomPicker}
      >
        <View style={styles.modalContainer}>
          <CustomTimePicker
            dispatchAction={(
              day: keyof IGoalState["dedication"],
              hours: number
            ) => dispatch(setDedicationHours({ day: day, hours: hours }))}
            onPressAccept={() => setShowCustomPicker(false)}
            currentToggleDay={goalState.currentToggleDay}
          />
        </View>
      </Modal>
      <View style={styles.mainContainer}>
        {daysArray.map((dayEl: string, index: number) => (
          <DayView
            key={index}
            weekday={dayEl}
            onPress={() => {
              if (
                !goalState.dedication[dayEl as keyof IGoalState["dedication"]]
                  .isSelected
              ) {
                setShowCustomPicker(true);
              }
              dispatch(
                setCurrentToggleDay(dayEl as keyof IGoalState["dedication"])
              );
              dispatch(
                toggleSelectedDay({
                  day: dayEl as keyof IGoalState["dedication"],
                })
              );
            }}
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
    </>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    flexDirection: "row",
    borderWidth: 0.5,
    justifyContent: "space-evenly",
    alignItems: "center",
    width: SCREEN_WIDTH - 40,
    borderRadius: 10,
    backgroundColor: colorsPalette.primary_yellow_80,
    paddingHorizontal: 3,
  },
  modalContainer: {
    flex: 1,
    justifyContent: "flex-end",
  },
});
