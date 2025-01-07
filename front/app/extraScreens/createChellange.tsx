import {Text, View, Modal, Button, TouchableOpacity, TextInput } from "react-native"
import { useState } from "react";
import {customeStyle, customStyleChellange} from "../style"
import {Calendar} from 'react-native-calendars';
import {formatDateCalendar} from '../(tabs)/Functions/timeStatsManager/time'
import MyButton from '../customComponents/myButton';
import MyCalendar from '../customComponents/myCalendar';
import Ionicons from '@expo/vector-icons/Ionicons';
import RNPickerSelect from 'react-native-picker-select';
import {router} from "expo-router"
const CreateScreen = () =>{
    const [visibility, setVisibility] = useState(false);
    const [startDate, setStartDate] = useState("Start Date") ;
    const [endDate, setEndDate] = useState("End Date") ;

    let setDateFun = (date: string) => {
        
    }
    const setVisibilityFun = (visibility: boolean) =>{
        setVisibility(!visibility);
    }
    return(
        <View>
            <Button onPress={() => setVisibility(!visibility)} title="Show Modal"></Button>
            <Modal 
            transparent={true}
            visible={visibility}
            animationType="slide">
                {/* <Calendar
                    onDayPress = {(day: any) => {
                        console.log('selected day: ', day);
                        setStartDate(day['dateString']);
                        setVisibility(!visibility);
                    }}
                    minDate={ formatDateCalendar(new Date())}>
                </Calendar> */}
                <MyCalendar setDateFun={setDateFun} setVisibilityFun={setVisibilityFun} visibility={visibility}></MyCalendar>
                <Button onPress={() => setVisibility(visibility)} title="Hide Modal"></Button>
            </Modal>

            <View style={customStyleChellange.nextToEachother} >
                <TouchableOpacity style={customStyleChellange.button}  
                onPress={() => {
                    setVisibility(!visibility)
                    setDateFun = (date:string) => {setStartDate(date);}
                    }}>
                    <View style={customeStyle.button}>
                        <Text style={customeStyle.textButton}>{startDate}</Text>
                        <Ionicons name="calendar" size={18}  style={customeStyle.textButton}/>
                    </View>
                </TouchableOpacity>

                <TouchableOpacity style={customStyleChellange.button} 
                onPress={() => {
                    setVisibility(!visibility);
                    setDateFun = (date:string) => {setEndDate(date);}
                    }} >
                    <View style={customeStyle.button}>
                        <Text style={customeStyle.textButton}>{endDate}</Text>
                        <Ionicons name="calendar" size={18}  style={customeStyle.textButton}/>
                    </View>
                </TouchableOpacity>
            </View>

            <RNPickerSelect style={{  }}
          onValueChange={(value) => 
            {
                console.log(value)
            }}
          placeholder={{label: 'Chellange type', value: null}}
          items={[
            { label: 'Alone drinking', value: 'alone' },
            { label: 'Set a limit', value: 'limit' },
        ]}/>
        <TextInput placeholder="set you limit" style={customStyleChellange.input}></TextInput>
        <MyButton  onPressFun={() => router.replace('/(tabs)/Functions/chellange')} textToPrint='Submit' />
            
            
        </View>
    )
}

export default CreateScreen;