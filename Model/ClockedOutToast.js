import Toast from 'react-native-toast-message';
import {Alert} from 'react-native';

export const ClockedOutAlert = Delete => {
  const ClockedOutToast = () => {
    Toast.show({
      type: 'success',
      text1: 'you are clocked Out Successfully',
    });
  };
  Alert.alert('Clock Out', 'Are you sure you want to clock out', [
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
        Delete();
        ClockedOutToast();
      },
    },
  ]);
};
