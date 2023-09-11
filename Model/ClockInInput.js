import React, {useEffect, useState} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import InputText from '../components/InputText';
import Button from '../components/Button';
import Icon from 'react-native-vector-icons/FontAwesome';
import {useMyContext} from '../Controller/Context/MyContext';
import DriverApp from './DriverApp';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Toast from 'react-native-toast-message';
const ClockInInput = () => {
  const [clockinValue, setClockinValue] = useState('');
  const [form, setForm] = useState(true);
  const [message, setMessage] = useState('');
  const {data} = useMyContext();
  const [names, setNames] = useState([]);

  useEffect(() => {
    const usernames = data.map(name => name.username);

    const filteredNames = usernames.filter(name => name !== '');
    setNames(filteredNames);

    const matchingId = data.find(item => item.username === clockinValue)?.id;

    if (matchingId) {
      console.log('Matching id:', matchingId);

      AsyncStorage.setItem('matchingId', JSON.stringify(matchingId));
    } else {
      console.log('No matching id found.');
    }
  }, [data, clockinValue]);

  const handleInput = text => {
    setClockinValue(text);
  };

  const handleClockin = () => {
    if (names.includes(clockinValue)) {
      setForm(false);
      setMessage('');
      Toast.show({
        type: 'success',
        text1: 'Press the start button to be in the queue',

        visibilityTime: 8000, // 8 seconds
      });
    } else {
      setMessage('No user found. Please add driver name or try again!');
    }
  };

  return (
    <View>
      {form && (
        <View style={styles.clockinContainer}>
          <Icon
            name="sign-in"
            size={40}
            color="lightblue"
            style={styles.icon}
          />
          <InputText
            placeholder="Enter your name"
            value={clockinValue}
            onChangeText={handleInput}
          />
          <Button label={'Submit'} onPress={handleClockin} />
        </View>
      )}
      <Text style={styles.messageText}>{message}</Text>
      <DriverApp driverName={clockinValue} />
    </View>
    //  {show && <DriverApp driverName={clockinValue} />}
  );
};

export default ClockInInput;

const styles = StyleSheet.create({
  clockinContainer: {
    top: 10,
  },
  messageText: {
    color: 'red',
    fontSize: 10,
    marginLeft: 40,
  },
  toastContainer: {
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    padding: 16,
    borderRadius: 8,
  },
  text1: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 4,
  },
  text2: {
    fontSize: 14,
    color: 'white',
  },
});
