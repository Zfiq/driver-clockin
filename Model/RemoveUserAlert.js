import Toast from 'react-native-toast-message';
import {Alert} from 'react-native';
export const RemoveUserAlert = DeleteUser => {
  const showToastUserDeleted = () => {
    Toast.show({
      type: 'success',
      text1: '⚠️ User Deleted Successfully',
    });
  };
  Alert.alert(
    'Remove Driver',
    'Are you sure you want to delete this user',

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
          DeleteUser();
          showToastUserDeleted();
        },
      },
    ],
  );
};
