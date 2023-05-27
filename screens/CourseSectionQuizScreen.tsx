import React, { useState } from "react";
import { View, Text, Button, TouchableOpacity, StyleSheet } from "react-native";

interface Question {
  question: string;
  options: string[];
  answer: string;
}

interface QuizItem {
  [key: string]: {
    questions: Question[];
  };
}

export const CourseSectionQuizScreen: React.FC = (): JSX.Element => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);

  const quizData: QuizItem = {
    Limits: {
      questions: [
        {
          question:
            "What is the limit of f(x) = x^2 - 4x + 3 as x approaches 2?",
          options: ["1", "3", "4", "5"],
          answer: "1",
        },
        {
          question:
            "What is the limit of f(x) = (x^2 - 1)/(x - 1) as x approaches 1?",
          options: ["0", "1", "2", "undefined"],
          answer: "2",
        },
      ],
    },
    Derivatives: {
      questions: [
        {
          question: "What is the derivative of f(x) = 3x^2 - 2x + 1?",
          options: ["6x - 2", "6x + 2", "3x^2 - 2x", "3x^2 + 2x"],
          answer: "6x - 2",
        },
        {
          question: "What is the derivative of f(x) = sin(x) + cos(x)?",
          options: [
            "cos(x) - sin(x)",
            "cos(x) + sin(x)",
            "-cos(x) - sin(x)",
            "-cos(x) + sin(x)",
          ],
          answer: "cos(x) - sin(x)",
        },
      ],
    },
  };

  const currentQuestionSet = Object.values(quizData)[currentQuestionIndex];
  const currentQuestion = currentQuestionSet.questions[currentQuestionIndex];

  const handleAnswerSelect = (answer: string) => {
    setSelectedAnswer(answer);
  };

  const handleNextQuestion = () => {
    // Check the selected answer here for correctness
    // Your code to assess the correctness of the answer goes here

    // Move to the next question
    if (currentQuestionIndex < currentQuestionSet.questions.length - 1) {
      setSelectedAnswer(null);
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      // Quiz completed, handle completion
      // Your code to handle quiz completion goes here
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.questionText}>{currentQuestion.question}</Text>
      {currentQuestion.options.map((option, index) => (
        <TouchableOpacity
          key={index}
          onPress={() => handleAnswerSelect(option)}
          style={styles.optionButton}
        >
          <Text style={styles.optionText}>{option}</Text>
        </TouchableOpacity>
      ))}
      <Button
        title={
          currentQuestionIndex < currentQuestionSet.questions.length - 1
            ? "Next"
            : "Submit"
        }
        onPress={handleNextQuestion}
        disabled={!selectedAnswer}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "rgb(244, 218, 113)",
    padding: 16,
  },
  questionText: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 16,
  },
  optionButton: {
    backgroundColor: "white",
    padding: 10,
    marginBottom: 8,
    borderRadius: 4,
  },
  optionText: {
    fontSize: 14,
  },
});
