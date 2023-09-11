import * as React from 'react';
import {FC} from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {NavigationContainer} from '@react-navigation/native';
import InputDriver from './Model/InputDriver';
import {MyContextProvider} from './Controller/Context/MyContext';
import {ActivityHistory} from './Controller/ActivityHistory';

const App: FC = () => {
  const Stack = createStackNavigator();

  return (
    <NavigationContainer>
      <MyContextProvider>
        <Stack.Navigator initialRouteName="InputDriver">
          <Stack.Screen
            name="InputDriver"
            options={{headerShown: false}}
            component={InputDriver}
          />
          <Stack.Screen name="ActivityHistory" component={ActivityHistory} />
        </Stack.Navigator>
      </MyContextProvider>
    </NavigationContainer>
  );
};

export default App;
