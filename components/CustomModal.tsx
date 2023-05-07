import React, { PropsWithChildren, ReactNode } from "react";
import { Modal, Alert, View, StyleSheet, ViewStyle } from "react-native";

interface IPropsCustomModal extends PropsWithChildren {
  animationType: "none" | "slide" | "fade" | undefined;
  transparent: boolean;
  modalVisible: boolean;
  setModalVisible?: React.Dispatch<React.SetStateAction<boolean>>;
  toast?: ReactNode;
  customStyles?: { ["containerMain"]: ViewStyle };
}

export const CustomModal: React.FC<IPropsCustomModal> = ({
  animationType,
  transparent,
  modalVisible,
  setModalVisible,
  children,
  toast,
  customStyles,
}): JSX.Element => {
  return (
    <Modal
      animationType={animationType}
      transparent={transparent}
      visible={modalVisible}
      onRequestClose={() => {
        if (setModalVisible) {
          Alert.alert("Modal has been closed.");
          setModalVisible(false);
        }
      }}
    >
      <View
        style={[
          styles.containerMain,
          customStyles ? customStyles.containerMain : undefined,
        ]}
      >
        {children}
      </View>
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
