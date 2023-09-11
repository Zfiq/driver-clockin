import Toast from 'react-native-toast-message';
import {Alert} from 'react-native';

export const RemoveSelectedRecAlert = DeleteRecord => {
  const showToastRecordDeleted = () => {
    Toast.show({
      type: 'success',
      text1: '⚠️ Record Deleted Successfully',
    });
  };
  Alert.alert(
    'Remove Delivery',
    'Are you sure you want to delete this delivery record',
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
          DeleteRecord();
          showToastRecordDeleted();
        },
      },
    ],
  );
};
