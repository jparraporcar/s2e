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
  Modal,
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
  const [modalVisible, setModalVisible] = useState(false);
  const [results, setResults] = useState<{
    score: number;
    correctAnswers: string[];
  }>({ score: 0, correctAnswers: [] });
  const [correctAnswers, setCorrectAnswers] = useState<string[]>([]);

  const selectOption = (questionName: string, option: string) => {
    setSelections((prevSelections) => ({
      ...prevSelections,
      [questionName]: option,
    }));
  };

  const calculateScore = () => {
    let correctCount = 0;
    const allQuestions = [...data.subsection.questions];
    let results = [] as any;

    allQuestions.forEach((question) => {
      if (
        selections[question.questionName] ===
        question[question.correct as keyof Question]
      ) {
        correctCount++;
        results.push(`${question.questionName}: Correct`);
      } else {
        results.push(
          `${question.questionName}: Incorrect. Correct answer: ${
            question[question.correct as keyof Question]
          }`
        );
      }
    });

    const quizScore = (correctCount / allQuestions.length) * 10;

    setResults({ score: quizScore, correctAnswers: results });

    setModalVisible(true);
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.modalTextScore}>
              Your score is {results.score}
            </Text>
            {results.correctAnswers.map((answer, index) => (
              <Text key={index} style={styles.modalTextAnswer}>
                {answer}
              </Text>
            ))}
            <Button
              title="Close"
              onPress={() => setModalVisible(!modalVisible)}
              color={colorsPalette.primary_yellow_100}
            />
          </View>
        </View>
      </Modal>
      <Text style={styles.sectionTitle}>{data.sectionName}</Text>
      <View style={styles.subsectionContainer}>
        <Text style={styles.subsectionTitle}>
          {data.subsection.subsectionName}
        </Text>
        {data.subsection.questions.map((question, index) => (
          <View key={index} style={styles.questionContainer}>
            <Text>{`${index + 1}) ${question.questionName}`}</Text>
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
                  {`${option}) ${question[option as keyof Question]}`}
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
    marginBottom: 10,
    fontWeight: "bold",
    color: colorsPalette.primary_yellow_100,
  },
  subsectionContainer: {
    marginVertical: 10,
  },
  subsectionTitle: {
    fontSize: 20,
    marginBottom: 10,
    fontWeight: "bold",
    color: colorsPalette.primary_yellow_100,
  },
  questionContainer: {
    marginVertical: 10,
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
    backgroundColor: colorsPalette.primary_yellow_80,
    borderWidth: 0.5,
    borderRadius: 5,
    borderColor: colorsPalette.secondary_grey_90,
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  modalTextScore: {
    marginBottom: 15,
    textAlign: "center",
    fontSize: 20,
    fontWeight: "bold",
  },
  modalTextAnswer: {
    marginBottom: 10,
    textAlign: "center",
    fontSize: 16,
  },
});

export default CourseSectionQuizScreen;
