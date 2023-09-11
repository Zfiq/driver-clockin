import React, {useEffect} from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import BackgroundTimer from 'react-native-background-timer';
import {
  DeviceEventEmitter,
  NativeAppEventEmitter,
  Platform,
} from 'react-native';

const EventEmitter = Platform.select({
  ios: () => NativeAppEventEmitter,
  android: () => DeviceEventEmitter,
})();
const BackgroundTask = () => {
  const intervalId = BackgroundTimer.setInterval(() => {
    console.log('tic');
  }, 1000);

  return (
    <View>
      <Text>Background Timer Example </Text>
      {/* Add UI components as needed */}
    </View>
  );
};

export default BackgroundTask;
