import React, { useState } from "react";
import { KeyboardTypeOptions, StyleSheet, View } from "react-native";
import { LabelledTextInput } from "../components/LabelledTextInput";
import IconButton from "../components/IconButton";
import { useTheme } from "@react-navigation/native";
import { IPropsAnimatedCard } from "../components/AnimatedCard";
import { AnimatedCard } from "../components/AnimatedCard";
import { CustomModal } from "../components/CustomModal";
import { CustomForm } from "../components/CustomForm";
import { Resource } from "../components/Resource";

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
  const [animatedCardTitle, setAnimatedCardTitle] = useState("");
  const [customFormContent, setCustomFormContent] = useState([] as any);

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
          cardTitle={animatedCardTitle}
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
        >
          <CustomForm
            maxLength={30}
            labelledTextInput={customFormContent}
            customStyles={{
              containerMain: { marginVertical: 1, paddingVertical: 3 },
            }}
          />
        </AnimatedCard>
      </CustomModal>
      <View style={styles.containerMain}>
        <View style={styles.containerLabelledTextInput}>
          <CustomForm
            labelledTextInput={[
              {
                placeholder: "Write name",
                labelText: "Name:",
                keyboardType: "ascii-capable",
              },
            ]}
            maxLength={30}
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
                setCustomFormContent(labelledTextInputBook);
                setAnimatedCardTitle("Book");
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
                setCustomFormContent(labelledTextInputCourse);
                setAnimatedCardTitle("course");
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
        <View>
          <Resource />
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
