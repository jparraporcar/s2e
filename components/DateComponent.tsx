import React from "react";
import { View, Text, StyleSheet } from "react-native";

interface IPropsDateComponent {
  date: string;
}

export const DateComponent: React.FC<IPropsDateComponent> = ({
  date,
}): JSX.Element => (
  <View style={styles.container}>
    <Text style={styles.dateText}>{date}</Text>
  </View>
);

export default DateComponent;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#f8f8f8",
    padding: 20,
    borderRadius: 5,
    alignItems: "center",
    justifyContent: "center",
  },
  dateText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
  },
});
