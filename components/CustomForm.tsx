import React, { useState } from "react";
import { KeyboardTypeOptions, TextStyle, View, ViewStyle } from "react-native";
import { LabelledTextInput } from "./LabelledTextInput";

interface IpropsCustomForm {
  labelledTextInput: {
    labelText: string;
    placeholder: string;
    keyboardType: KeyboardTypeOptions;
  }[];
  maxLength: number;
  customStyles?: {
    ["containerMain"]?: ViewStyle;
    ["containerTextLabel"]?: ViewStyle;
    ["textLabel"]?: TextStyle;
    ["containerTextInput"]?: ViewStyle;
    ["textInput"]?: TextStyle;
  };
}

export const CustomForm: React.FC<IpropsCustomForm> = (props): JSX.Element => {
  const [textInputs, setTextInputs] = useState<string[]>(
    Array(props.labelledTextInput.length).fill("")
  );

  const handleTextInputChange = (index: number, text: string) => {
    const newTextInputValues = [...textInputs];
    newTextInputValues[index] = text;
    setTextInputs(newTextInputValues);
  };

  return (
    <View>
      {props.labelledTextInput.map((item, index) => (
        <LabelledTextInput
          key={index}
          placeholder={item.placeholder}
          labelText={item.labelText}
          maxLength={30}
          keyboardType={item.keyboardType}
          value={textInputs[index]}
          onChangeText={(text) => handleTextInputChange(index, text)}
          customStyles={props.customStyles}
        />
      ))}
    </View>
  );
};
