import React, { useEffect, useState } from "react";
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

export interface IPropsAnimatedCard {
  containerStyleCard: {
    borderRadius: number;
    marginHorizontal: number;
    marginBottom: number;
    borderColor: string;
    width: string;
  };
  labelledTextInput: {
    labelText: string;
    placeholder: string;
    keyboardType: KeyboardTypeOptions;
  }[];
  cardTitle: string;
  customStyleButtons: { ["containerButton"]: ViewStyle; ["text"]: TextStyle };
  iconButtonLeft: string;
  iconButtonRight: string;
  iconsColor: string;
  sizeIcons: number;
  onPressButtonLeft: () => void;
  onPressButtonRight: () => void;
}

export const AnimatedCard: React.FC<IPropsAnimatedCard> = (
  props
): JSX.Element => {
  const [animation] = useState(new Animated.Value(0));

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
          props.containerStyleCard,
          { borderColor: props.containerStyleCard.borderColor },
        ]}
      >
        <Card.Title>{props.cardTitle}</Card.Title>
        <Card.Divider />
        {props.labelledTextInput.map((item, index) => (
          <LabelledTextInput
            key={index}
            placeholder={item.placeholder}
            labelText={item.labelText}
            maxLength={30}
            keyboardType={item.keyboardType}
            customStyles={{
              containerMain: { marginVertical: 1, paddingVertical: 3 },
            }}
          />
        ))}
        <View style={styles.containerButtons}>
          <View>
            <IconButton
              icon="checkmark-outline"
              size={props.sizeIcons}
              color={props.iconsColor}
              actionTitle="Accept"
              onPress={props.onPressButtonLeft}
              customStyles={props.customStyleButtons}
            />
          </View>
          <View>
            <IconButton
              icon="close-outline"
              size={24}
              color={props.iconsColor}
              actionTitle="Cancel"
              customStyles={props.customStyleButtons}
              onPress={props.onPressButtonRight}
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
