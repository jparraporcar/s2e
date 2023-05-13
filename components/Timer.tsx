import React, { useState, useEffect } from "react";
import { StyleSheet, View, Text } from "react-native";
import { useAppSelector } from "../store/hooks";
import { colorsPalette } from "../const/colors";

interface IPropsTimer {
  time: number;
}

export const Timer: React.FC<IPropsTimer> = ({ time }) => {
  const formatTimer = (time: number): string => {
    const hours = Math.floor(time / 3600);
    const minutes = Math.floor((time % 3600) / 60);
    const seconds = time % 60;

    const formattedTime = [
      hours.toString().padStart(2, "0"),
      minutes.toString().padStart(2, "0"),
      seconds.toString().padStart(2, "0"),
    ];

    return formattedTime.join(":");
  };

  const timerComponents = formatTimer(time)
    .split(":")
    .map((digit, index) => (
      <View style={styles.digitContainer} key={index}>
        <Text style={styles.digitText}>{digit}</Text>
      </View>
    ));

  return <View style={styles.container}>{timerComponents}</View>;
};

export default Timer;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 20,
  },
  digitContainer: {
    backgroundColor: colorsPalette.primary_yellow_90,
    paddingVertical: 10,
    paddingHorizontal: 20,
    marginHorizontal: 5,
  },
  digitText: {
    //TODO: pending to fix the issue with the font 'digital'
    color: "black",
    fontSize: 36,
  },
});
