import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { NavigationContainer } from '@react-navigation/native'
import HomeScreen from '../screens/Home'
import IncomeScreen from '../screens/IncomeScreen'
import ExpenseScreen from '../screens/ExpenseScreen'

const Stack = createNativeStackNavigator()

const AppNavigator = () => {
  return (
    <NavigationContainer>
        <Stack.Navigator>
            <Stack.Screen component={HomeScreen} name='home' options={{headerShown : false}}/>
            <Stack.Screen component={IncomeScreen} name='income' options={{headerShown : false}}/>
            <Stack.Screen component={ExpenseScreen} name='expense' options={{headerShown : false}}/>
        </Stack.Navigator>
    </NavigationContainer>
  )
}

export default AppNavigator

const styles = StyleSheet.create({})