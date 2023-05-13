import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
import { MyTheme } from "./theme/theme";
import { BottomTabsNavigator } from "./navigators/BottomTabsNavigator";
import { TransitionPresets } from "@react-navigation/stack";
import { AddGoalScreen } from "./screens/AddGoalScreen";
import { Provider } from "react-redux";
import { persistor, store } from "./store/store";
import { TimerScreen } from "./screens/TimerScreen";
import { PersistGate } from "redux-persist/es/integration/react";

export type RootStackParamList = {
  BottomNavigation: undefined;
  AddGoalScreen: undefined;
  TimerScreen: { goalId: number };
};

const Stack = createStackNavigator<RootStackParamList>();

const App: React.FC = (): JSX.Element => {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
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
              name="AddGoalScreen"
              component={AddGoalScreen}
              options={{
                title: "Add Goal",
                ...TransitionPresets.ModalSlideFromBottomIOS,
                headerTintColor: "black",
              }}
            />
            <Stack.Screen
              name="TimerScreen"
              component={TimerScreen}
              options={{
                title: "Timer",
                ...TransitionPresets.ModalSlideFromBottomIOS,
                headerTintColor: "black",
              }}
            />
          </Stack.Navigator>
        </NavigationContainer>
      </PersistGate>
    </Provider>
  );
};

export default App;
