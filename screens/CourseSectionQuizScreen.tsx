import { RouteProp } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Button,
  ScrollView,
} from "react-native";
import { RootStackParamList } from "../App";
import { colorsPalette } from "../const/colors";
import { Question } from "../store/slices/evaluationSlice";

type CourseSectionQuizScreen = RouteProp<
  RootStackParamList,
  "CourseSectionQuizScreen"
>;

type PropsCourseSectionQuizScreen = {
  route: CourseSectionQuizScreen;
};

type CourseSectionScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  "CourseSectionQuizScreen"
>;

export const CourseSectionQuizScreen: React.FC<PropsCourseSectionQuizScreen> = (
  props
): JSX.Element => {
  const [data, setData] = useState(props.route.params.quizItem);
  const [selections, setSelections] = useState<{ [key: string]: string }>({});

  const selectOption = (questionName: string, option: string) => {
    setSelections((prevSelections) => ({
      ...prevSelections,
      [questionName]: option,
    }));
  };

  const calculateScore = () => {
    let correctCount = 0;
    const allQuestions = [
      ...data.subsection1.questions,
      ...data.subsection2.questions,
    ];

    allQuestions.forEach((question) => {
      if (selections[question.questionName] === question.correct) {
        correctCount++;
      }
    });

    const score = (correctCount / allQuestions.length) * 10;
    console.log(`Your score is ${score}`);
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.sectionTitle}>{data.sectionName}</Text>
      <View style={styles.subsectionContainer}>
        <Text style={styles.subsectionTitle}>
          {data.subsection1.subsectionName}
        </Text>
        {data.subsection1.questions.map((question, index) => (
          <View key={index}>
            <Text>{question.questionName}</Text>
            {["a", "b", "c"].map((option) => (
              <TouchableOpacity
                key={option}
                style={[
                  styles.button,
                  selections[question.questionName] ===
                    question[option as keyof Question] && styles.selectedOption,
                ]}
                onPress={() =>
                  selectOption(
                    question.questionName,
                    question[option as keyof Question]
                  )
                }
              >
                <Text style={styles.buttonText}>
                  {question[option as keyof Question]}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        ))}
      </View>
      <View style={styles.subsectionContainer}>
        <Text style={styles.subsectionTitle}>
          {data.subsection2.subsectionName}
        </Text>
        {data.subsection2.questions.map((question, index) => (
          <View key={index}>
            <Text>{question.questionName}</Text>
            {["a", "b", "c"].map((option) => (
              <TouchableOpacity
                key={option}
                style={[
                  styles.button,
                  selections[question.questionName] ===
                    question[option as keyof Question] && styles.selectedOption,
                ]}
                onPress={() =>
                  selectOption(
                    question.questionName,
                    question[option as keyof Question]
                  )
                }
              >
                <Text style={styles.buttonText}>
                  {question[option as keyof Question]}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        ))}
      </View>
      <Button
        title="Submit"
        onPress={calculateScore}
        color={colorsPalette.primary_yellow_100}
      />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: "bold",
    color: colorsPalette.primary_yellow_100,
  },
  subsectionContainer: {
    marginVertical: 16,
  },
  subsectionTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: colorsPalette.primary_yellow_90,
  },
  button: {
    backgroundColor: "transparent",
    padding: 10,
    marginVertical: 5,
  },
  buttonText: {
    color: "black",
  },
  selectedOption: {
    backgroundColor: colorsPalette.primary_yellow_90,
  },
});

export default CourseSectionQuizScreen;
