import React, { PropsWithChildren, useState } from "react";
import { Modal, Alert, View, Button, StyleSheet } from "react-native";

interface IPropsCustomModal extends PropsWithChildren {
  modalVisible: boolean;
  setModalVisible: React.Dispatch<React.SetStateAction<boolean>>;
}

export const CustomModal: React.FC<IPropsCustomModal> = ({
  modalVisible,
  setModalVisible,
  children,
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
    </Modal>
  );
};

const styles = StyleSheet.create({
  containerMain: {
    flex: 1,
    paddingTop: 200, //TODO: check this out, why the modal cannot be centered by setting justifyContent: 'center'?
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.7)",
  },
});
