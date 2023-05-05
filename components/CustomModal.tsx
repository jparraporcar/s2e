import React, { PropsWithChildren, ReactNode, useState } from "react";
import { Modal, Alert, View, Button, StyleSheet } from "react-native";

interface IPropsCustomModal extends PropsWithChildren {
  modalVisible: boolean;
  setModalVisible: React.Dispatch<React.SetStateAction<boolean>>;
  toast: ReactNode;
}

export const CustomModal: React.FC<IPropsCustomModal> = ({
  modalVisible,
  setModalVisible,
  children,
  toast,
}): JSX.Element => {
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
      <View style={styles.containerMain}>{children}</View>
      {toast}
    </Modal>
  );
};

const styles = StyleSheet.create({
  containerMain: {
    flex: 1,
    paddingTop: 200,
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.7)",
  },
});
