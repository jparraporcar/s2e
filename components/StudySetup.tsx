import React from 'react';
import {StyleSheet, Text, View} from 'react-native';

export const StudySetup: React.FC = (): JSX.Element => {
  return (
    <View style={styles.container}>
      <Text>Study Setup</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
