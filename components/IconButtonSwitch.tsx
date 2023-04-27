import React, {useState} from 'react';
import {Pressable, StyleSheet, View} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

interface IPropsIconButton {
  iconNameProp: {outline: string; filled: string};
  actionOnPress: () => void;
  size: number;
  color: string;
}

export const IconButtonSwitch: React.FC<IPropsIconButton> = ({
  iconNameProp,
  actionOnPress,
  size,
  color,
}): JSX.Element => {
  const [iconName, setIconName] = useState<string>(iconNameProp.outline);

  const onPressIn = () => {
    setIconName(iconNameProp.filled);
    actionOnPress();
  };

  const onPressOut = () => {
    setIconName(iconNameProp.outline);
    actionOnPress();
  };

  return (
    <Pressable onPressIn={onPressIn} onPressOut={onPressOut}>
      <View style={style.container}>
        <Ionicons name={iconName} size={size} color={color} />
      </View>
    </Pressable>
  );
};

const style = StyleSheet.create({
  container: {
    padding: 4,
  },
});
