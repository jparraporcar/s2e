import React from "react";
import { ScrollView } from "react-native-gesture-handler";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import IconButton from "../components/IconButton";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { SCREEN_WIDTH } from "../const/dimensions";
import { RouteProp } from "@react-navigation/native";
import { RootStackParamList } from "../App";
import { colorsPalette } from "../const/colors";
import { fetchCourseSectionQuiz } from "../store/slices/actions";

type IndexCourseScreenRouteProp = RouteProp<
  RootStackParamList,
  "IndexCourseScreen"
>;

type PropsTimerScreen = {
  route: IndexCourseScreenRouteProp;
};

export const IndexCourseScreen: React.FC<PropsTimerScreen> = (
  props
): JSX.Element => {
  const dispatch = useAppDispatch();
  const goalId = props.route.params.goalId;
  const goalsListState = useAppSelector((state) => state.goalsList);
  const goalIndex = goalsListState.goals.findIndex(
    (goal) => goal.goalId === goalId
  );
  const courseIndexString = goalsListState.goals[
    goalIndex
  ].indexCourse.value.replace(/'/g, '"');
  const courseIndexStringParsed = JSON.parse(courseIndexString);
  return (
    <ScrollView contentContainerStyle={{ padding: 15 }}>
      {courseIndexStringParsed.map((topic: string, index: number) => (
        <TouchableOpacity
          key={index}
          style={styles.item}
          onPress={() =>
            dispatch(
              fetchCourseSectionQuiz({
                sectionName: topic,
                courseIndexString: courseIndexString,
              })
            )
          }
          activeOpacity={0.6}
        >
          <Text style={styles.title}>{topic}</Text>
        </TouchableOpacity>
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  item: {
    backgroundColor: colorsPalette.primary_yellow_80,
    padding: 20,
    marginVertical: 8,
  },
  title: {
    fontSize: 18,
  },
});
