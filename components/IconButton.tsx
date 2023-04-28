import { Pressable, StyleSheet, Text, View } from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";

interface IPropsIconButton {
  icon: string;
  size: number;
  color: string;
  onPress: () => void;
  actionTitle: string;
}
export const IconButton: React.FC<IPropsIconButton> = ({
  icon,
  size,
  color,
  onPress,
  actionTitle,
}): JSX.Element => {
  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => pressed && styles.pressed}
    >
      <View style={styles.containerButton}>
        <View style={styles.containerIcon}>
          <Ionicons name={icon} size={size} color={color} />
        </View>
        <View>
          <Text>{actionTitle}</Text>
        </View>
      </View>
    </Pressable>
  );
};

export default IconButton;

const styles = StyleSheet.create({
  containerIcon: {
    padding: 6,
    marginRight: 2,
  },
  pressed: {
    opacity: 0.6,
  },
  containerButton: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 6,
  },
});
