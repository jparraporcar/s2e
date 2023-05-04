import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Modal,
  Pressable,
  Button,
  Dimensions,
} from "react-native";
import DateTimePicker, {
  DateTimePickerEvent,
  Event,
} from "@react-native-community/datetimepicker";
import { Divider } from "./Divider";
import { colorsPalette } from "../const/colors";

type IPropsDatePicker = {
  onChangeDate: (date: Date) => void;
  date: Date;
};

const SCREEN_WIDTH = Dimensions.get("window").width;

export const CustomDatePicker: React.FC<IPropsDatePicker> = (
  props
): JSX.Element => {
  const [showModal, setShowModal] = useState<boolean>(false);

  const onChange = (event: DateTimePickerEvent, selectedDate?: Date) => {
    const currentDate = selectedDate || props.date;
    props.onChangeDate(currentDate);
  };

  const openDatePicker = () => {
    setShowModal(true);
  };
  return (
    <View style={styles.mainContainer}>
      <TouchableOpacity onPress={openDatePicker} style={styles.inputWrapper}>
        <TextInput
          style={styles.input}
          value={props.date.toISOString().substring(0, 10)}
          editable={false}
          placeholder="Select date"
          pointerEvents="none"
        />
      </TouchableOpacity>
      <Modal animationType="slide" transparent={true} visible={showModal}>
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <View style={styles.modalAcceptButtonContainer}>
              <Button title="Accept" onPress={() => setShowModal(false)} />
            </View>
            <Divider
              customStyles={{
                width: SCREEN_WIDTH - 20,
                borderBottomWidth: 1,
                borderBottomColor: colorsPalette.secondary_grey_90,
                marginBottom: 0,
              }}
            />
            <View>
              <DateTimePicker
                value={props.date}
                mode="date"
                display="spinner"
                onChange={onChange}
              />
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    justifyContent: "center",
    paddingHorizontal: 10,
  },
  inputWrapper: {
    marginBottom: 20,
  },
  input: {
    borderBottomWidth: 1,
    borderColor: "#ccc",
    padding: 10,
  },
  modalContainer: {
    flex: 1,
    justifyContent: "flex-end",
  },
  modalContent: {
    backgroundColor: "white",
    padding: 10,
  },
  modalAcceptButtonContainer: {
    alignItems: "flex-end",
  },
});
