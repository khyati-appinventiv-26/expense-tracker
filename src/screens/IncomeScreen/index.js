import { StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React , {useState} from 'react'
import { Image } from 'react-native'
import { Icons } from '../../assets'
import { useNavigation } from '@react-navigation/native'
import AsyncStorage from '@react-native-async-storage/async-storage'
import Modal from 'react-native-modal'
import CustomCalendar from '../../components/CustomCalendar'


const IncomeScreen = () => {
    const [incomeData , setIncomeData] = useState({
        description : '',
        date: '',
        amount : 0
    })
    const [visible, setVisible] = useState(false)
    
    const navigation = useNavigation()

    const handleIncomeData = (key , value) => {
        setIncomeData({...incomeData , [key] : value} )
        console.log(incomeData,'fghjkl;');
        
        
    }

    const storeData = async () => {
        try {
          const jsonValue = JSON.stringify(incomeData);
          console.log('AsyncStorage.setItem',jsonValue)
          await AsyncStorage.setItem('incomeData', jsonValue);
          console.log(incomeData,'678999090')
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
            <Text style={styles.txt}> Income </Text>
            <View></View>
       </View>
       <View style={styles.midContainer}>
            <Text style={styles.midTxt}>How much?</Text>
            <Text style={styles.amtTxt}> $0</Text>
       </View>
       <View style={styles.bottomContainer}>
            
            <TextInput
                style={styles.input}
                placeholder='Description'
                value={incomeData.description}
                onChangeText={(value) => handleIncomeData('description' , value)}
            />
           <TouchableOpacity onPress={() => setVisible(!visible)}>
            <View pointerEvents='none'
                style={styles.input}


            >
            <Text style={{color: incomeData.date ? null :'lightgray'}}>
                {incomeData.date ? incomeData.date : 'Date'}
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
                                setIncomeData({...incomeData ,'date' : month.dateString})
                                console.log(month.dateString,'ghjkl');
                                
                                setVisible(!visible)
        
                            }}

                        />
                   
                </Modal> 
            <TextInput
                style={styles.input}
                placeholder='Amount'
                value={incomeData.amount}
                onChangeText={(value) => handleIncomeData('amount' , value)}
            />
            <TouchableOpacity style={styles.btnView} onPress={()=>storeData()}>
                <Text style={styles.btnTxt}> Continue</Text>
            </TouchableOpacity>
       </View>
    </View>
  )
}

export default IncomeScreen

const styles = StyleSheet.create({
    container : {
        flex :  1,
        backgroundColor:'#00a86b'
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
        color: '#84d5b6',
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
    }
    
})