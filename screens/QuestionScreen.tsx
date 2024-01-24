import React, { useCallback, useEffect, useState } from "react";
import {
  Text,
  StyleSheet,
  SafeAreaView,
  StatusBar,
  FlatList,
  TouchableOpacity,
  RefreshControl,
  View,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import QUESTIONS from "../mock/questions.json";
import colors from "../config/colors";
import ItemQuestion from "../components/ItemQuestion";
import { Question } from "../types";

interface State {
  questions: Question[];
  refreshing: boolean;
  totalSeleted: number;
  userResponses: string[];
  totalPoints: number[];
}

const shuffleArray = (array: any[]) => {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }

  return array;
};

const calulatePoint = (totalPoints: number[]) => {
  const total = totalPoints.reduce(
    (accumulator, currentValue) => accumulator + currentValue,
    0
  );

  return total;
};

const QuestionScreen: React.FC = () => {
  const navigation = useNavigation();
  const [state, setState] = useState<State>({
    questions: QUESTIONS,
    refreshing: false,
    totalSeleted: 0,
    userResponses: Array(QUESTIONS.length).fill(""),
    totalPoints: Array(QUESTIONS.length).fill(""),
  });

  const { questions, refreshing, totalSeleted, userResponses, totalPoints } =
    state;

  const reset = () => {
    setState((prev) => ({
      ...prev,
      totalSeleted: 0,
      userResponses: Array(QUESTIONS.length).fill(""),
      totalPoints: Array(QUESTIONS.length).fill(""),
    }));
  };

  const shuffleQuestion = () => {
    const shuffledQuestions = shuffleArray([...questions]);
    const shuffledQuestionsWithShuffledAnswers = shuffledQuestions.map(
      (question: Question) => ({
        ...question,
        answers: shuffleArray([...question.answers]),
      })
    );

    setState((prev) => ({
      ...prev,
      questions: shuffledQuestionsWithShuffledAnswers,
    }));
    reset();
  };

  const onRefresh = useCallback(() => {
    setState((prev) => ({ ...prev, refreshing: true }));
    shuffleQuestion();
    setState((prev) => ({ ...prev, refreshing: false }));
  }, []);

  useEffect(() => {
    const unsubscribe = navigation.addListener("focus", () => {
      shuffleQuestion();
    });

    return unsubscribe;
  }, [navigation]);

  const handleSelectAnswer = (
    selectedAnswer: string,
    currentQuestionIndex: number
  ) => {
    const newTotalPoints = [...totalPoints];
    const newUserResponses = [...userResponses];
    const currentQuestion = questions[currentQuestionIndex];
    const newSelected = userResponses[currentQuestionIndex] === "";
    let newTotalSelected = totalSeleted;

    if (newSelected) {
      newTotalSelected += 1;
    }

    if (selectedAnswer === currentQuestion.correctAnswer) {
      newTotalPoints[currentQuestionIndex] = 1;
    } else {
      newTotalPoints[currentQuestionIndex] = 0;
    }

    newUserResponses[currentQuestionIndex] = selectedAnswer;
    setState((prev) => ({
      ...prev,
      totalSeleted: newTotalSelected,
      totalPoints: newTotalPoints,
      userResponses: newUserResponses,
    }));
  };

  const handleSubmit = () => {
    const point = calulatePoint(totalPoints);
    const d = new Date();
    const MOCK_ID = d.toString();
    // @ts-ignore
    navigation.navigate("LeaderBoard", {
      user: {
        id: MOCK_ID,
        profile: "https://i.pravatar.cc/40",
        name: "Croissant Dulyasit",
        point: point,
      },
      totalPoints,
      userResponses,
      questions,
    });
  };

  const disabled = totalSeleted < questions.length;

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
        data={questions}
        renderItem={({ item, index }) => {
          const lastChild = index === questions.length - 1;
          return (
            <View style={[styles.item, lastChild && styles.itemLastChild]}>
              <ItemQuestion
                item={item}
                index={index}
                selected={userResponses[index]}
                onSelectAnswer={handleSelectAnswer}
              />
            </View>
          );
        }}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.contentContainerStyle}
      />
      <View style={styles.footer}>
        <View style={styles.footerTextBox}>
          <Text style={styles.footerText}>{totalSeleted}/20</Text>
          <Text style={styles.footerTextLabel}>Finish</Text>
        </View>
        <TouchableOpacity
          style={[styles.button, disabled && styles.disabledButton]}
          onPress={() => handleSubmit()}
          disabled={disabled}
        >
          <Text style={styles.buttonText}>Submit</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: StatusBar.currentHeight,
    backgroundColor: colors.background,
  },
  contentContainerStyle: {
    padding: 20,
  },
  item: {
    flex: 1,
    marginBottom: 20,
  },
  itemLastChild: {
    marginBottom: 0,
  },
  footer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 20,
  },
  footerTextBox: {
    alignItems: "center",
  },
  footerText: {
    fontSize: 20,
    fontWeight: "bold",
  },
  footerTextLabel: {
    fontSize: 12,
    marginTop: 5,
  },
  button: {
    backgroundColor: colors.primary,
    paddingHorizontal: 40,
    paddingVertical: 20,
    borderRadius: 60,
    alignItems: "center",
  },
  disabledButton: {
    opacity: 0.25,
  },
  buttonText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "white",
  },
});

export default QuestionScreen;
