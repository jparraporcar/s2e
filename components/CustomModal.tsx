import React, { PropsWithChildren, useState } from "react";
import { Modal, Alert, View, Button, StyleSheet } from "react-native";
import IconButton from "./IconButton";
import { useTheme } from "@react-navigation/native";

interface IPropsCustomModal extends PropsWithChildren {
  modalVisible: boolean;
  setModalVisible: React.Dispatch<React.SetStateAction<boolean>>;
}

export const CustomModal: React.FC<IPropsCustomModal> = ({
  modalVisible,
  setModalVisible,
  children,
}): JSX.Element => {
  const { colors } = useTheme();
  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={modalVisible}
      onRequestClose={() => {
        Alert.alert("Modal has been closed.");
        setModalVisible(false);
      }}
    >
      <View style={styles.containerMain}>
        <View>{children}</View>
        <View style={styles.containerButtons}>
          <View>
            <IconButton
              icon="checkmark-outline"
              size={24}
              color={colors.primary}
              actionTitle="Accept"
              onPress={() => setModalVisible(false)}
              customStyles={{
                containerButton: {
                  borderWidth: 1,
                  borderRadius: 7,
                  borderColor: colors.primary,
                  width: 90,
                  marginHorizontal: 30,
                  paddingVertical: 5,
                },
                text: { color: colors.primary },
              }}
            />
          </View>
          <View>
            <IconButton
              icon="close-outline"
              size={24}
              color={colors.primary}
              actionTitle="Cancel"
              customStyles={{
                containerButton: {
                  borderWidth: 1,
                  borderRadius: 7,
                  borderColor: colors.primary,
                  width: 90,
                  marginHorizontal: 30,
                  paddingVertical: 5,
                },
                text: { color: colors.primary },
              }}
              onPress={() => setModalVisible(false)}
            />
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  containerMain: {
    flex: 1,
    justifyContent: "space-evenly",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.8)",
  },
  containerButtons: { flexDirection: "row" },
});
