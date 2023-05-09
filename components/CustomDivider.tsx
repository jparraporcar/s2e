import React from "react";
import { View, StyleSheet, ViewStyle } from "react-native";
import { colorsPalette } from "../const/colors";

interface IPropsDivider {
  customStyles?: { ["divider"]: ViewStyle };
}

export const CustomDivider: React.FC<IPropsDivider> = (props): JSX.Element => {
  return (
    <View
      style={[
        styles.divider,
        props.customStyles ? props.customStyles.divider : undefined,
      ]}
    />
  );
};

const styles = StyleSheet.create({
  divider: {
    height: 10,
    width: 300,
    borderBottomWidth: 0.5,
    borderBottomColor: colorsPalette.secondary_grey_100,
    marginBottom: 5,
    marginTop: 5,
  },
});
