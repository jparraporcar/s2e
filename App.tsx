import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {NavigationContainer} from '@react-navigation/native';
import {MyTheme} from './theme/theme';
import {BottomTabsNavigator} from './navigators/BottomTabsNavigator';
import {StudySetup} from './components/StudySetup';
import {TransitionPresets} from '@react-navigation/stack';

const Stack = createStackNavigator();

const App: React.FC = (): JSX.Element => {
  return (
    <NavigationContainer theme={MyTheme}>
      <Stack.Navigator
        screenOptions={{
          headerStyle: {
            backgroundColor: MyTheme.colors.primary,
          },
        }}>
        <Stack.Screen
          name="BottomNavigation"
          component={BottomTabsNavigator}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="AddStudy"
          options={{
            title: 'Add Study',
            ...TransitionPresets.ModalSlideFromBottomIOS,
            headerTintColor: 'black',
          }}
          component={StudySetup}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
