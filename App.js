import { StatusBar } from 'expo-status-bar';
import React, {useEffect, useState} from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import MyStack from './routes/MyStack';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-perist/integration/react';
import { store, persistor } from './state/store';


export default function App() {
  return(
  <Provider store={store}>
    <PersistGate perisitor={persistor} loading={null}>
      <NavigationContainer>
    
        <MyStack />
  
      </NavigationContainer>
    </PersistGate>
  </Provider>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  switchContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  button: {
    marginTop: 15,
  },
  separator: {
    marginVertical: 8,
  },
});