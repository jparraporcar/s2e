import React from "react";
import { View, Text } from "react-native";
import { useAppSelector } from "../store/hooks";
import { IGoalsListItem } from "../store/slices/goalsListSlice";

export const GoalsScreen: React.FC = (): JSX.Element => {
  const goalsListState = useAppSelector((state) => state.goalsList);
  return (
    <View>
      {goalsListState.map((goal: IGoalsListItem) => (
        <Text key={goal.id}>{goal.id}</Text>
      ))}
    </View>
  );
};
