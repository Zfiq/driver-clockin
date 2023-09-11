/* eslint-disable react-native/no-inline-styles */
import Toast from 'react-native-toast-message';
import React, {useState, useEffect} from 'react';
import {View, Text, StyleSheet, FlatList, Pressable} from 'react-native';
import {TextInput} from 'react-native-paper';
import Icon from 'react-native-vector-icons/FontAwesome';
import {useMyContext} from '../Controller/Context/MyContext';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {RemoveSelectedRecAlert} from '../Model/RemoveSelectedRecAlert';

export const ActivityHistory = () => {
  const {rec, DeleteOneRec} = useMyContext(); // Get the rec array from context

  const [id, setId] = useState('');
  const [fromDate, setFromDate] = useState('');
  const [toDate, setToDate] = useState('');
  const [deliveryCount, setDeliveryCount] = useState(0); // Initialize deliveryCount

  useEffect(() => {
    const fetchData = async () => {
      const value = await AsyncStorage.getItem('matchingId');
      const key = JSON.parse(value);
      setId(key);
    };

    fetchData();
  }, []);

  useEffect(() => {
    // Calculate deliveryCount whenever rec or filteredRec changes
    const newDeliveryCount = rec.reduce(
      (total, item) => total + item.deliveries,
      0,
    );
    setDeliveryCount(newDeliveryCount);
  }, [rec, filteredRec]);

  useEffect(() => {
    // Calculate deliveryCount whenever fromDate or toDate changes
    const newDeliveryCount = rec.reduce((total, item) => {
      if (
        (!fromDate || item.date >= fromDate) &&
        (!toDate || item.date <= toDate)
      ) {
        return total + item.deliveries;
      }
      return total;
    }, 0);
    setDeliveryCount(newDeliveryCount);
  }, [rec, fromDate, toDate]);

  const filteredRec = rec.filter(item => {
    if (fromDate && toDate) {
      return item.date >= fromDate && item.date <= toDate;
    } else {
      return true;
    }
  });

  const handleRemove = removeID => {
    RemoveSelectedRecAlert(() => DeleteOneRec(id, removeID));
  };

  return (
    <View>
      <View>
        <Text style={styles.deliveryCount}>
          Delivery Count: {deliveryCount}
        </Text>
      </View>
      <View style={styles.textInputContainer}>
        <TextInput
          style={{height: 50}}
          placeholder="From"
          value={fromDate}
          onChangeText={setFromDate}
        />
      </View>

      <View style={styles.textInputContainer}>
        <TextInput
          style={{height: 50}}
          placeholder="To"
          value={toDate}
          onChangeText={setToDate}
        />
      </View>
      <FlatList
        style={styles.flatlist}
        data={filteredRec.reverse()}
        renderItem={({item}) => (
          <Pressable>
            <View style={styles.pressableCard}>
              <View style={styles.usernameContainer}>
                <Text style={styles.usernameText}>{item.username}</Text>
              </View>
              <View style={styles.usernameContainer}>
                <Text style={styles.dateTime}>{item.date}</Text>
                <Text style={styles.timeText}>{item.time}</Text>
              </View>
              <View style={styles.deliveriesContainer}>
                <Text style={styles.deliveriesText}>Orders </Text>
                <Text style={styles.deliveriesNumber}>{item.deliveries}</Text>
              </View>
              <Pressable
                onPress={() => {
                  handleRemove(item.id);
                }}>
                <Icon name="remove" size={20} color="red" />
              </Pressable>
            </View>
          </Pressable>
        )}
        keyExtractor={item => item.id}
      />

      <Toast />
    </View>
  );
};

const styles = StyleSheet.create({
  pressableCard: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 5,
    marginBottom: 5,
    backgroundColor: 'lightblue',
    borderRadius: 10,
  },
  flatlist: {
    backgroundColor: '#e9e9f5',
    top: 1,
    padding: 5,
    maxHeight: 270,
  },
  usernameContainer: {
    flex: 1, // Allow the username to take as much space as needed within the row
  },
  usernameText: {
    fontWeight: '500',
    fontSize: 11,
  },
  timeContainer: {
    marginRight: 100,
  },
  dateTime: {
    fontWeight: '600',
    marginLeft: -40,
    fontSize: 11,
  },
  deliveriesContainer: {
    marginRight: 100,
  },
  deliveriesText: {
    fontWeight: '600',
    fontSize: 11,
  },
  deliveriesNumber: {
    marginLeft: 13,
  },
  timeText: {
    fontSize: 11,
    marginLeft: -30,
  },
  textInputContainer: {
    marginBottom: 5,
  },
  deliveryCount: {
    marginTop: 10,
    bottom: 5,
    marginLeft: 5,
    fontWeight: '500',
  },
});

export default ActivityHistory;
