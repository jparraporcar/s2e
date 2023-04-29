import {
  Pressable,
  StyleSheet,
  Text,
  TextStyle,
  View,
  ViewStyle,
} from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";

interface IPropsIconButton {
  icon: string;
  size: number;
  color: string;
  onPress: () => void;
  actionTitle: string;
  customStyles?: { ["containerButton"]: ViewStyle; ["text"]: TextStyle };
}
export const IconButton: React.FC<IPropsIconButton> = ({
  icon,
  size,
  color,
  onPress,
  actionTitle,
  customStyles,
}): JSX.Element => {
  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => pressed && styles.pressed}
    >
      <View
        style={[
          customStyles && customStyles.containerButton
            ? customStyles.containerButton
            : undefined,
          styles.containerButton,
        ]}
      >
        <View style={styles.containerIcon}>
          <Ionicons name={icon} size={size} color={color} />
        </View>
        <View>
          <Text
            style={
              customStyles && customStyles.text ? customStyles.text : undefined
            }
          >
            {actionTitle}
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
    opacity: 0.6,
  },
  containerButton: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
});
