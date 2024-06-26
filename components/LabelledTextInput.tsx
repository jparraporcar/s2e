import { useTheme } from "@react-navigation/native";
import React from "react";
import {
  KeyboardTypeOptions,
  StyleSheet,
  Text,
  TextStyle,
  View,
  ViewStyle,
} from "react-native";
import { TextInput } from "react-native";
import { colorsPalette } from "../const/colors";

interface IPropsLabelledTextInput {
  fieldName: string;
  labelText: string;
  placeholder: string;
  keyboardType: KeyboardTypeOptions;
  maxLength: number;
  customStyles?: {
    ["containerMain"]?: ViewStyle;
    ["containerTextLabel"]?: ViewStyle;
    ["textLabel"]?: TextStyle;
    ["containerTextInput"]?: ViewStyle;
    ["textInput"]?: TextStyle;
  };
  onChangeText: (text: string) => void;
  value: string;
}

export const LabelledTextInput: React.FC<IPropsLabelledTextInput> = (
  props
): JSX.Element => {
  const { colors } = useTheme();
  return (
    <View
      style={[
        styles.containerMain,
        { borderBottomColor: colors.primary },
        props.customStyles && props.customStyles.containerMain
          ? props.customStyles.containerMain
          : undefined,
      ]}
    >
      <View
        style={[
          styles.containerTextLabel,
          props.customStyles && props.customStyles.containerTextLabel
            ? props.customStyles.containerTextLabel
            : undefined,
        ]}
      >
        <Text
          style={
            props.customStyles && props.customStyles.textLabel
              ? props.customStyles.textLabel
              : undefined
          }
        >
          {props.labelText}:
        </Text>
      </View>
      <View
        style={
          props.customStyles && props.customStyles.containerTextInput
            ? props.customStyles.containerTextInput
            : undefined
        }
      >
        <TextInput
          placeholder={props.placeholder}
          onChangeText={props.onChangeText}
          value={props.value}
          keyboardType={props.keyboardType}
          maxLength={props.maxLength}
          style={[
            styles.textInput,
            { width: "100%" },
            props.customStyles ? props.customStyles.textInput : undefined,
          ]}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  containerMain: {
    flexDirection: "row",
    padding: 7,
    shadowColor: "#000000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    marginBottom: 5,
  },
  containerTextLabel: {
    fontSize: 16,
    marginRight: 10,
  },
  textInput: {
    fontSize: 16,
    borderBottomWidth: 0.5,
    borderBottomColor: colorsPalette.secondary_grey_90,
  },
});
