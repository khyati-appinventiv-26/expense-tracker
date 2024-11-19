import { StyleSheet, Text, TouchableOpacity, View, Image, ScrollView, FlatList } from 'react-native'
import Modal from 'react-native-modal';
import React, { useState } from 'react'
import { Dimensions } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { Icons } from '../../assets';
import { LineChart } from 'react-native-gifted-charts';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import CustomCalendar from '../../components/CustomCalendar';

const windowWidth = Dimensions.get('window').width;
const data = [{ value: 50 }, { value: 80 }, { value: 90 }, { value: 70 }, { value: 90 }]


const HomeScreen = () => {

    const [visible, setVisible] = useState(false)
    const [toggle, setToggle] = useState('Today')
    const [selectedMonth, setSelectedMonth] = useState('November');


    const navigation = useNavigation()
    return (
        <View style={styles.container}>
            <LinearGradient colors={['rgb(255,247,230)', 'rgb(253,250,244)']} style={styles.linearGradient}>
                <View style={styles.topContainer}>
                    <View>

                    </View>
                    <TouchableOpacity style={styles.calendar} onPress={() => setVisible(!visible)}>
                        <Image source={Icons.arrowDown} />


                        <Text> {selectedMonth} </Text>

                    </TouchableOpacity>


                    <TouchableOpacity style={styles.notify}>
                        <Image source={Icons.notification} />
                    </TouchableOpacity>

                </View>

                 <Modal isVisible={visible}
                    onBackdropPress={() => setVisible(!visible)}
                    style={{flex: 1}}
                 >
                    
                        <CustomCalendar 
                            current={'2024-11-19'}
                            key={'2024-11-19'}
                            style={{
                                borderWidth: 1,
                                borderColor: 'gray',
                                height: '70%'
                            }}
                            onDayPress={month => {
                                setSelectedMonth(month.month)
                                console.log(month.month, 'mmnnbbb');
        
                            }}

                        />
                   
                </Modal> 
                <View style={styles.secondContainer}>
                    <Text style={styles.accountTxt}>
                        Account Balance
                    </Text>
                    <Text style={styles.expenseTxt}>
                        $9400
                    </Text>
                </View>
                <View style={styles.thirdContainer}>
                    <TouchableOpacity style={styles.incomeView} onPress={() => navigation.navigate('income')}>
                        <Image source={Icons.income} />
                        <View style={styles.outerView}>
                            <Text style={{ color: 'white' }}>Income</Text>
                            <Text style={{ color: 'white', fontWeight: 700, fontSize: 20 }}>
                                $5000
                            </Text>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.expenseView} onPress={() => navigation.navigate('expense')}>
                        <Image source={Icons.expense} />
                        <View style={styles.outerView}>
                            <Text style={{ color: 'white' }}>Expense</Text>
                            <Text style={{ color: 'white', fontWeight: 700, fontSize: 20 }}>
                                $1200
                            </Text>
                        </View>
                    </TouchableOpacity>
                </View>
            </LinearGradient>
            <ScrollView showsVerticalScrollIndicator={false}>
                <View style={styles.secondSection}>
                    <Text style={styles.frequencyTxt}>
                        Spend Frequency
                    </Text>
                    <LineChart data={data}
                        height={150}
                        overflowTop={20}
                        color='#803fff'
                        thickness={7}
                        startFillColor={'#e9ddff'}
                        areaChart adjustToWidth hideDataPoints hideOrigin hideRules hideYAxisText hideAxesAndRules
                        initialSpacing={0}
                        width={windowWidth - 20} />

                    <View style={styles.fieldStyle}>
                        <TouchableOpacity onPress={() => setToggle('Today')} style={{ backgroundColor: toggle === 'Today' ? '#fceed4' : null, padding: 10, borderRadius: 20 }}>
                            <Text value='Today' style={{ color: toggle === 'Today' ? '#fdac13' : 'gray' }}>Today</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => setToggle('Week')} style={{ backgroundColor: toggle === 'Week' ? '#fceed4' : null, padding: 10, borderRadius: 20 }}>
                            <Text value='Week' style={{ color: toggle === 'Week' ? '#fdac13' : 'gray' }}>Week</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => setToggle('Month')} style={{ backgroundColor: toggle === 'Month' ? '#fceed4' : null, padding: 10, borderRadius: 20 }}>
                            <Text value='Month' style={{ color: toggle === 'Month' ? '#fdac13' : 'gray', }}>Month</Text>
                        </TouchableOpacity>
                    </View>
                </View>
                <View style={styles.thirdSection}>
                    <Text style={styles.frequencyTxt}>
                        Recent Transaction
                    </Text>
                    {/* <FlatList/> */}

                </View>
            </ScrollView>


        </View>
    )
}

export default HomeScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white'
    },
    linearGradient: {
        width: windowWidth,
        aspectRatio: 1.35,
        borderBottomLeftRadius: 40,
        borderBottomRightRadius: 40
    },
    topContainer: {
        paddingTop: 50,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 10
    },
    calendar: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    secondContainer: {
        alignItems: 'center',
        paddingTop: 30,

    },
    accountTxt: {
        color: 'gray'
    },
    expenseTxt: {
        fontWeight: 700,
        fontSize: 40,
        textAlign: 'center'
    },
    thirdContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-evenly',
        paddingTop: 15
    },
    incomeView: {
        backgroundColor: '#00a86b',
        padding: 10,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-evenly',
        borderRadius: 20
    },
    outerView: {
        paddingLeft: 10,

    },
    expenseView: {
        backgroundColor: '#fd3c4a',
        padding: 10,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-evenly',
        borderRadius: 20
    },
    secondSection: {
        paddingTop: 20,
        width: windowWidth,

    },
    frequencyTxt: {
        fontWeight: 500,
        fontSize: 20,
        paddingBottom: 20,
        paddingHorizontal: 20
    },
    fieldStyle: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 20
    },
    thirdSection: {
        paddingTop: 30
    }

})