import {
  Pressable,
  StyleSheet,
  Text,
  TextStyle,
  View,
  ViewStyle,
} from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import { colorsPalette } from "../const/colors";

interface IPropsIconButton {
  disabled: boolean;
  iconName: string;
  iconSize: number;
  iconColor: string;
  onPress: (resource: any) => void;
  actionTitle?: string;
  customStyles?: {
    ["containerButton"]?: ViewStyle;
    ["containerIcon"]?: ViewStyle;
    ["text"]?: TextStyle;
  };
}
export const IconButton: React.FC<IPropsIconButton> = ({
  disabled,
  iconName,
  iconSize,
  iconColor,
  onPress,
  actionTitle,
  customStyles,
}): JSX.Element => {
  return (
    <Pressable
      disabled={disabled}
      onPress={onPress}
      style={({ pressed }) => pressed && styles.pressed}
    >
      <View
        style={[
          styles.containerButton,
          customStyles && customStyles.containerButton
            ? customStyles.containerButton
            : undefined,
          disabled ? styles.containerButtonBordersDisabled : undefined,
        ]}
      >
        <View
          style={[
            styles.containerIcon,
            customStyles && customStyles.containerIcon
              ? customStyles.containerIcon
              : undefined,
          ]}
        >
          <Ionicons
            name={iconName}
            size={iconSize}
            color={disabled ? styles.iconDisabled.color : iconColor}
          />
        </View>
        <View>
          <Text
            style={[
              customStyles && customStyles.text ? customStyles.text : undefined,
              disabled ? styles.textDisabled : undefined,
            ]}
          >
            {actionTitle ? actionTitle : ""}
          </Text>
        </View>
      </View>
    </Pressable>
  );
};

export default IconButton;

const styles = StyleSheet.create({
  containerIcon: {
    margin: 0,
    paddingRight: 5,
  },
  pressed: {
    opacity: 0.7,
  },
  containerButton: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  iconDisabled: {
    color: colorsPalette.secondary_grey_100,
  },
  containerButtonBordersDisabled: {
    borderColor: colorsPalette.secondary_grey_100,
  },
  textDisabled: {
    color: colorsPalette.secondary_grey_100,
  },
});
