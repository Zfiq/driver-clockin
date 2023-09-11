import {Alert} from 'react-native';

export const Ready = ready => {
  Alert.alert('Starting work', 'Ready to start', [
    {
      text: 'NO',
      onPress: () => {
        // Perform the "NO" action - do Nothing
      },
      style: 'cancel',
    },
    {
      text: 'YES',
      onPress: () => {
        // Perform the "YES" action
        ready();
      },
    },
  ]);
};
