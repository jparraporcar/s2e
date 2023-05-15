import React, { useEffect } from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";
import { useAppSelector } from "../store/hooks";
import { GoalsItem } from "../store/slices/goalsListSlice";
import { GoalListItem } from "../components/GoalListItem";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const GoalsScreen: React.FC = (): JSX.Element => {
  // Logic to clear AsyncStorage.
  // TODO: create an async thunk to execute this code
  // useEffect(() => {
  //   const handleClearStorage = async () => {
  //     try {
  //       await AsyncStorage.removeItem("persist:timerList");
  //       await AsyncStorage.removeItem("persist:goals");
  //       console.log("Keys removed from AsyncStorage");
  //     } catch (error) {
  //       console.error("Error removing key from AsyncStorage: ", error);
  //     }
  //   };
  //   handleClearStorage();
  // }, []);

  const goalsListState = useAppSelector((state) => state.goalsList);
  return (
    <ScrollView contentContainerStyle={styles.containerMain}>
      {goalsListState.goals.map((goal: GoalsItem) => (
        <GoalListItem
          key={goal.id}
          goalId={goal.id}
          todayPercentatge={goal.percentatges.today}
          weekPercentatge={goal.percentatges.week}
          overallPercentatge={goal.percentatges.month}
          goalName={goal.goalData.name}
          resourceType={goal.currentResource}
          goalData={goal.goalData}
        />
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  containerMain: {
    justifyContent: "flex-start",
    alignItems: "center",
  },
});
