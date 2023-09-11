import Toast from 'react-native-toast-message';
import React, {createContext, useContext, useState, useEffect} from 'react';
import {onValue, ref, push, update, remove} from 'firebase/database';
import {db} from '../firebase';

// Create the context
const MyContext = createContext();
const showToastUserCreated = () => {
  Toast.show({
    type: 'success',
    text1: '👤 User created and ready to clock in. ',
    visibilityTime: 2000,
  });
};

// Create a custom provider for the context
export const MyContextProvider = ({children}) => {
  const [data, setData] = useState([]);
  const [rec, setRec] = useState([]);
  const [inOutID, setInOutID] = useState([]);
  const [driverStatus, setDriverStatus] = useState([]);
  // Read data from the database After user is created
  const dbRef = ref(db, 'users/');
  const fetchData = () => {
    onValue(dbRef, snapshot => {
      const dbData = snapshot.val();

      if (dbData) {
        const namesArray = Object.keys(dbData).map(key => ({
          id: key,
          ...dbData[key],
        }));
        setData(namesArray);
      } else {
        setData([]);
      }
    });
  };

  // Push data into the database
  const pushData = (newUsername, timer) => {
    const dbRef1 = ref(db, 'users/');
    const newEntry = {
      username: newUsername,
      time: timer,
    };
    push(dbRef1, newEntry)
      .then(response => {
        console.log('Data pushed successfully with key:', response.key);
        showToastUserCreated();
        // After pushing data, fetch updated data
        fetchData();
      })
      .catch(error => {
        console.error('Error pushing data:', error);
      });
  };

  useEffect(() => {
    // Fetch initial data when the component mounts
    fetchData();
  }, []);

  // Update
  const Update = (id, timer) => {
    const path = 'users/' + id;
    const updatedData = {
      time: timer,
    };
    // Update the data at the specified path
    update(ref(db, path), updatedData)
      .then(() => {
        console.log('Data updated successfully');
        // After updating data, fetch updated data
      })
      .catch(error => {
        console.error('Error updating data:', error);
      });
  };

  const RemoveDriver = userId => {
    try {
      const userHistoryRef = ref(db, 'DriverIn/' + userId);
      remove(userHistoryRef)
        .then(() => {
          console.log('User deleted successfully.');
        })
        .catch(error => {
          console.error('Error deleting user:', error);
        });
    } catch (error) {
      console.error('Error deleting user:', error);
    }
  };

  // Save record of each individual
  const Record = (
    userId,
    currentDate,
    currentlTime,
    timeCounter,
    username,
    deliveries,
  ) => {
    try {
      const userHistoryRef = ref(db, 'users/' + userId + '/history');
      const newHistoryEntry = {
        timeCounter: timeCounter,
        username: username,
        date: currentDate,
        time: currentlTime,
        deliveries: deliveries,
      };

      push(userHistoryRef, newHistoryEntry)
        .then(response => {
          console.log('Data saved successfully with key:', response.key);
        })
        .catch(error => {
          console.error('Error saving data:', error);
        });
    } catch (error) {
      console.error('Error creating history entry:', error);
    }
  };

  // Read Activity by user ID. and pass rec in Context value.

  async function ReadActivities(id) {
    const dbRef2 = ref(db, 'users/' + id + '/history');
    await onValue(dbRef2, snapshot => {
      const dbData = snapshot.val();

      if (dbData) {
        const recordArray = Object.keys(dbData).map(key => ({
          id: key,
          ...dbData[key],
        }));
        setRec(recordArray);
      } else {
        setRec([]);
      }
    });
  }

  // Remove all Activities.
  const DeleteHistory = userId => {
    try {
      const userHistoryRef = ref(db, 'users/' + userId + '/history');
      // Remove the "history" sub-node
      remove(userHistoryRef)
        .then(() => {
          console.log('History folder deleted successfully.');
        })
        .catch(error => {
          console.error('Error deleting history folder:', error);
        });
    } catch (error) {
      console.error('Error deleting history folder:', error);
    }
  };

  // Remove one Record.
  const DeleteOneRec = (id, recId) => {
    try {
      const userHistoryRef = ref(db, 'users/' + id + '/history/' + recId);
      remove(userHistoryRef)
        .then(() => {
          console.log('Record deleted successfully.');
        })
        .catch(error => {
          console.error('Error deleting record:', error);
        });
    } catch (error) {
      console.error('Error deleting record:', error);
    }
  };

  // Driver IN
  const DriverIn = (user, timer) => {
    const dbRef3 = ref(db, 'DriverIn/');
    const newEntry = {
      username: user,

      time: timer,
    };
    push(dbRef3, newEntry)
      .then(response => {
        console.log('Driver in successfully with key:', response.key);
      })
      .catch(error => {
        console.error('Error pushing data:', error);
      });
  };

  // Clear and delete all previous notification for the work day.
  const DeleteNotification = id => {
    try {
      const userHistoryRef = ref(db, 'DriverIn/');
      remove(userHistoryRef)
        .then(() => {
          console.log('All notification deleted successfully.');
        })
        .catch(error => {
          console.error('Error deleting notification:', error);
        });
    } catch (error) {
      console.error('Error deleting  notification:', error);
    }
  };
  // AsyncStorage.setItem('matchingId', JSON.stringify(matchingId));

  // Only to get user id
  async function InOutID() {
    // eslint-disable-next-line no-shadow
    const dbRef = ref(db, 'DriverIn/');
    await onValue(dbRef, snapshot => {
      const dbData = snapshot.val();

      if (dbData) {
        const recordArray = Object.keys(dbData).map(key => ({
          id: key,
          ...dbData[key],
        }));
        setInOutID(recordArray);
      } else {
        setInOutID([]);
      }
    });
  }

  // Driver status in out for notifee

  async function driverNotifee() {
    // eslint-disable-next-line no-shadow
    const dbRef = ref(db, 'DriverIn/');
    await onValue(dbRef, snapshot => {
      const dbData = snapshot.val();

      if (dbData) {
        const recordArray = Object.keys(dbData).map(key => ({
          id: key,
          ...dbData[key],
        }));
        setDriverStatus(recordArray);
      } else {
        setDriverStatus([]);
      }
    });
  }

  const DriverIsOut = id => {
    try {
      const userHistoryRef = ref(db, 'DriverIn/' + id);
      remove(userHistoryRef)
        .then(() => {
          console.log('Driver is out successfully.');
        })
        .catch(error => {
          console.error('Error Driver is out', error);
        });
    } catch (error) {
      console.error('Error deleting  driver is out', error);
    }
  };

  useEffect(() => {
    InOutID();
    driverNotifee();
  }, []);

  return (
    <MyContext.Provider
      value={{
        data,
        rec,
        inOutID,
        driverStatus,
        pushData,
        Update,
        RemoveDriver,
        Record,
        DeleteHistory,
        ReadActivities,
        DeleteOneRec,
        DriverIn,
        DeleteNotification,
        DriverIsOut,
      }}>
      {children}
    </MyContext.Provider>
  );
};

// Custom hook to access the context value
export const useMyContext = () => {
  return useContext(MyContext);
};
