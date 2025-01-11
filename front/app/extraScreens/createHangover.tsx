import {Text, View, Modal, Button, TouchableOpacity, TextInput, ToastAndroid, FlatList,  } from "react-native"
import { useEffect, useState } from "react";
import {customeStyle, customStyleChellange} from "../style"
import {Calendar} from 'react-native-calendars';
import { hangoverItem } from "../(tabs)/Functions/types";
import MyButton from '../customComponents/myButton';
import MyCalendar from '../customComponents/myCalendar';
import Ionicons from '@expo/vector-icons/Ionicons';
import RNPickerSelect from 'react-native-picker-select';
import { formatDate, formatDateCalendar } from "../(tabs)/Functions/timeStatsManager/time"; 
import {router} from "expo-router";
import {apiPostRequest, apiGetRequest, apiDeleteRequest} from '@/app/functions/apiRequest';
import * as SecureStore from 'expo-secure-store';
import AntDesign from '@expo/vector-icons/AntDesign';


const CreateScreen = () =>{
    const [visibility, setVisibility] = useState(false);;
    const [hangoverType, setHangoverType] = useState('');
    const [date, setDate] = useState(() => {return formatDateCalendar(new Date())})
    const [hangoversList, setHangoversList] = useState<hangoverItem[]>([])

const handleSubmit = async () => { 
        const url = 'http://10.0.2.2:8000/hangovers'
        const payload = {
            date: date,
            hangoverType: hangoverType,

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
            getHangovers();
            
        } catch (error) {
            console.error("Error occured:", error);
            console.log("Error", "Unable to connect to the server");
            ToastAndroid.show('Error occured', ToastAndroid.LONG);
        }
    }

    const getHangovers = async () => {
        const url = 'http://10.0.2.2:8000/hangovers'
        const dateToken = await SecureStore.getItemAsync("DateToken");
        if (dateToken) {
          const accessToken = JSON.parse(dateToken).token.access;
          try {
            const data = await apiGetRequest(url, accessToken);
            setHangoversList(data["hangoversList"])
            console.log(hangoversList)
          } catch (error) {
            console.error("Error occured", error);
          }
        }
      }
    const deleteHangover = async (hangoverId: number) =>{
        const url = 'http://10.0.2.2:8000/hangovers'
        const payload = {
            hangoverId: hangoverId
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
            const data = await apiDeleteRequest(url, payload, accessToken);
            console.log("Success", `user loggedin:`,data);
            ToastAndroid.show('Element DELETED successfully', ToastAndroid.LONG);
            getHangovers();
            
        } catch (error) {
            console.error("Error occured:", error);
            console.log("Error", "Unable to connect to the server");
            ToastAndroid.show('Error occured', ToastAndroid.LONG);
        }
    }
    const setVisibilityFun = (visibility: boolean) =>{
        setVisibility(!visibility);
    }
    const dateSetter = (date:string) => {
        setDate(date);
    }
    useEffect(()=>{getHangovers()}, 
    [])
    
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
        <FlatList
            data={hangoversList}
            renderItem={({item}) => {
                
                return(
                    <View style={customeStyle.noteOuter}>
                        <View style={customeStyle.note}>
                            <Text>type of hangover: {item.hangoverType}</Text>
                            <Text>Date: {formatDate(new Date(item.date))}</Text>
                            <TouchableOpacity  
                                onPress={() => {
                                        deleteHangover(item.id);
                                        getHangovers();
                                    }}>
                                    <View >    
                                        <AntDesign name="delete"   />
                                    </View>
                        </TouchableOpacity>
                        </View>
                    </View>
                );
            }}
        >    
        </FlatList>
        </View>
    )
}

export default CreateScreen;