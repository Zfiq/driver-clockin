import {Text, View, FlatList, Pressable, StyleSheet} from 'react-native';
import React from 'react';
import {useMyContext} from '../Controller/Context/MyContext';

const InOutDrivers = () => {
  const {inOutID} = useMyContext();

  // Global notification optional onDisplayNotification('default1', 'driverName', 'Has Arrived');
  return (
    <View>
      <FlatList
        style={localStyles.flatlist}
        data={inOutID}
        renderItem={({item}) => (
          <Pressable>
            <View style={localStyles.pressableCard}>
              <View style={localStyles.usernameContainer}>
                <Text style={localStyles.usernameText}>{item.username}</Text>
              </View>
              <View style={localStyles.timeContainer}>
                <Text style={localStyles.timeText}>{item.time}</Text>
              </View>
            </View>
          </Pressable>
        )}
        keyExtractor={item => item.id}
      />
    </View>
  );
};

export default InOutDrivers;

const localStyles = StyleSheet.create({
  flatlist: {
    backgroundColor: '#e9e9f5',
    top: 50,
    padding: 5,
    maxHeight: 450,
  },
  pressableCard: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 10,
    marginBottom: 8,
    backgroundColor: '#b9f52c',
    borderRadius: 10,
    marginVertical: 10,
  },
  usernameContainer: {
    flex: 1,
  },
  usernameText: {
    fontWeight: '500',
  },
  timeContainer: {
    marginRight: 150,
  },
});
