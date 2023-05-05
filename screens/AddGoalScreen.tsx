import React, { useEffect, useState } from "react";
import {
  Dimensions,
  KeyboardTypeOptions,
  StyleSheet,
  View,
} from "react-native";
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
import Toast from "react-native-toast-message";
import { bookSchema, courseSchema } from "../utils/ZodSchemas";
import { Text } from "@rneui/base";
import { PeriodPicker } from "../components/PeriodPicker";
import { Divider } from "../components/Divider";
import { colorsPalette } from "../const/colors";
import { Dedication } from "../components/Dedication";

const SCREEN_WIDTH = Dimensions.get("window").width;

const labelledTextInputBook = [
  {
    labelText: "Name",
    placeholder: "input book name",
    keyboardType: "ascii-capable" as KeyboardTypeOptions,
  },
  {
    labelText: "Author",
    placeholder: "input name of the Author",
    keyboardType: "ascii-capable" as KeyboardTypeOptions,
  },
  {
    labelText: "Pages",
    placeholder: "input n. of pages",
    keyboardType: "numbers-and-punctuation" as KeyboardTypeOptions,
  },
  {
    labelText: "Year",
    placeholder: "input year of edition",
    keyboardType: "numbers-and-punctuation" as KeyboardTypeOptions,
  },
];

const labelledTextInputCourse = [
  {
    labelText: "Name",
    placeholder: "input course name",
    keyboardType: "ascii-capable" as KeyboardTypeOptions,
  },
  {
    labelText: "Instructor",
    placeholder: "input name of the instructor",
    keyboardType: "ascii-capable" as KeyboardTypeOptions,
  },
  {
    labelText: "Sections",
    placeholder: "input number of sections",
    keyboardType: "ascii-capable" as KeyboardTypeOptions,
  },
  {
    labelText: "Lectures",
    placeholder: "input number of subsections",
    keyboardType: "ascii-capable" as KeyboardTypeOptions,
  },
];

