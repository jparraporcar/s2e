import React, { useState } from "react";
import { KeyboardTypeOptions, StyleSheet, View } from "react-native";
import { LabelledTextInput } from "../components/LabelledTextInput";
import IconButton from "../components/IconButton";
import { useTheme } from "@react-navigation/native";
import { IPropsAnimatedCard } from "../components/AnimatedCard";
import { AnimatedCard } from "../components/AnimatedCard";
import { CustomModal } from "../components/CustomModal";

const labelledTextInputBook = [
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

const labelledTextInputCourse = [
  {
    labelText: "Name:",
    placeholder: "input course name",
    keyboardType: "ascii-capable" as KeyboardTypeOptions,
  },
  {
    labelText: "Instructor:",
    placeholder: "input name of the instructor",
    keyboardType: "ascii-capable" as KeyboardTypeOptions,
  },
  {
    labelText: "Sections",
    placeholder: "input number of sections",
    keyboardType: "ascii-capable" as KeyboardTypeOptions,
  },
  {
    labelText: "Subsections",
    placeholder: "input number of subsections",
    keyboardType: "ascii-capable" as KeyboardTypeOptions,
  },
];

export const AddGoalScreen: React.FC = (): JSX.Element => {
  const { colors } = useTheme();
  const [modalVisible, setModalVisible] = useState(false);
  const [animatedCardContent, setAnimatedCardContent] = useState({
    labelledTextInput: [] as any,
    cardTitle: "",
  });

  return (
    <>
      <CustomModal
        setModalVisible={setModalVisible}
        modalVisible={modalVisible}
      >
        <AnimatedCard
          containerStyleCard={{
            borderRadius: 10,
            marginHorizontal: 0,
            marginBottom: 5,
            borderColor: colors.primary,
            width: "100%",
          }}
          labelledTextInput={animatedCardContent.labelledTextInput}
          cardTitle={animatedCardContent.cardTitle}
          customStyleButtons={{
            containerButton: {
              borderWidth: 1,
              borderRadius: 7,
              borderColor: colors.primary,
              width: 100,
              marginHorizontal: 20,
              paddingVertical: 5,
            },
            text: { color: "black" },
          }}
          iconButtonLeft="chechmark-outline"
          iconButtonRight="close-outline"
          iconsColor={colors.primary}
          sizeIcons={24}
          onPressButtonLeft={() => setModalVisible(false)}
          onPressButtonRight={() => setModalVisible(false)}
        />
      </CustomModal>
      <View style={styles.containerMain}>
        <View style={styles.containerLabelledTextInput}>
          <LabelledTextInput
            placeholder="Write name"
            labelText="Name:"
            maxLength={30}
            keyboardType="ascii-capable"
            customStyles={{
              containerMain: {
                borderBottomWidth: 0,
              },
              textLabel: {
                color: "black",
              },
            }}
          />
        </View>
        <View style={styles.containerButtons}>
          <View>
            <IconButton
              icon="book"
              size={24}
              color={colors.primary}
              onPress={() => {
                setAnimatedCardContent({
                  labelledTextInput: labelledTextInputBook,
                  cardTitle: "Book",
                });
                setModalVisible(true);
              }}
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
              onPress={() => {
                setAnimatedCardContent({
                  labelledTextInput: labelledTextInputCourse,
                  cardTitle: "Course",
                });
                setModalVisible(true);
              }}
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

const styles = StyleSheet.create({
  containerMain: {
    flex: 1,
    justifyContent: "flex-start",
    alignItems: "center",
    padding: 20,
  },
  containerButtons: {
    flexDirection: "row",
    justifyContent: "center",
  },
  containerLabelledTextInput: {
    marginBottom: 15,
  },
});
