import React, {
  PropsWithChildren,
  ReactNode,
  useEffect,
  useState,
} from "react";
import { Card } from "@rneui/themed";
import {
  KeyboardTypeOptions,
  StyleSheet,
  TextStyle,
  View,
  ViewStyle,
} from "react-native";
import { LabelledTextInput } from "./LabelledTextInput";
import { Animated } from "react-native";
import IconButton from "./IconButton";

export interface IPropsAnimatedCard extends PropsWithChildren {
  cardContainer: {
    borderRadius: number;
    marginHorizontal: number;
    marginBottom: number;
    borderColor: string;
    width: string;
  };
  cardTitle: string;
  customStyleButtons: { ["containerButton"]: ViewStyle; ["text"]: TextStyle };
  iconButtonLeft: string;
  iconButtonRight: string;
  iconsColor: string;
  sizeIcons: number;
  onPressAccept: (resource: any) => void;
  onPressCancel: () => void;
  labelledTextInput: {
    labelText: string;
    placeholder: string;
    keyboardType: KeyboardTypeOptions;
  }[];
  labelledTextInputMaxLength: number;
  labelledTextInputCustomStyles?: {
    ["containerMain"]?: ViewStyle;
    ["containerTextLabel"]?: ViewStyle;
    ["textLabel"]?: TextStyle;
    ["containerTextInput"]?: ViewStyle;
    ["textInput"]?: TextStyle;
  };
}

export const AnimatedCard: React.FC<IPropsAnimatedCard> = (
  props
): JSX.Element => {
  const [animation] = useState(new Animated.Value(0));
  const [textInputs, setTextInputs] = useState<{ [key: string]: string }>({});
  const handleTextInputChange = (label: string, text: string) => {
    const newTextInputValues = { ...textInputs };
    newTextInputValues[label] = text;
    setTextInputs(newTextInputValues);
  };

  useEffect(() => {
    Animated.timing(animation, {
      toValue: 1,
      duration: 200,
      useNativeDriver: false,
    }).start();
  }, []);

  const animatedViewStyle = {
    height: animation.interpolate({
      inputRange: [0, 1],
      outputRange: [0, 100],
    }),
    opacity: animation.interpolate({
      inputRange: [0, 1],
      outputRange: [0, 1],
    }),
  };

  return (
    <Animated.View style={animatedViewStyle}>
      <Card
        containerStyle={[
          { borderColor: props.cardContainer.borderColor },
          props.cardContainer,
        ]}
      >
        <Card.Title>{props.cardTitle}</Card.Title>
        <Card.Divider />
        <View>
          {props.labelledTextInput.map((item, index) => (
            <LabelledTextInput
              key={index}
              placeholder={item.placeholder}
              labelText={item.labelText}
              maxLength={30}
              keyboardType={item.keyboardType}
              value={textInputs[index]}
              onChangeText={(text) =>
                handleTextInputChange(item.labelText, text)
              }
              customStyles={props.labelledTextInputCustomStyles}
            />
          ))}
        </View>
        <View style={styles.containerButtons}>
          <View>
            <IconButton
              disabled={false}
              iconName="checkmark-outline"
              iconSize={props.sizeIcons}
              iconColor={props.iconsColor}
              actionTitle="Accept"
              onPress={() => {
                props.onPressAccept(textInputs);
              }}
              customStyles={props.customStyleButtons}
            />
          </View>
          <View>
            <IconButton
              disabled={false}
              iconName="close-outline"
              iconSize={24}
              iconColor={props.iconsColor}
              actionTitle="Cancel"
              customStyles={props.customStyleButtons}
              onPress={props.onPressCancel}
            />
          </View>
        </View>
      </Card>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  containerButtons: { flexDirection: "row", marginVertical: 10 },
});