export const AddGoalScreen: React.FC = (): JSX.Element => {
  const { colors } = useTheme();
  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const [showToastSuccess, setShowToastSuccess] = useState(false);
  const [animatedCardTitle, setAnimatedCardTitle] = useState<
    "Book" | "Course" | ""
  >("");
  const [customFormContent, setCustomFormContent] = useState([] as any);
  const goalState = useAppSelector((state) => state.goal);
  const dispatch = useAppDispatch();

  const handleAddBook = (animatedCardTitle: string) => {
    if (animatedCardTitle === "Book") {
      return (resource: TBook) => {
        try {
          const resBook = bookSchema.parse({
            Name: resource.Name,
            Author: resource.Author,
            Pages:
              Number(resource.Pages).toString() === "NaN"
                ? 0
                : Number(resource.Pages),
            Year:
              Number(resource.Year).toString() === "NaN"
                ? 0
                : Number(resource.Year),
          });
          dispatch(setBook(resource));
          setModalVisible(false);
          setShowToastSuccess(true);
        } catch (err: any) {
          err.errors.map((err: any) =>
            Toast.show({
              type: "error",
              text1: "Validation error",
              text2: err.message,
              position: "bottom",
              visibilityTime: 2000,
              bottomOffset: 20,
            })
          );
        }
      };
    }

    if (animatedCardTitle === "Course") {
      return (resource: TCourse) => {
        try {
          const resCourse = courseSchema.parse({
            Name: resource.Name,
            Instructor: resource.Instructor,
            Sections:
              Number(resource.Sections).toString() === "NaN"
                ? 0
                : Number(resource.Sections),
            Lectures:
              Number(resource.Lectures).toString() === "NaN"
                ? 0
                : Number(resource.Lectures),
          });
          dispatch(setCourse(resource as TCourse));
          setModalVisible(false);
          setShowToastSuccess(true);
        } catch (err: any) {
          err.errors.map((err: any) =>
            Toast.show({
              type: "error",
              text1: "Validation error",
              text2: err.message,
              position: "bottom",
              visibilityTime: 2000,
              bottomOffset: 20,
            })
          );
        }
      };
    }
  };

  const handleOnPressDeleteBook = () => {
    dispatch(setBook(undefined));
  };

  const handleOnPressDeleteCourse = () => {
    dispatch(setCourse(undefined));
  };

  useEffect(() => {
    if (showToastSuccess && animatedCardTitle) {
      Toast.show({
        type: "success",
        text1: `New ${animatedCardTitle} added`,
        position: "bottom",
        visibilityTime: 2000,
        bottomOffset: 20,
      });
    }
  }, [showToastSuccess]);

  return (
    <>
      <Toast onHide={() => setShowToastSuccess(false)} />
      <CustomModal
        toast={<Toast />}
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
          }}
          onPressCancel={() => setModalVisible(false)}
          labelledTextInput={customFormContent}
          labelledTextInputMaxLength={30}
        ></AnimatedCard>
      </CustomModal>
      <View style={styles.containerMain}>
        <View style={styles.containerLabelledTextInput}>
          <LabelledTextInput
            labelText="Name"
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
              disabled={goalState.book.length > 0 ? true : false}
              iconName="book"
              iconSize={24}
              iconColor={colors.primary}
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
              disabled={goalState.course.length > 0 ? true : false}
              iconName="laptop"
              iconSize={24}
              iconColor={colors.primary}
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
        <Divider
          customStyles={{
            width: SCREEN_WIDTH - 20,
            borderBottomWidth: 0.5,
            borderBottomColor: colorsPalette.secondary_grey_90,
          }}
        />
        <View style={styles.containerResources}>
          <View>
            {goalState.book.length > 0 ? (
              goalState.book.map((book: TBook, index: number) => (
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
              ))
            ) : (
              <View
                style={{
                  justifyContent: "center",
                  alignItems: "center",
                  height: 75,
                }}
              >
                <Text>Add a book</Text>
              </View>
            )}
          </View>
          <View>
            {goalState.course.length > 0 ? (
              goalState.course.map((course: TCourse, index: number) => (
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
              ))
            ) : (
              <View
                style={{
                  justifyContent: "center",
                  alignItems: "center",
                  height: 75,
                }}
              >
                <Text>Add a course</Text>
              </View>
            )}
          </View>
        </View>
        <Divider
          customStyles={{
            width: SCREEN_WIDTH - 20,
            borderBottomWidth: 1,
            borderBottomColor: colorsPalette.secondary_grey_90,
          }}
        />
        <View style={styles.periodContainer}>
          <View style={styles.selectPeriodContainer}>
            <Text>Select period</Text>
          </View>
          <PeriodPicker />
        </View>
        <Divider
          customStyles={{
            width: SCREEN_WIDTH - 20,
            borderBottomWidth: 1,
            borderBottomColor: colorsPalette.secondary_grey_90,
            marginBottom: 15,
          }}
        />
        <View style={styles.dedicationContainer}>
          <Dedication />
        </View>
        <Divider
          customStyles={{
            width: SCREEN_WIDTH - 20,
            borderBottomWidth: 1,
            borderBottomColor: colorsPalette.secondary_grey_90,
            marginBottom: 15,
          }}
        />
        <View>
          <IconButton
            disabled={true}
            iconName="rocket-outline"
            actionTitle="Goal complete"
            iconSize={24}
            iconColor={colorsPalette.primary_yellow_100}
            onPress={() => console.log("Goal complete")}
          />
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
    padding: 15,
  },
  containerButtons: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  containerLabelledTextInput: {
    marginBottom: 15,
  },
  containerResources: {
    marginVertical: 10,
    justifyContent: "center",
  },
  iconButtonContainer: {
    marginHorizontal: 30,
  },
  periodContainer: {
    flexDirection: "column",
    marginTop: 10,
    height: 100,
    justifyContent: "flex-start",
    alignItems: "flex-start",
  },
  selectPeriodContainer: {
    flex: 1,
    width: SCREEN_WIDTH,
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 30,
  },
  dedicationContainer: {
    flex: 1,
    width: SCREEN_WIDTH,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 30,
  },
});
