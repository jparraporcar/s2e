import React, { useEffect, useState } from "react";
import {
  Dimensions,
  KeyboardTypeOptions,
  StyleSheet,
  View,
} from "react-native";
import { LabelledTextInput } from "../components/LabelledTextInput";
import IconButton from "../components/IconButton";
import { useNavigation, useTheme } from "@react-navigation/native";
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
  setResetGoalInput,
} from "../store/slices/goalSlice";
import Toast from "react-native-toast-message";
import { bookSchema, courseSchema } from "../utils/ZodSchemas";
import { Text } from "@rneui/base";
import { PeriodPicker } from "../components/PeriodPicker";
import { CustomDivider } from "../components/CustomDivider";
import { colorsPalette } from "../const/colors";
import { Dedication } from "../components/Dedication";
import { setAddGoal } from "../store/slices/goalsListSlice";
import {
  GoalValidationState,
  setGoalStateValidation,
  setResetIsValidationPassed,
} from "../store/slices/goalValidationSlice";
import AsyncStorage from "@react-native-async-storage/async-storage";

const SCREEN_WIDTH = Dimensions.get("window").width;

const labelledTextInputBook = [
  {
    fieldName: "name",
    labelText: "Name",
    placeholder: "input Name",
    keyboardType: "ascii-capable" as KeyboardTypeOptions,
    maxLength: 30,
  },
  {
    fieldName: "author",
    labelText: "Author",
    placeholder: "input Author",
    keyboardType: "ascii-capable" as KeyboardTypeOptions,
    maxLength: 30,
  },
  {
    fieldName: "pages",
    labelText: "N. of Pages",
    placeholder: "input Pages",
    keyboardType: "numbers-and-punctuation" as KeyboardTypeOptions,
    maxLength: 3,
  },
  {
    fieldName: "year",
    labelText: "Year of edition",
    placeholder: "input Year",
    keyboardType: "numbers-and-punctuation" as KeyboardTypeOptions,
    maxLength: 4,
  },
];

const labelledTextInputCourse = [
  {
    fieldName: "name",
    labelText: "Name",
    placeholder: "input Name",
    keyboardType: "ascii-capable" as KeyboardTypeOptions,
    maxLength: 30,
  },
  {
    fieldName: "instructor",
    labelText: "Instructor",
    placeholder: "input Instructor",
    keyboardType: "ascii-capable" as KeyboardTypeOptions,
    maxLength: 30,
  },
  {
    fieldName: "sections",
    labelText: "Sections",
    placeholder: "input Sections",
    keyboardType: "ascii-capable" as KeyboardTypeOptions,
    maxLength: 2,
  },
  {
    fieldName: "lectures",
    labelText: "Lectures",
    placeholder: "input Lectures",
    keyboardType: "ascii-capable" as KeyboardTypeOptions,
    maxLength: 3,
  },
];

