import React, { useEffect, useState } from "react";
import {
  View,
  SafeAreaView,
  FlatList,
  StatusBar,
  StyleSheet,
} from "react-native";
import { useRoute } from "@react-navigation/native";
import LEADER_BOARD from "../mock/leaderBoard.json";
import colors from "../config/colors";
import ItemLeaderBoard from "../components/ItemLeaderBoard";
import { LeaderBoard } from "../types";

const LeaderBoardScreen: React.FC = () => {
  const route = useRoute();
  const [leaderBoard, setLeaderBoard] = useState(LEADER_BOARD);
  // @ts-ignore
  const { user } = route.params;

  const calculateLeaderBoard = (newUser: LeaderBoard) => {
    const newLeaderBoard = [...leaderBoard, newUser];
    newLeaderBoard.sort((a, b) => b.point - a.point);
    setLeaderBoard(newLeaderBoard);
  };

  useEffect(() => {
    if (user) {
      calculateLeaderBoard(user);
    }
  }, [user]);

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={leaderBoard}
        renderItem={({ item, index }) => {
          const rank = index + 1;
          const lastChild = index === leaderBoard.length - 1;
          return (
            <View style={[styles.item, lastChild && styles.itemLastChild]}>
              <ItemLeaderBoard item={item} rank={rank} />
            </View>
          );
        }}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.contentContainerStyle}
      />
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

export default LeaderBoardScreen;
