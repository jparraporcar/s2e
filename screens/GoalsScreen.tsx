import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { useAppSelector } from "../store/hooks";
import { IGoalsListItem } from "../store/slices/goalsListSlice";
import { GoalListItem } from "../components/GoalListItem";

export const GoalsScreen: React.FC = (): JSX.Element => {
  const goalsListState = useAppSelector((state) => state.goalsList);
  return (
    <View style={styles.containerMain}>
      {goalsListState.map((goal: IGoalsListItem) => (
        <Text key={goal.id}>{goal.id}</Text>
      ))}
      <GoalListItem
        todayPercentatge={80}
        weekPercentatge={60}
        overallPercentatge={85}
        goalName="Mathematics"
        resourceName="Great Book of maths"
        resourceType="Book"
      />
    </View>
  );
};

const styles = StyleSheet.create({
  containerMain: {
    justifyContent: "flex-start",
    alignItems: "center",
  },
});
