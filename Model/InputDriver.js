import Toast from 'react-native-toast-message';
import React, {useState, useEffect} from 'react';
import {
  View,
  StyleSheet,
  SafeAreaView,
  Text,
  Pressable,
  FlatList,
} from 'react-native';

import {useMyContext} from '../Controller/Context/MyContext';
import Button from '../components/Button';
import Icon from 'react-native-vector-icons/FontAwesome';
import RemoveUser from 'react-native-vector-icons/Entypo';
import ClockInInput from './ClockInInput';
import InputText from '../components/InputText';
import {RemoveUserAlert} from './RemoveUserAlert';
import {ClockedOutAlert} from './ClockedOutToast';

const InputDriver = () => {
  const {pushData, RemoveDriver, inOutID, data, DriverIsOut} = useMyContext();
  const [driverName, setDriverName] = useState('');
  const [show, setShow] = useState(false);
  const [showClockIn, setShowClockIn] = useState(false);
  const [InOutId, setInOutId] = useState([]);

  useEffect(() => {
    inOutID.map(item => {
      setInOutId(item.id);
    });
  }, [inOutID]);

  const handleButtonPress = () => {
    if (driverName.trim() !== '') {
      if (!data.some(item => item.username === driverName)) {
        setShow(false);
        pushData(driverName, 7); // Timer as 0 by default not in use yet.
      } else {
        // Driver name already exists, show a message
        Toast.show({
          type: 'error',
          text1: 'Driver Name Already Exists',
          text2: 'Please try a different name.',
          visibilityTime: 3000, // 2 seconds
          autoHide: true,
        });
      }
    } else {
      // Handle the case where driverName is empty
      Toast.show({
        type: 'error',
        text1: 'Driver Name cannot be empty',
        visibilityTime: 2000, // 2 seconds
        autoHide: true,
      });
    }
  };

  const handleInput = text => {
    setDriverName(text);
  };

  const handlePress = userId => {
    RemoveUserAlert(() => RemoveDriver(userId));
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.buttonContainer}>
        <Button onPress={() => setShow(!show)}>
          <Text> {show ? 'Close' : 'Add Driver'}</Text>
        </Button>
        <Button
          onPress={() => {
            if (showClockIn) {
              // Clock Out logic
              ClockedOutAlert(() => {
                DriverIsOut(InOutId), setShowClockIn(false);
              });
            } else {
              // Clock In logic
              setShowClockIn(true); // Set showClockIn to true when Clocking In
            }
          }}>
          <Text> {showClockIn ? 'Clock Out' : 'Clock In'}</Text>
        </Button>
      </View>

      {show && (
        <View>
          <View style={styles.inputContainer}>
            <Icon name="user" size={40} color="lightblue" />

            <InputText
              placeholder="Driver Name"
              value={driverName}
              onChangeText={handleInput}
            />
          </View>
          <Button label="Add Driver" onPress={handleButtonPress} />
        </View>
      )}

      <Toast />
      {showClockIn && <ClockInInput />}

      <FlatList
        style={styles.flatlist}
        data={inOutID.reverse()}
        renderItem={({item}) => (
          <Pressable>
            <View style={styles.pressableCard}>
              <View style={styles.usernameContainer}>
                <Text style={styles.usernameText}>{item.username}</Text>
              </View>
              <View style={styles.timeContainer}>
                <Text style={styles.timeText}>{item.time}</Text>
              </View>
              <Pressable onPress={() => handlePress(item.id)}>
                <Text>
                  <RemoveUser name="remove-user" color="red" size={20} />
                </Text>
              </Pressable>
            </View>
          </Pressable>
        )}
        keyExtractor={item => item.id}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 10,
    justifyContent: 'flex-start',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    paddingVertical: 28,
    paddingHorizontal: 140,
    marginLeft: -150,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 50,
    paddingHorizontal: 2,
    marginVertical: 10,
    width: '100%',
  },

  pressableCard: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 5,
    marginBottom: 5,
    backgroundColor: 'white',
    borderRadius: 10,
    marginVertical: 5,
  },
  flatlist: {
    backgroundColor: '#e9e9f5',
    padding: 5,
    maxHeight: 380,
  },
  usernameContainer: {
    flex: 1, // Allow the username to take as much space as needed within the row
  },
  usernameText: {
    fontWeight: '500',
  },
  timeContainer: {
    marginRight: 150, // Add some spacing between the username and time
  },
});

export default InputDriver;
