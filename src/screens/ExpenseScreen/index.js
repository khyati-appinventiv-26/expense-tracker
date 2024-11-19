import { StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React , {useState} from 'react'
import { Image } from 'react-native'
import { Icons } from '../../assets'
import { useNavigation } from '@react-navigation/native'
import Modal from 'react-native-modal'
import CustomCalendar from '../../components/CustomCalendar'
import AsyncStorage from '@react-native-async-storage/async-storage'

const ExpenseScreen = () => {
    const [expenseData , setExpenseData] = useState({
        category: '',
        description : '',
        date: '',
        amount : 0,
        
    })
    const [visible , setVisible] = useState(false)
    const [visible2 , setVisible2] = useState(false)
    
    const navigation = useNavigation()

    const storeData = async () => {
        try {
          const jsonValue = JSON.stringify(expenseData);
          console.log('AsyncStorage.setItem',jsonValue)
          await AsyncStorage.setItem('expenseData', jsonValue);
          console.log(expenseData,'678999090')
        } catch (e) {
          console.error(e);
          
        }
      }
  return (
    <View style= {styles.container}>
       <View style={styles.topContainer}>
            <TouchableOpacity onPress={() => navigation.goBack()}>
                <Image source={Icons.arrowLeft} />
            </TouchableOpacity>
            <Text style={styles.txt}> Expense </Text>
            <View></View>
       </View>
       <View style={styles.midContainer}>
            <Text style={styles.midTxt}>How much?</Text>
            <Text style={styles.amtTxt}> $0</Text>
       </View>
       <View style={styles.bottomContainer}>
       <TouchableOpacity onPress={() => setVisible2(!visible2)}>
            <View pointerEvents='none'
                style={styles.input}
            >
            <Text style={{color: expenseData.category ? null :'lightgray'}}>
                {expenseData.category? expenseData.category : 'Category'}
            </Text>
                </View>
           </TouchableOpacity>
           <Modal isVisible={visible2}
                    onBackdropPress={() => setVisible2(!visible2)}
                    style={{flex: 1}}
                 >
                    
                       <View style={styles.modalView}>
                            <TouchableOpacity onPress={() =>setExpenseData({...expenseData , category : 'Shopping'})}><Text>Shopping</Text></TouchableOpacity>
                            <TouchableOpacity onPress={() =>setExpenseData({...expenseData , category : 'Subscription'})}><Text>Subscription</Text></TouchableOpacity>
                            <TouchableOpacity onPress={() =>setExpenseData({...expenseData , category : 'Food'})}><Text>Food</Text></TouchableOpacity>
                       </View>
                   
                </Modal> 
            
            <Image source={Icons.arrowDown} style={styles.arrImg}/>
            <TextInput
                style={styles.input}
                placeholder='Description'
            />
            <TouchableOpacity onPress={() => setVisible(!visible)}>
            <View pointerEvents='none'
                style={styles.input}


            >
            <Text style={{color: expenseData.date ? null :'lightgray'}}>
                {expenseData.date ? expenseData.date : 'Date'}
            </Text>
                </View>
           </TouchableOpacity>
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
                                setExpenseData({...expenseData ,'date' : month.dateString})
                                console.log(month.dateString,'ghjkl');
                                
                                setVisible(!visible)
        
                            }}

                        />
                   
                </Modal> 
            <TextInput
                style={styles.input}
                placeholder='Amount'
            />
            <TouchableOpacity style={styles.btnView} onPress={()=> storeData()}>
                <Text style={styles.btnTxt}> Continue</Text>
            </TouchableOpacity>
       </View>
    </View>
  )
}

export default ExpenseScreen

const styles = StyleSheet.create({
    container : {
        flex :  1,
        backgroundColor:'#fd3c4a'
    },
    topContainer : {
        paddingTop: 50,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 20
    },
    txt: {
        fontSize : 18,
        color: 'white',
        fontWeight: '500'
    },
    midContainer : {
        paddingTop: 50,
        paddingHorizontal: 20
    },
    midTxt: {
        color: '#fcb7bc',
        fontSize: 18,
        fontWeight: 500
    },
    amtTxt : {
        color: 'white',
        fontSize: 52,
        fontWeight: 700,
    },
    bottomContainer : {
        height: '100%',
        backgroundColor: 'white',
        marginTop: 10,
        borderTopLeftRadius : 40,
        borderTopRightRadius: 40,
        paddingHorizontal: 20,
        
    },
    input : {
        width: '100%',
        padding: 20,
        borderWidth: 2,
        marginTop: 20,
        borderColor: '#f2f4f6',
        borderRadius: 20,
        position: 'relative',
        
    },
    arrImg: {
        position: 'absolute',
        top: 40,
        right: 29,
        tintColor: '#9f9fab',
        
    },
    btnView:{
        width: '100%',
        padding: 20,
        backgroundColor:'#7f3dff',
        marginTop: 30,
        borderColor: '#f2f4f6',
        borderRadius: 20,
    },
    btnTxt: {
        textAlign: 'center',
        color: 'white',
        fontWeight: 700
    },
    modalView:{
        backgroundColor: 'white',
        padding: 50
    }
    
})