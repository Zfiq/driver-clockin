// GetUsers.js

import {ScrollView} from 'react-native';
import DriverApp from '../Model/DriverApp';
import {useMyContext} from './Context/MyContext';

const GetUsers = ({driverName}) => {
  // Use the custom hook to access the data from the context
  const {data} = useMyContext();

  return (
    <ScrollView>
      {data.map(name => (
        <DriverApp key={name.id} driverName={name.username} /> // Pass the timer prop
      ))}
    </ScrollView>
  );
};

export default GetUsers;
