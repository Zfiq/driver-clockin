import notifee from '@notifee/react-native';
export async function onDisplayNotification(id, title, body) {
  // Request permissions (required for iOS)

  notifee.requestPermission({
    criticalAlert: true,
  });
  notifee.displayNotification({
    ios: {
      critical: true,
      sound: 'default',
    },
  });

  // Create a channel (required for Android)
  const channelId = await notifee.createChannel({
    id: id,
    name: 'Default Channel1',
    sound: 'default',
  });

  // Display a notification
  await notifee.displayNotification({
    title: title,
    body: body,
    android: {
      channelId,
      pressAction: {
        id: 'default',
      },
    },
  });
}
