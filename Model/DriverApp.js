/* eslint-disable react-native/no-inline-styles */
import React, {useState, useEffect} from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import Toast from 'react-native-toast-message';
import {useMyContext} from '../Controller/Context/MyContext';
import {FormateTime} from '../Controller/FormateTime';
import {FormatDate} from '../Controller/FormatDate';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {AlertDialog} from './AlertDialog';
import {useNavigation} from '@react-navigation/native';
import {onDisplayNotification} from './Notifee';
import {Ready} from '../Model/Ready';
import {Finish} from '../Model/Finish';
import BackgroundTimer from 'react-native-background-timer';
const DriverApp = ({driverName}) => {
  // Pass driverName as a Prop
  const navigation = useNavigation();
  const [timer, setTimer] = useState(0);
  const [deliveries, setDeliveries] = useState(1); // Number of deliveries 1 as default.
  const [isIn, setIsIn] = useState(true);
  const [disableIn, setDisbaleIn] = useState(true);
  const [disableOut, setDisbaleOut] = useState(true);
  const [startButton, setStartButton] = useState(false);
  const [finishButton, setFinishButton] = useState(true);
  const [InOutId, setInOutId] = useState([]);

  const {
    Update,
    Record,
    DeleteHistory,
    ReadActivities,
    DriverIn,
    DriverIsOut,
    inOutID,
  } = useMyContext();
  const [id, setId] = useState('');

  // Current date and time
  const formattedDateTime = FormatDate(new Date());
  const currentDate = formattedDateTime.date;
  const currentlTime = formattedDateTime.time;

  // To update when name typed in clockin field and stored id from AsyncStorage
  AsyncStorage.getItem('matchingId').then(value => {
    const key = JSON.parse(value);
    setId(key);
  });

  useEffect(() => {
    inOutID.map(item => {
      setInOutId(item.id);
    });

    if (!isIn) {
      const interval = BackgroundTimer.setInterval(() => {
        setTimer(prevTimer => prevTimer + 1);
      }, 1000);

      return () => BackgroundTimer.clearInterval(interval);
    }
  }, [isIn, inOutID]);

  const handleDetete = () => {
    DeleteHistory(id);
  };

  const handleButtonClick = action => {
    if (action === 'In') {
      setIsIn(true);
      Update(id, FormateTime(timer));
      setTimer(0);
      Record(
        id,
        currentDate,
        currentlTime,
        FormateTime(timer),
        driverName,
        deliveries,
      );
      DriverIn(driverName, currentlTime);
      setDisbaleIn(true);
      setDisbaleOut(false);
      onDisplayNotification(
        InOutId,
        driverName,
        'You have done delivery successfully',
      );
    } else if (action === 'Out') {
      if (!startButton) {
        // Display a message if the "Start" button is not enabled
        Toast.show({
          type: 'error',
          text1: 'Start First',
          text2: 'Please press the Start button before Delivering.',
          visibilityTime: 3000, // 3 seconds
          autoHide: true,
        });
      } else {
        setDisbaleOut(true);
        setDisbaleIn(false);
        setIsIn(false);
        DriverIsOut(InOutId);
      }
    } else if (action === 'Reset Time') {
      setTimer(0);
      Update(id, FormateTime(timer));
    } else if (action === 'Delete') {
      AlertDialog(handleDetete);
    } else if (action === 'history') {
      ReadActivities(id); // Get data before navigation triggers.
      navigation.navigate('ActivityHistory');
    }
  };

  const handleIncrementDeliveries = () => {
    // Increment deliveries by 1
    setDeliveries(deliveries + 1);
  };

  const handleDecrementDeliveries = () => {
    // Decrement deliveries by 1, but ensure it doesn't go below 1
    if (deliveries > 1) {
      setDeliveries(deliveries - 1);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.cardContainer}>
        <View style={styles.card}>
          <View style={styles.startFinish}>
            <TouchableOpacity
              disabled={startButton}
              style={styles.button}
              onPress={() => {
                Ready(() => {
                  DriverIn(driverName, currentlTime);
                  setFinishButton(false);
                  setStartButton(true);
                  setDisbaleOut(false);
                });
              }}>
              <Text style={styles.buttonText}>Start</Text>
            </TouchableOpacity>
            <TouchableOpacity
              disabled={finishButton}
              style={styles.button}
              onPress={() => {
                Finish(() => {
                  DriverIsOut(InOutId);
                  setStartButton(false);
                  setFinishButton(true);
                  setDisbaleOut(false);
                });
              }}>
              <Text style={styles.buttonText}>Finish</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.button}
              onPress={() => handleButtonClick('Delete')}>
              <Text style={styles.buttonText}>Clear History</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.button}
              onPress={() => handleButtonClick('history')}>
              <Text style={styles.buttonText}>
                <Icon name="history" size={20} color="white" />
              </Text>
            </TouchableOpacity>
          </View>

          <View style={styles.buttonsRow}>
            <View style={{height: 50}}>
              <Icon name="user" size={40} color="green" />
              <Text style={{width: 50, height: 50}}>{driverName}</Text>
            </View>
            <TouchableOpacity
              style={[
                styles.button,
                {backgroundColor: isIn ? 'green' : '#7d56fc'},
              ]}
              onPress={() => handleButtonClick('In')}
              disabled={disableIn}>
              <Text style={styles.buttonText}>Done</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[
                styles.button,
                {backgroundColor: isIn ? 'red' : 'purple'},
                disableOut && styles.disabledButton, // Add a disabled style
              ]}
              onPress={() => handleButtonClick('Out')}
              disabled={disableOut}>
              <Text style={styles.buttonText}>Delivering</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.button}
              onPress={() => handleButtonClick('Reset Time')}>
              <Text style={styles.buttonText}>Reset Time</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.timerContainer}>
            {isIn ? null : (
              <Text style={styles.timerText}>
                {String(Math.floor(timer / 3600)).padStart(2, '0')}:
                {String(Math.floor((timer % 3600) / 60)).padStart(2, '0')}:
                {String(timer % 60).padStart(2, '0')}
                <Text style={styles.timerText}>
                  {' '}
                  Delivering {deliveries} orders
                </Text>
              </Text>
            )}
          </View>
        </View>

        <View style={styles.plusMinusButtonContainer}>
          <TouchableOpacity
            style={styles.button}
            onPress={handleIncrementDeliveries}>
            <Text style={styles.buttonText}>
              <Icon name="plus" size={15} color="white" />
            </Text>
          </TouchableOpacity>
          <Text style={styles.plusMinusButtonText}>{deliveries}</Text>
          <TouchableOpacity
            style={styles.button}
            onPress={handleDecrementDeliveries}>
            <Text style={styles.buttonText}>
              <Icon name="minus" size={15} color="white" />
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
    marginTop: 20,
  },
  buttonsRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 2,
    backgroundColor: 'lightgray',
    paddingVertical: 8,
    paddingHorizontal: 2,
    borderRadius: 5,

    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  startFinish: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 2,
    backgroundColor: 'lightgray',
    paddingVertical: 3,
    paddingHorizontal: 6,
  },
  button: {
    justifyContent: 'center',
    backgroundColor: '#7d56fc',
    paddingVertical: 8,
    paddingHorizontal: 4,
    borderRadius: 5,
    maxWidth: 75,
    overflow: 'wrap',
  },
  buttonText: {
    color: 'white',
  },
  disabledButton: {
    backgroundColor: 'gray', // Change the background color when disabled
    // You can also add other styles to make it visually distinct
    opacity: 0.6,
  },

  plusMinusButtonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between', // Use 'space-between' to add space between the buttons
    marginBottom: 2,
    backgroundColor: 'lightgray',
    paddingVertical: 4,
    paddingHorizontal: 2,
    borderRadius: 5,
  },
  plusMinusButtonText: {
    marginLeft: 8,
    marginRight: 8,
  },
  historyItem: {
    marginBottom: 5,
  },
  cardContainer: {
    bottom: 30,
    width: '100%',
    alignItems: 'center',
  },
  card: {
    backgroundColor: 'gray',
    width: '100%',
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  timerContainer: {
    alignItems: 'center',
    marginTop: 1,
  },
  timerText: {
    fontSize: 14,
    fontWeight: '500',
    color: 'white',
  },
});

export default DriverApp;
