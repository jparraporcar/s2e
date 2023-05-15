import React, { useEffect } from "react";
import { View, Text, StyleSheet } from "react-native";
import Timer from "../components/Timer";
import IconButton from "../components/IconButton";
import { useAppDispatch } from "../store/hooks";
import {
  initializeTimer,
  startTimer,
  stopTimer,
} from "../store/slices/timerSlice";
import { useAppSelector } from "../store/hooks";
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "../App";
import { RouteProp } from "@react-navigation/native";
import { initializeSesion, updateSesion } from "../store/slices/goalsListSlice";
import { createSesionDayString } from "../utils/utils";

type TimerScreenRouteProp = RouteProp<RootStackParamList, "TimerScreen">;

type PropsTimerScreen = {
  route: TimerScreenRouteProp;
};
export const TimerScreen: React.FC<PropsTimerScreen> = (props): JSX.Element => {
  const goalId = props.route.params.goalId;
  const dispatch = useAppDispatch();
  const goalsListState = useAppSelector((state) => state.goalsList);
  // every time the screen is loaded, a string with the actual day is created
  const sesionDayString = createSesionDayString();
  // in the current loaded goal look for an already existing sesion of the actual day if it exists
  const sesion = goalsListState.goals
    .find((goal) => goal.id === goalId)!
    .sesions.filter((sesion) => sesion.sesionDayString === sesionDayString);
  // look for the index of the sesion in the sesions array, if existing otherwise = -1
  const sesionIndex = goalsListState.goals
    .find((goal) => goal.id === goalId)!
    .sesions.findIndex((sesion) => sesion.sesionDayString === sesionDayString);
  // look for the goal index (it will always be defined due to navigating to this screen with a goalId)
  const goalIndex = goalsListState.goals.findIndex(
    (goal) => goal.id === goalId
  );
  const timerState = useAppSelector((state) => state.timerList);
  const timerGoalIndex = useAppSelector(
    (state) => state.timerList.timers
  ).findIndex((timer) => timer.goalId === goalId);
  // initialize timer if there is not timer existing for the current goal (1 timer/goal)
  // this effect updates the timerState and triggers the useEffect2
  // useEffect1
  useEffect(() => {
    if (timerGoalIndex === -1) {
      // timer initialized for the loaded goal. This happens only first time the user clicks in the goal
      // and loads this screen. After the first time this condition is not fullfilled since
      // timerGoalIndex !== -1
      dispatch(initializeTimer({ goalId: goalId }));
    }
  }, []);

  // initialize sesion in case there is no sesion existing sesion for the current day
  // it is triggered after the timerState has been properly initialized (if necessary)
  useEffect(() => {
    if (sesionIndex === -1 && timerGoalIndex !== -1) {
      dispatch(
        initializeSesion({
          goalIndex: goalIndex,
          sesionTiming: {
            sesionDayString: sesionDayString,
            elapsedTimeSec: timerState.timers[timerGoalIndex].time,
            startTimeSec: Math.floor(Date.now() / 1000),
          },
        })
      );
    }
    // this condition is fullfilled when the timer has not yet been initialized
    // in that case the sesion cannot be initialized
    if (sesionIndex === -1 && timerGoalIndex === -1) {
      return;
    }
    // this condition is fullfilled when the sesion has been already initialized which means that
    // the timer was also initialized beforehand. Plus the start button has been clicked which turns
    // the isRunning state to true. In this case the sesion must be updated every time the goalID
    // timer ticker changes
    if (
      sesionIndex !== -1 &&
      timerGoalIndex !== -1 &&
      timerState.timers[timerGoalIndex].isRunning === true
    ) {
      dispatch(
        updateSesion({
          sesionIndex: sesionIndex,
          goalIndex: goalIndex,
          sesionTiming: {
            sesionDayString: sesion[sesionIndex].sesionDayString,
            elapsedTimeSec: timerState.timers[timerGoalIndex].time,
            startTimeSec: sesion[sesionIndex].startTimeSec,
          },
        })
      );
    }
  }, [timerState]);

  return (
    <View style={styles.containerMain}>
      <View>
        <Timer
          time={
            sesion.length > 0 && timerGoalIndex !== -1
              ? timerState.timers[timerGoalIndex].time
              : 0
          }
        />
      </View>
      <View style={styles.containerButtons}>
        <View>
          <IconButton
            disabled={false}
            iconName="play"
            iconSize={24}
            iconColor="black"
            actionTitle="Start"
            onPress={() => dispatch(startTimer({ goalId: goalId }))}
          />
        </View>
        <View>
          <IconButton
            disabled={false}
            iconName="stop"
            iconSize={24}
            iconColor="black"
            actionTitle="Stop"
            onPress={() => dispatch(stopTimer({ goalId: goalId }))}
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
