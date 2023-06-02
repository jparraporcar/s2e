import React, { useEffect, useState } from "react";
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
import { initializeLoadingState } from "../store/slices/evaluationSlice";

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
  const [indexSectionSelected, setIndexSectionSelected] = useState<{
    topic: string | undefined;
    goalId: number | undefined;
  }>({
    topic: undefined,
    goalId: undefined,
  });
  const courseIndexString = goalsListState.goals[goalIndex].indexCourse.value;
  console.log(courseIndexString);
  const courseIndexStringParsed = JSON.parse(courseIndexString);
  const evalState = useAppSelector((state) => state.evaluation);
  const [modalVisible, setModalVisible] = useState<boolean>(false);

  useEffect(() => {
    if (evalState.loadingState === "received") {
      const quizItem = evalState.quizs[
        `${Number(indexSectionSelected.goalId)}`
      ].quizItem.find(
        (quiz) => quiz.sectionName === indexSectionSelected.topic
      );
      navigation.navigate("CourseSectionQuizScreen", {
        quizItem: quizItem!,
      });
      setModalVisible(false);
    } else if (evalState.loadingState === "error") {
      setModalVisible(false);
    }
  }, [evalState]);

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

            const goalKey = Object.keys(evalState.quizs).find(
              (key) => Number(key) === goalId
            );
            console.log(goalKey, "goalKey");
            console.log(
              evalState.quizs[Number(goalKey)],
              "evalState.quizs[Number(goalKey)]"
            );
            const quizItem = goalKey
              ? evalState.quizs[`${Number(goalKey)}`].quizItem.find(
                  (quiz) => quiz.sectionName === topic
                )
              : undefined;
            setIndexSectionSelected({ goalId: Number(goalKey), topic: topic });
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
              setModalVisible(true);
            }
          }}
          activeOpacity={0.6}
        >
          <Text style={styles.title}>{topic}</Text>
        </TouchableOpacity>
      ))}
      <CustomModal
        animationType="fade"
        transparent={true}
        modalVisible={modalVisible}
      >
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
