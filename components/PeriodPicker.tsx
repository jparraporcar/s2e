import { Text } from "@rneui/base";
import React from "react";
import { Dimensions, StyleSheet, View } from "react-native";
import { CustomDatePicker } from "./CustomDatePicker";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { setPeriodFinal, setPeriodInitial } from "../store/slices/goalSlice";

const SCREEN_WIDTH = Dimensions.get("window").width;

export const PeriodPicker: React.FC = () => {
  const periodState = useAppSelector((state) => state.goal.period);
  const dispatch = useAppDispatch();
  const onChangeInitialDay = (date: Date) =>
    dispatch(setPeriodInitial(date.toISOString().substring(0, 10)));
  const onChangeFinalDay = (date: Date) =>
    dispatch(setPeriodFinal(date.toISOString().substring(0, 10)));

  console.log(periodState);
  return (
    <View style={styles.mainContainer}>
      <View>
        <CustomDatePicker
          onChangeDate={onChangeInitialDay}
          date={new Date(periodState.initialDay)}
        />
      </View>
      <View style={styles.toContainer}>
        <Text>to</Text>
      </View>
      <View>
        <CustomDatePicker
          onChangeDate={onChangeFinalDay}
          date={new Date(periodState.finalDay)}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
    height: 70,
    width: SCREEN_WIDTH,
    marginLeft: 10,
  },
  periodContainer: {},
  toContainer: {
    justifyContent: "center",
    marginBottom: 20,
  },
});
