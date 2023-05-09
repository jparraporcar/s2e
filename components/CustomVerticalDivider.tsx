import React from "react";
import { View, StyleSheet, ViewStyle } from "react-native";

interface IPropsCustomVerticalDivider {
  customStyles?: { ["divider"]: ViewStyle };
}

export const CustomVerticalDivider: React.FC<IPropsCustomVerticalDivider> = (
  props
) => {
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
    width: 1,
    height: "80%",
    backgroundColor: "#ccc",
    marginHorizontal: 10,
  },
});

export default CustomVerticalDivider;
