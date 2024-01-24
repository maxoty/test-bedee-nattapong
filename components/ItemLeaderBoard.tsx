import React from "react";
import { View, Text, StyleSheet, Image } from "react-native";
import colors from "../config/colors";
import { LeaderBoard } from "../types";

interface Props {
  item: LeaderBoard;
  rank: number;
}

const ItemLeaderBoard: React.FC<Props> = (props) => {
  const { item, rank } = props;

  const mapColorRank: { [key: number]: object } = {
    1: styles.gold,
    2: styles.silver,
    3: styles.bronze,
  };

  return (
    <View style={styles.item}>
      <View style={styles.avatar}>
        <Image source={{ uri: item.profile }} style={styles.avatarImage} />
        {rank <= 3 && (
          <View style={[styles.rank, mapColorRank[rank]]}>
            <Text style={styles.rankText}>{rank}</Text>
          </View>
        )}
      </View>
      <View style={styles.name}>
        <Text style={styles.nameText}>{item.name}</Text>
      </View>
      <View style={styles.point}>
        <Text style={styles.pointText}>{item.point}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  item: {
    flex: 1,
    borderRadius: 10,
    backgroundColor: "white",
    padding: 20,
    flexDirection: "row",
    alignItems: "center",
  },
  avatar: {
    position: "relative",
  },
  avatarImage: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "grey",
  },
  rank: {
    width: 20,
    height: 20,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
    position: "absolute",
    bottom: -5,
    right: 0,
    borderWidth: 2,
    borderColor: "white",
  },
  gold: {
    backgroundColor: colors.gold,
  },
  silver: {
    backgroundColor: colors.silver,
  },
  bronze: {
    backgroundColor: colors.bronze,
  },
  rankText: {
    fontSize: 10,
    fontWeight: "bold",
  },
  name: {
    flex: 1,
    paddingHorizontal: 20,
  },
  nameText: {
    fontWeight: "bold",
  },
  point: {},
  pointText: {
    fontSize: 20,
    fontWeight: "bold",
    color: colors.primary,
  },
});

export default ItemLeaderBoard;
