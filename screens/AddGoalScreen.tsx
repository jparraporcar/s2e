import React, { useState } from "react";
import { KeyboardTypeOptions, StyleSheet, View } from "react-native";
import { LabelledTextInput } from "../components/LabelledTextInput";
import IconButton from "../components/IconButton";
import { useTheme } from "@react-navigation/native";
import { AnimatedCard } from "../components/AnimatedCard";
import { CustomModal } from "../components/CustomModal";
import { Resource } from "../components/Resource";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import {
  TBook,
  TCourse,
  setBook,
  setCourse,
  setName,
} from "../store/slices/goalSlice";

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
  const [animatedCardTitle, setAnimatedCardTitle] = useState<
    "Book" | "Course" | ""
  >("");
  const [customFormContent, setCustomFormContent] = useState([] as any);
  const goalState = useAppSelector((state) => state.goal);
  const dispatch = useAppDispatch();

  const handleAddBook = (animatedCardTitle: string) => {
    if (animatedCardTitle === "Book") {
      return (resource: TBook) => dispatch(setBook(resource));
    }
    if (animatedCardTitle === "Course") {
      return (resource: TCourse) => dispatch(setCourse(resource as TCourse));
    }
  };

  const handleOnPressDeleteBook = () => {
    dispatch(setBook(undefined));
  };

  const handleOnPressDeleteCourse = () => {
    dispatch(setCourse(undefined));
  };

  return (
    <>
      <CustomModal
        setModalVisible={setModalVisible}
        modalVisible={modalVisible}
      >
        <AnimatedCard
          cardContainer={{
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
          onPressAccept={(resource: any) => {
            handleAddBook(animatedCardTitle)!(resource);
            setModalVisible(false);
          }}
          onPressCancel={() => setModalVisible(false)}
          labelledTextInput={customFormContent}
          labelledTextInputMaxLength={30}
        ></AnimatedCard>
      </CustomModal>
      <View style={styles.containerMain}>
        <View style={styles.containerLabelledTextInput}>
          <LabelledTextInput
            labelText="Name:"
            placeholder="input name"
            keyboardType="ascii-capable"
            maxLength={25}
            onChangeText={(enteredText) => dispatch(setName(enteredText))}
            value={goalState.name ? goalState.name : ""}
            customStyles={{
              textLabel: {
                fontSize: 16,
              },
              textInput: {
                fontSize: 16,
              },
            }}
          />
        </View>
        <View style={styles.containerButtons}>
          <View style={styles.iconButtonContainer}>
            <IconButton
              disabled={goalState.books.length > 0 ? true : false}
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
                  paddingVertical: 5,
                },
                text: { color: "black" },
              }}
            />
          </View>
          <View style={styles.iconButtonContainer}>
            <IconButton
              disabled={goalState.courses.length > 0 ? true : false}
              icon="laptop"
              size={24}
              color={colors.primary}
              onPress={() => {
                setCustomFormContent(labelledTextInputCourse);
                setAnimatedCardTitle("Course");
                setModalVisible(true);
              }}
              actionTitle="Add Course"
              customStyles={{
                containerButton: {
                  borderWidth: 1,
                  borderRadius: 7,
                  borderColor: colors.primary,
                  width: 120,
                  paddingVertical: 5,
                },
                text: { color: "black" },
              }}
            />
          </View>
        </View>
        <View style={styles.containerResources}>
          <View>
            {goalState.books.length > 0 &&
              goalState.books.map((book: TBook, index: number) => (
                <Resource
                  onPressDelete={handleOnPressDeleteBook}
                  key={index}
                  inputResource={book}
                  customStyles={{
                    containerSwipeable: {
                      marginTop: 0,
                    },
                    containerLeftAction: { marginTop: 0 },
                  }}
                />
              ))}
          </View>
          <View>
            {goalState.courses.length > 0 &&
              goalState.courses.map((course: TCourse, index: number) => (
                <Resource
                  onPressDelete={handleOnPressDeleteCourse}
                  key={index}
                  inputResource={course}
                  customStyles={{
                    containerSwipeable: {
                      marginTop: 0,
                    },
                    containerLeftAction: { marginTop: 0 },
                  }}
                />
              ))}
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
    justifyContent: "space-between",
  },
  containerLabelledTextInput: {
    marginBottom: 15,
  },
  containerResources: {
    marginTop: 20,
  },
  iconButtonContainer: {
    marginHorizontal: 30,
  },
});