export const AddGoalScreen: React.FC = (props): JSX.Element => {
  const { colors } = useTheme();
  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const [modalVisibleOuter, setModalVisibleOuter] = useState<boolean>(false);
  const [animatedCardTitle, setAnimatedCardTitle] = useState<
    "Book" | "Course" | ""
  >("");
  const [customFormContent, setCustomFormContent] = useState([] as any);
  const goalState = useAppSelector((state) => state.goal);
  const goalValidationState = useAppSelector((state) => state.goalValidation);
  const dispatch = useAppDispatch();
  const navigation = useNavigation();

  const handleAddResource = (animatedCardTitle: string) => {
    if (animatedCardTitle === "Book") {
      return (resource: TBook) => {
        try {
          const resBook = bookSchema.parse({
            name: resource.name,
            author: resource.author,
            pages:
              Number(resource.pages).toString() === "NaN"
                ? 0
                : Number(resource.pages),
            year:
              Number(resource.year).toString() === "NaN"
                ? 0
                : Number(resource.year),
          });
          dispatch(setBook(resource));
          setModalVisible(false);
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
            name: resource.name,
            instructor: resource.instructor,
            sections:
              Number(resource.sections).toString() === "NaN"
                ? 0
                : Number(resource.sections),
            lectures:
              Number(resource.lectures).toString() === "NaN"
                ? 0
                : Number(resource.lectures),
          });
          dispatch(setCourse(resource as TCourse));
          setModalVisible(false);
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

  const handleAddGoalToList = () => {
    dispatch(setGoalStateValidation(goalState));
    setModalVisibleOuter(true);
  };

  // to bre triggered once goalStateValidation changes due to a click in the 'Complete' button
  // "dispatch(setResetIsValidationPassed())" to avoid showing the toast when rerendering not due to a click
  useEffect(() => {
    if (goalValidationState.isValidationPassed !== undefined) {
      if (goalValidationState.isValidationPassed) {
        Toast.show({
          type: "success",
          text1: "Validation success",
          text2: "Validation success",
          position: "bottom",
          visibilityTime: 2000,
          bottomOffset: 20,
        });
        dispatch(
          setAddGoal({
            id: Math.random(),
            goalData: goalState,
            percentatges: {
              today: 0,
              week: 0,
              month: 0,
              total: 0,
            },
            currentResource: "Course",
            totalTime: 0,
            sesions: [],
          })
        );
        setTimeout(() => {
          dispatch(setResetGoalInput());
          navigation.goBack();
        }, 2000);
        setTimeout(() => {
          AsyncStorage.getItem("persist:goals").then((value) =>
            console.log("AynscStorage value", value)
          );
        }, 5000);
      } else {
        Object.keys(goalValidationState.result).map((key) => {
          if (
            goalValidationState.result[
              key as keyof GoalValidationState["result"]
            ].message !== undefined &&
            goalValidationState.result[
              key as keyof GoalValidationState["result"]
            ].message !== "Success"
          ) {
            Toast.show({
              type: "error",
              text1: "Validation error",
              text2:
                goalValidationState.result[
                  key as keyof GoalValidationState["result"]
                ].message,
              position: "bottom",
              visibilityTime: 2000,
              bottomOffset: 20,
            });
          }
        });
      }
      setTimeout(() => setModalVisibleOuter(false), 2000);
      dispatch(setResetIsValidationPassed());
    }
  }, [goalValidationState]);

  console.log(goalState);

  return (
    <>
      <CustomModal
        animationType="none"
        transparent={true}
        modalVisible={modalVisibleOuter}
      >
        <Toast />
      </CustomModal>
      <CustomModal
        animationType="fade"
        transparent={true}
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
            handleAddResource(animatedCardTitle)!(resource);
          }}
          onPressCancel={() => setModalVisible(false)}
          labelledTextInput={customFormContent}
        ></AnimatedCard>
      </CustomModal>
      <View style={styles.containerMain}>
        <View style={styles.containerLabelledTextInput}>
          <LabelledTextInput
            fieldName="name"
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
        <CustomDivider
          customStyles={{
            divider: {
              width: SCREEN_WIDTH - 20,
              borderBottomWidth: 0.5,
              borderBottomColor: colorsPalette.secondary_grey_90,
            },
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
        <CustomDivider
          customStyles={{
            divider: {
              width: SCREEN_WIDTH - 20,
              borderBottomWidth: 1,
              borderBottomColor: colorsPalette.secondary_grey_90,
            },
          }}
        />
        <View style={styles.periodContainer}>
          <View style={styles.selectPeriodContainer}>
            <Text>Select period</Text>
          </View>
          <PeriodPicker />
        </View>
        <CustomDivider
          customStyles={{
            divider: {
              width: SCREEN_WIDTH - 20,
              borderBottomWidth: 1,
              borderBottomColor: colorsPalette.secondary_grey_90,
              marginBottom: 15,
            },
          }}
        />
        <View style={styles.dedicationContainer}>
          <Dedication />
        </View>
        <CustomDivider
          customStyles={{
            divider: {
              width: SCREEN_WIDTH - 20,
              borderBottomWidth: 1,
              borderBottomColor: colorsPalette.secondary_grey_90,
              marginBottom: 15,
            },
          }}
        />
        <View>
          <IconButton
            disabled={false}
            iconName="rocket-outline"
            actionTitle="Complete"
            iconSize={24}
            iconColor={colorsPalette.primary_yellow_100}
            onPress={handleAddGoalToList}
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
