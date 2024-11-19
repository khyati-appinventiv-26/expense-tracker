import { StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'
import { Calendar, LocaleConfig } from 'react-native-calendars';

const CustomCalendar = ({ current, key, onDayPress, style }) => {

    return (

        <Calendar
            current={current}
            style={style}
            onDayPress={onDayPress}

        />

    )
}

export default CustomCalendar

const styles = StyleSheet.create({})