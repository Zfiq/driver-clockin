import {Alert} from 'react-native';
import Toast from 'react-native-toast-message';
export const AlertDialog = DeleteHistory => {
  Alert.alert(
    'Delete All Record',
    'This will remove all the previous record. Would you like to proceed?',
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
          DeleteHistory();
          Toast.show({
            type: 'success',
            text1: 'History deleted',
            text2: 'All previous records have been deleted',
            visibilityTime: 3000, // 3 seconds
            autoHide: true,
          });
        },
      },
    ],
  );
};
