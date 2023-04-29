import React, { useState } from "react";
import { KeyboardTypeOptions, StyleSheet, View } from "react-native";
import { LabelledTextInput } from "../components/LabelledTextInput";
import IconButton from "../components/IconButton";
import { useTheme } from "@react-navigation/native";
import { IPropsAnimatedCard } from "../components/AnimatedCard";
import { AnimatedCard } from "../components/AnimatedCard";
import { CustomModal } from "../components/CustomModal";

const labelledTextInput = [
  {
    labelText: "Name:",
    placeholder: "input book name",
    keyboardType: "ascii-capable" as KeyboardTypeOptions,
  },
  {
    labelText: "Author:",
    placeholder: "input name of the Author",
    keyboardType: "ascii-capable" as KeyboardTypeOptions,
  },
  {
    labelText: "Pages:",
    placeholder: "input n. of pages",
    keyboardType: "numbers-and-punctuation" as KeyboardTypeOptions,
  },
  {
    labelText: "Year:",
    placeholder: "input year of edition",
    keyboardType: "numbers-and-punctuation" as KeyboardTypeOptions,
  },
];

export const AddGoalScreen: React.FC = (): JSX.Element => {
  const { colors } = useTheme();
  const [modalVisible, setModalVisible] = useState(false);

  const animatedCardProps: IPropsAnimatedCard = {
    containerStyleCard: {
      borderRadius: 10,
      marginHorizontal: 0,
      marginBottom: 5,
      borderColor: colors.primary,
      width: "100%",
    },
    labelledTextInput: labelledTextInput,
    cardTitle: "Books",
  };

  return (
    <>
      <CustomModal
        setModalVisible={setModalVisible}
        modalVisible={modalVisible}
      >
        <AnimatedCard
          containerStyleCard={animatedCardProps.containerStyleCard}
          labelledTextInput={animatedCardProps.labelledTextInput}
          cardTitle={animatedCardProps.cardTitle}
        />
      </CustomModal>
      <View style={styles.containerMain}>
        <View style={styles.containerLabelledTextInput}>
          <LabelledTextInput
            placeholder="Write name"
            labelText="Name:"
            maxLength={30}
            keyboardType="ascii-capable"
            customStyles={customStylesLabelledTextIntput}
          />
        </View>
        <View style={styles.containerButtons}>
          <View>
            <IconButton
              icon="book"
              size={24}
              color={colors.primary}
              onPress={() => setModalVisible(true)}
              actionTitle="Add Book"
              customStyles={{
                containerButton: {
                  borderWidth: 1,
                  borderRadius: 7,
                  borderColor: colors.primary,
                  width: 120,
                  marginHorizontal: 20,
                  paddingVertical: 5,
                },
                text: { color: "black" },
              }}
            />
          </View>
          <View>
            <IconButton
              icon="laptop"
              size={24}
              color={colors.primary}
              onPress={() => console.log("laptop pressed")}
              actionTitle="Add Course"
              customStyles={{
                containerButton: {
                  borderWidth: 1,
                  borderRadius: 7,
                  borderColor: colors.primary,
                  width: 120,
                  marginHorizontal: 20,
                  paddingVertical: 5,
                },
                text: { color: "black" },
              }}
            />
          </View>
        </View>
      </View>
    </>
  );
};

const customStylesLabelledTextIntput = StyleSheet.create({
  containerMain: {
    borderBottomWidth: 0,
  },
  containerTextLabel: {
    color: "black",
  },
});

const styles = StyleSheet.create({
  containerMain: {
    flex: 1,
    justifyContent: "flex-start",
    alignItems: "center",
    padding: 20,
  },
  containerButtons: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "center",
  },
  containerLabelledTextInput: {
    marginBottom: 15,
  },
});
