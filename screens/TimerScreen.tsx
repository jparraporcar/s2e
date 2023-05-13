import React, { useEffect } from "react";
import { View, Text, StyleSheet } from "react-native";
import Timer from "../components/Timer";
import IconButton from "../components/IconButton";
import { useAppDispatch } from "../store/hooks";
import { startTimer, stopTimer } from "../store/slices/timerSlice";
import { useAppSelector } from "../store/hooks";
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "../App";
import { RouteProp } from "@react-navigation/native";
import { updateGoalProgress } from "../store/slices/goalsListSlice";

type TimerScreenRouteProp = RouteProp<RootStackParamList, "TimerScreen">;

type PropsTimerScreen = {
  route: TimerScreenRouteProp;
};
export const TimerScreen: React.FC<PropsTimerScreen> = (props): JSX.Element => {
  const dispatch = useAppDispatch();
  const goalListState = useAppSelector((state) => state.goalsList);
  const goalTime = goalListState.goals.find(
    (goalItem) => goalItem.id === props.route.params.goalId
  )!.sesionTime;
  const timerState = useAppSelector((state) => state.timer);

  useEffect(() => {
    if (timerState.time !== 0) {
      dispatch(
        updateGoalProgress({
          id: props.route.params.goalId,
          sesionTime: timerState.time,
        })
      );
    }
  }, [timerState.time]);

  return (
    <View style={styles.containerMain}>
      <View>
        <Timer time={goalTime} />
      </View>
      <View style={styles.containerButtons}>
        <View>
          <IconButton
            disabled={false}
            iconName="play"
            iconSize={24}
            iconColor="black"
            actionTitle="Start"
            onPress={() => dispatch(startTimer())}
          />
        </View>
        <View>
          <IconButton
            disabled={false}
            iconName="stop"
            iconSize={24}
            iconColor="black"
            actionTitle="Stop"
            onPress={() => dispatch(stopTimer())}
          />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  containerMain: {
    justifyContent: "flex-start",
  },
  containerButtons: {
    marginTop: 20,
    flexDirection: "row",
    justifyContent: "space-evenly",
  },
});
