import {AppRegistry, LogBox} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
import notifee, {EventType} from '@notifee/react-native';

// Ignore unnecessary warnings from notifee if needed
LogBox.ignoreLogs(['new NativeEventEmitter']);

// Set up the background event handler for Android
notifee.onBackgroundEvent(async ({type, detail}) => {
  if (type === EventType.PRESS) {
    console.log('User pressed the notification.', detail.pressAction.id);
  }
});

// Register your main application component
AppRegistry.registerComponent(appName, () => App);
