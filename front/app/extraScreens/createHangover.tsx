import {Text, View, Modal, Button, TouchableOpacity, TextInput, ToastAndroid } from "react-native"
import { useEffect, useState } from "react";
import {customeStyle, customStyleChellange} from "../style"
import {Calendar} from 'react-native-calendars';
import {formatDateCalendar} from '../(tabs)/Functions/timeStatsManager/time'
import MyButton from '../customComponents/myButton';
import MyCalendar from '../customComponents/myCalendar';
import Ionicons from '@expo/vector-icons/Ionicons';
import RNPickerSelect from 'react-native-picker-select';
import { formatDate } from "../(tabs)/Functions/timeStatsManager/time"; 
import {router} from "expo-router";
import {apiPostRequest} from '@/app/functions/apiRequest';
import * as SecureStore from 'expo-secure-store';
import { IconSymbol } from "@/components/ui/IconSymbol";


const CreateScreen = () =>{
    const [visibility, setVisibility] = useState(false);
;

    

    const [hangoverType, setHangoverType] = useState('');
    const [date, setDate] = useState(() => {return formatDate(new Date())})

    const handleSubmit = async () => { 
        
    }
    
    const setVisibilityFun = (visibility: boolean) =>{
        setVisibility(!visibility);
    }
    const dateSetter = (date:string) => {
        setDate(date);
    }
    
    return(
        <View>
            <View style={customStyleChellange.nextToEachother}>
                <TextInput style={customStyleChellange.input} editable={false}>{date}</TextInput>
                <TouchableOpacity  
                onPress={() => {
                    setVisibility(!visibility)
                    
                    }}>
                    <View style={customeStyle.button}>    
                        <Ionicons name="calendar"   style={customeStyle.calendarButton}/>
                    </View>
                </TouchableOpacity>
            </View>
            <RNPickerSelect style={{ inputIOS: customeStyle.input, inputAndroid: customeStyle.inputAndroid }}
            onValueChange={(value) => 
                {
                console.log(value)
                setHangoverType(value)
                }}
            placeholder={{ label: 'choose hangover symptom', value: null }}
            
            items={[
            { label: 'restless night', value: 'restless night' },
            { label: 'bad mood', value: 'bad mood' },      
            { label: 'indigestion', value: 'indigestion' },  
            ]}
            />

        <MyButton  onPressFun={
            () => {
            handleSubmit();
        }}
        textToPrint='Submit' />
        <Modal 
            transparent={true}
            visible={visibility}
            animationType="slide">
            <MyCalendar 
                setDateFun={dateSetter} 
                setVisibilityFun={setVisibilityFun} 
                visibility={visibility}>
            </MyCalendar>
            <Button onPress={() => setVisibility(!visibility)} title="Hide Modal"></Button>
        </Modal>
            
        </View>
    )
}

export default CreateScreen;