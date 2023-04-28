import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
import { MyTheme } from "./theme/theme";
import { BottomTabsNavigator } from "./navigators/BottomTabsNavigator";
import { StudiesSetup } from "./components/StudiesSetup";
import { TransitionPresets } from "@react-navigation/stack";

const Stack = createStackNavigator();

const App: React.FC = (): JSX.Element => {
  return (
    <NavigationContainer theme={MyTheme}>
      <Stack.Navigator
        screenOptions={{
          headerStyle: {
            backgroundColor: MyTheme.colors.primary,
          },
        }}
      >
        <Stack.Screen
          name="BottomNavigation"
          component={BottomTabsNavigator}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="AddStudies"
          options={{
            title: "Add Studies",
            ...TransitionPresets.ModalSlideFromBottomIOS,
            headerTintColor: "black",
          }}
          component={StudiesSetup}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
