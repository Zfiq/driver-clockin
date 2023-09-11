import {Alert} from 'react-native';

export const Finish = finish => {
  Alert.alert(
    'Finishing work',
    'The driver name will be remove from the list would you like to proceed?',
    [
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
          finish();
        },
      },
    ],
  );
};
