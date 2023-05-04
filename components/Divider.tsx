import React from "react";
import { View, StyleSheet, ViewStyle } from "react-native";
import { colorsPalette } from "../const/colors";

interface IPropsDivider extends ViewStyle {
  customStyles?: {
    height?: number;
    width?: number;
    borderBottomWidth?: number;
    borderBottomColor?: string;
    marginBottom?: number;
    marginTop?: number;
  };
}

export const Divider: React.FC<IPropsDivider> = (props): JSX.Element => {
  return (
    <View
      style={[
        styles.divider,
        props.customStyles ? props.customStyles : undefined,
      ]}
    />
  );
};

const styles = StyleSheet.create({
  divider: {
    height: 10,
    width: 300,
    borderBottomWidth: 1,
    borderBottomColor: colorsPalette.secondary_grey_100,
    marginBottom: 5,
    marginTop: 5,
  },
});
