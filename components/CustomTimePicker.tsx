import React, { useEffect, useState } from "react";
import { Button, StyleSheet, View } from "react-native";
import { Picker } from "@react-native-picker/picker";
import { IGoalState, setCurrentToggleDay } from "../store/slices/goalSlice";

const generateMinutes = (): number[] => {
  const interval = 15;
  const minutes: number[] = [];

  for (let i = 0; i < 60; i += interval) {
    minutes.push(i);
  }

  return minutes;
};

interface IPropsCustomTimePicker {
  dispatchAction: (day: keyof IGoalState["dedication"], hours: number) => void;
  onPressAccept: () => void;
  currentToggleDay: keyof IGoalState["dedication"];
}

export const CustomTimePicker: React.FC<IPropsCustomTimePicker> = (props) => {
  const [selectedHour, setSelectedHour] = useState<number>(0);
  const [selectedMinute, setSelectedMinute] = useState<number>(0);
  const minutes = generateMinutes();

  useEffect(() => {
    const hours = selectedHour + selectedMinute / 60;
    console.log(hours);
    props.dispatchAction(props.currentToggleDay, hours);
  }, [selectedHour, selectedMinute]);

  return (
    <View
      style={{
        flexDirection: "row",
        backgroundColor: "white",
        justifyContent: "center",
        alignItems: "center",
        padding: 5,
      }}
    >
      <View style={styles.modalAcceptButtonContainer}>
        <Button title="Accept" onPress={props.onPressAccept} />
      </View>
      <Picker
        selectedValue={selectedHour}
        style={{ width: 100 }}
        onValueChange={(itemValue) => setSelectedHour(itemValue as number)}
      >
        {Array.from({ length: 24 }, (_, index) => (
          <Picker.Item key={index} label={index.toString()} value={index} />
        ))}
      </Picker>
      <Picker
        selectedValue={selectedMinute}
        style={{ width: 100 }}
        onValueChange={(itemValue) => setSelectedMinute(itemValue as number)}
      >
        {minutes.map((minute) => (
          <Picker.Item key={minute} label={`${minute}`} value={minute} />
        ))}
      </Picker>
    </View>
  );
};

const styles = StyleSheet.create({
  modalAcceptButtonContainer: {
    alignItems: "flex-end",
  },
});
