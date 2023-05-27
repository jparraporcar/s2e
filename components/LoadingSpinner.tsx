import React from "react";
import { ActivityIndicator, View, StyleSheet } from "react-native";
import { colorsPalette } from "../const/colors";

export const LoadingSpinner: React.FC = (): JSX.Element => {
  return (
    <View style={styles.container}>
      <ActivityIndicator
        size="large"
        color={colorsPalette.primary_yellow_100}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
