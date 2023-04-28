import React, { useState } from "react";
import {
  KeyboardTypeIOS,
  KeyboardTypeOptions,
  StyleSheet,
  View,
} from "react-native";
import { LabelledTextInput } from "./LabelledTextInput";
import IconButton from "./IconButton";
import { useTheme } from "@react-navigation/native";
import { AnimatedCard, IPropsAnimatedCard } from "./AnimatedCard";

const labelledTextInput = [
  {
    labelText: "Name:",
    placeholder: "input book name",
    keyboardType: "ascii-capable" as KeyboardTypeOptions,
  },
  {
    labelText: "Author",
    placeholder: "input name of the Author",
    keyboardType: "ascii-capable" as KeyboardTypeOptions,
  },
  {
    labelText: "N. of pages:",
    placeholder: "input n. of pages",
    keyboardType: "numbers-and-punctuation" as KeyboardTypeOptions,
  },
  {
    labelText: "Edition year",
    placeholder: "input year of edition",
    keyboardType: "numbers-and-punctuation" as KeyboardTypeOptions,
  },
];

export const StudiesSetup: React.FC = (): JSX.Element => {
  const { colors } = useTheme();
  const [test, setTest] = useState<boolean>(false);

  const animatedCardProps: IPropsAnimatedCard = {
    containerStyleCard: {
      borderRadius: 10,
      marginHorizontal: 0,
      marginBottom: 5,
      borderColor: colors.primary,
    },
    labelledTextInput: labelledTextInput,
    cardTitle: "Books",
  };

  return (
    <View style={styles.containerMain}>
      <LabelledTextInput
        placeholder="Write name"
        labelText="Name:"
        keyboardType="ascii-capable"
        customStyles={stylesProp}
      />
      <View style={styles.containerButtons}>
        <IconButton
          icon="book"
          size={24}
          color={colors.primary}
          onPress={() => setTest(true)}
          actionTitle="Add Book"
        />
        <IconButton
          icon="laptop"
          size={24}
          color={colors.primary}
          onPress={() => setTest(false)}
          actionTitle="Add Course"
        />
      </View>
      <View>
        {test && (
          <AnimatedCard
            containerStyleCard={animatedCardProps.containerStyleCard}
            labelledTextInput={animatedCardProps.labelledTextInput}
            cardTitle={animatedCardProps.cardTitle}
          />
        )}
      </View>
    </View>
  );
};

const stylesProp = StyleSheet.create({
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
    alignItems: "flex-start",
    padding: 20,
  },
  containerButtons: {
    flexDirection: "row",
  },
});
