import React from "react";
import { Dimensions, Pressable, StyleSheet, Text, View } from "react-native";
import { colorsPalette } from "../const/colors";
import { SafeAreaView } from "react-native-safe-area-context";
import CustomVerticalDivider from "./CustomVerticalDivider";
import { CustomDivider } from "./CustomDivider";
import { useNavigation } from "@react-navigation/native";
import { RootStackParamList } from "../App";
import { StackNavigationProp } from "@react-navigation/stack";
import { GoalsItem } from "../store/slices/goalsListSlice";
import { TouchableOpacity } from "react-native-gesture-handler";

type TimerScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  "TimerScreen"
>;

const SCREEN_WIDTH = Dimensions.get("window").width;

interface IPropsGoalList {
  todayPercentatge: number;
  weekPercentatge: number;
  overallPercentatge: number;
  goalId: number;
  goalName: string;
  resourceType: string;
  goalData: GoalsItem["goalData"];
}

export const GoalListItem: React.FC<IPropsGoalList> = (props): JSX.Element => {
  const navigation: TimerScreenNavigationProp = useNavigation();

  return (
    <TouchableOpacity
      activeOpacity={0.6}
      onPress={() =>
        navigation.navigate("TimerScreen", { goalId: props.goalId })
      }
    >
      <View style={styles.containerMain}>
        <View style={styles.containerUp}>
          <View style={styles.containerAchieved}>
            <Text style={styles.text}>% Achieved</Text>
          </View>
          <CustomVerticalDivider
            customStyles={{
              divider: {
                height: "95%",
              },
            }}
          />
          <View style={styles.containerData}>
            <View style={styles.containerDataColumn}>
              <View style={styles.containerTextPeriod}>
                <Text style={styles.text}>Today</Text>
              </View>
              <View style={styles.containerTextPeriod}>
                <Text style={styles.text}>
                  {`${Math.round(props.todayPercentatge)}%`}
                </Text>
              </View>
            </View>
            <CustomVerticalDivider
              customStyles={{
                divider: {
                  height: "95%",
                },
              }}
            />
            <View style={styles.containerDataColumn}>
              <View style={styles.containerTextPeriod}>
                <Text style={styles.text}>Week</Text>
              </View>
              <View style={styles.containerTextPeriod}>
                <Text style={styles.text}>
                  {`${Math.round(props.weekPercentatge)}%`}
                </Text>
              </View>
            </View>
            <CustomVerticalDivider
              customStyles={{
                divider: {
                  height: "95%",
                },
              }}
            />
            <View style={styles.containerDataColumn}>
              <View style={styles.containerTextPeriod}>
                <Text style={styles.text}>Overall</Text>
              </View>
              <View style={styles.containerTextPeriod}>
                <Text style={styles.text}>
                  {`${Math.round(props.overallPercentatge)}%`}
                </Text>
              </View>
            </View>
            <View style={styles.containerDataColumn}></View>
          </View>
        </View>
        <View style={{ alignItems: "center" }}>
          <CustomDivider
            customStyles={{
              divider: {
                width: "90%",
                borderBottomWidth: 0.5,
                marginBottom: 1,
                marginTop: 1,
              },
            }}
          />
        </View>
        <View style={styles.containerDown}>
          <View style={styles.containerTextGoalName}>
            <Text style={styles.textGoalName}>{props.goalName}</Text>
          </View>
          <View style={styles.containerGoalResource}>
            <Text
              style={styles.text}
            >{`Actual resource: ${props.resourceType}`}</Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  containerMain: {
    padding: 5,
    borderWidth: 0.5,
    borderColor: colorsPalette.secondary_grey_100,
    width: SCREEN_WIDTH - 40,
    borderRadius: 10,
    backgroundColor: colorsPalette.primary_yellow_80,
    marginTop: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  containerUp: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    paddingHorizontal: 2,
    paddingTop: 10,
    paddingBottom: 2,
  },
  containerAchieved: {
    justifyContent: "center",
  },
  containerData: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  containerDataColumn: {
    alignItems: "center",
    justifyContent: "space-evenly",
  },
  containerTextPeriod: {
    paddingHorizontal: 1,
    paddingVertical: 2,
  },
  containerDown: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    paddingHorizontal: 1,
    paddingTop: 5,
    paddingBottom: 5,
  },
  containerTextGoalName: {
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 0.5,
    borderColor: colorsPalette.secondary_grey_100,
    backgroundColor: colorsPalette.secondary_grey_80,
    shadowColor: "#424242",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    padding: 7,
    margin: 3,
  },
  containerGoalResource: {
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 1,
    paddingVertical: 3,
  },
  textGoalName: { fontSize: 18, fontWeight: "bold" },
  text: { fontSize: 12 },
});
