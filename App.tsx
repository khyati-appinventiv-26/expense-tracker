import React from 'react';
import {
  SafeAreaView,
  
  View,
} from 'react-native';
import AppNavigator from './src/navigation/AppNavigator';


function App(): React.JSX.Element {
  

  return (
    <View style={{flex: 1}}>
      <AppNavigator/>
    </View>
  );
}



export default App;
