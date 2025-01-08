import {Text, View, Modal, Button, TouchableOpacity, TextInput, ToastAndroid } from "react-native"
import { useEffect, useState } from "react";
import {customeStyle, customStyleChellange} from "../style"
import {Calendar} from 'react-native-calendars';
import {formatDateCalendar} from '../(tabs)/Functions/timeStatsManager/time'
import MyButton from '../customComponents/myButton';
import MyCalendar from '../customComponents/myCalendar';
import Ionicons from '@expo/vector-icons/Ionicons';
import RNPickerSelect from 'react-native-picker-select';
import {router} from "expo-router";
import {apiPostRequest} from '@/app/functions/apiRequest';
import * as SecureStore from 'expo-secure-store';


const CreateScreen = () =>{
    const [visibility, setVisibility] = useState(false);
    const [startDate, setStartDate] = useState("Start Date") ;
    const [endDate, setEndDate] = useState("End Date");
    const [type, setType] = useState("");
    const [limit, setLimit] = useState(0);

    const [dateSetter, setDateSetter] = useState(() => (date: string) => {
        setStartDate(date);
    })


    const handleSubmit = async () => { 
        const url = 'http://10.0.2.2:8000/challanges'
        console.log(limit);
        console.log(type);
        console.log(startDate);
        console.log(endDate);
        const payload = {
            limit: limit,
            challangeType: type,
            startDate: startDate,
            endDate: endDate
        };
        const dateToken = await SecureStore.getItemAsync("DateToken");   
        let accessToken = '';
        if (dateToken) {
            accessToken = JSON.parse(dateToken).token.access;
        } else {
            console.error("DateToken is null");
            return;
        }
        try {
            const data = await apiPostRequest(url, payload, accessToken);
            console.log("Success", `user loggedin:`,data);
            ToastAndroid.show('Element added successfully', ToastAndroid.LONG);
            
        } catch (error) {
            console.error("Error occured:", error);
            console.log("Error", "Unable to connect to the server");
            ToastAndroid.show('Error occured', ToastAndroid.LONG);
        }
    }
    
    const setVisibilityFun = (visibility: boolean) =>{
        setVisibility(!visibility);
    }
    
    return(
        <View>
            
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

            <View style={customStyleChellange.nextToEachother} >
                <TouchableOpacity style={customStyleChellange.button}  
                onPress={() => {
                    setVisibility(!visibility)
                    setDateSetter(()=>(date:string) => setStartDate(date));
                    }}>
                    <View style={customeStyle.button}>
                        <Text style={customeStyle.textButton}>{startDate}</Text>
                        <Ionicons name="calendar" size={18}  style={customeStyle.textButton}/>
                    </View>
                </TouchableOpacity>

                <TouchableOpacity style={customStyleChellange.button} 
                onPress={() => {
                    setVisibility(!visibility);
                    setDateSetter(()=>(date:string) => setEndDate(date));
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
                
                setType(value)
            }}
          placeholder={{label: 'Chellange type', value: null}}
          items={[
            { label: 'Alone drinking', value: 'Alone' },
            { label: 'Set a limit', value: 'Limit' },
        ]}/>
        <TextInput 
        placeholder="set you limit" 
        style={customStyleChellange.input}
        onChangeText={(value) => setLimit(parseFloat(value))}></TextInput>
        <MyButton  onPressFun={
            () => {
            handleSubmit();
            router.replace('/(tabs)/Functions/challange')
            

        }}
        textToPrint='Submit' />
            
            
        </View>
    )
}

export default CreateScreen;