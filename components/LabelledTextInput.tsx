import { useTheme } from "@react-navigation/native";
import React, { useState } from "react";
import {
  KeyboardTypeOptions,
  StyleSheet,
  Text,
  TextStyle,
  View,
  ViewStyle,
} from "react-native";
import { TextInput } from "react-native";

interface IPropsLabelledTextInput {
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
}

export const LabelledTextInput: React.FC<IPropsLabelledTextInput> = ({
  labelText,
  placeholder,
  keyboardType,
  maxLength,
  customStyles,
}): JSX.Element => {
  const [enteredText, setEnteredText] = useState<string>("");
  const { colors } = useTheme();
  const changeTextHandler = (text: string) => setEnteredText(text);

  return (
    <View
      style={[
        customStyles && customStyles.containerMain
          ? customStyles.containerMain
          : undefined,
        styles.containerMain,
        { borderBottomColor: colors.primary },
      ]}
    >
      <View
        style={[
          customStyles && customStyles.containerTextLabel
            ? customStyles.containerTextLabel
            : undefined,
          styles.containerTextLabel,
        ]}
      >
        <Text
          style={
            customStyles && customStyles.textLabel
              ? customStyles.textLabel
              : undefined
          }
        >
          {labelText}
        </Text>
      </View>
      <View
        style={
          customStyles && customStyles.containerTextInput
            ? customStyles.containerTextInput
            : undefined
        }
      >
        <TextInput
          placeholder={placeholder}
          onChangeText={changeTextHandler}
          value={enteredText}
          keyboardType={keyboardType}
          maxLength={maxLength}
          style={customStyles ? customStyles.textInput : undefined}
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
    marginRight: 10,
  },
});
