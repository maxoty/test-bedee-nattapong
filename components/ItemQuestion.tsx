import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import colors from "../config/colors";
import { Question } from "../types";

interface Props {
  item: Question;
  index: number;
  selected: string;
  onSelectAnswer: (
    selectedAnswer: string,
    currentQuestionIndex: number
  ) => void;
}

const ItemQuestion: React.FC<Props> = (props) => {
  const { selected, item, index, onSelectAnswer } = props;

  const number = index + 1;

  return (
    <View style={styles.item}>
      <View style={styles.header}>
        <View style={styles.number}>
          <Text style={styles.text}>{number}</Text>
        </View>
        <View style={styles.question}>
          <Text>{item.question}</Text>
        </View>
      </View>
      <View style={styles.body}>
        <View style={styles.list}>
          {item.answers.map((answer: any, indexAnswer: any) => {
            const choiceNumber = indexAnswer + 1;
            const isChecked = selected === answer;

            return (
              <TouchableOpacity
                key={indexAnswer}
                onPress={() => onSelectAnswer(answer, index)}
                style={styles.listItem}
              >
                <View
                  style={[styles.checkbox, isChecked && styles.checkboxChecked]}
                >
                  <Text style={[isChecked && styles.checkboxTextChecked]}>
                    {choiceNumber}
                  </Text>
                </View>
                <Text style={styles.checkboxLabel}>{answer}</Text>
              </TouchableOpacity>
            );
          })}
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  item: {
    flex: 1,
    borderRadius: 10,
    backgroundColor: "white",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    paddingTop: 20,
    paddingHorizontal: 20,
  },
  number: {
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: colors.dark,
    borderRadius: 15,
    width: 30,
    height: 30,
  },
  text: {
    color: "white",
  },
  question: {
    flex: 1,
    marginLeft: 20,
  },
  body: {
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  list: {
  },
  listItem: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 10,
  },
  checkbox: {
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 15,
    width: 30,
    height: 30,
  },
  checkboxChecked: { backgroundColor: colors.primary },
  checkboxTextChecked: {
    color: "white",
  },
  checkboxLabel: {
    flex: 1,
    marginLeft: 20,
  },
});

export default ItemQuestion;
