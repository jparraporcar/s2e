import React from "react";
import { ScrollView } from "react-native-gesture-handler";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import IconButton from "../components/IconButton";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { SCREEN_WIDTH } from "../const/dimensions";
import { RouteProp, useNavigation } from "@react-navigation/native";
import { RootStackParamList } from "../App";
import { colorsPalette } from "../const/colors";
import { fetchCourseSectionQuiz } from "../store/slices/actions";
import { StackNavigationProp } from "@react-navigation/stack";
import { CustomModal } from "../components/CustomModal";
import { LoadingSpinner } from "../components/LoadingSpinner";

type IndexCourseScreenRouteProp = RouteProp<
  RootStackParamList,
  "IndexCourseScreen"
>;

type PropsTimerScreen = {
  route: IndexCourseScreenRouteProp;
};

type CourseSectionScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  "CourseSectionQuizScreen"
>;

export const IndexCourseScreen: React.FC<PropsTimerScreen> = (
  props
): JSX.Element => {
  const navigation: CourseSectionScreenNavigationProp = useNavigation();
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
  const evalState = useAppSelector((state) => state.evaluation);
  return (
    <ScrollView contentContainerStyle={{ padding: 15 }}>
      {courseIndexStringParsed.map((topic: string, index: number) => (
        <TouchableOpacity
          key={index}
          style={styles.item}
          onPress={() => {
            // look for the sectionName in quiz state and if there is no quiz with the section
            // name then fetch the new quiz, navigate to the next page only when the
            // promise has been fullfilled and the loadingState has changed to received

            const quizItem = evalState.quizs.find(
              (el) => Object.keys(el[`${Number(goalId)}`])[0] === topic
            );
            console.log(quizItem, "quizItem");
            if (quizItem) {
              navigation.navigate("CourseSectionQuizScreen", {
                quizItem: quizItem,
              });
            } else {
              dispatch(
                fetchCourseSectionQuiz({
                  goalId: goalId,
                  sectionName: topic,
                  courseIndexString: courseIndexString,
                })
              );
            }
          }}
          activeOpacity={0.6}
        >
          <Text style={styles.title}>{topic}</Text>
        </TouchableOpacity>
      ))}
      <CustomModal animationType="fade" transparent={true} modalVisible={false}>
        <View style={{ paddingBottom: 200 }}>
          <LoadingSpinner />
        </View>
      </CustomModal>
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
