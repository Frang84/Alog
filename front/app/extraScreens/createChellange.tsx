import { BackHandler, Text, View, Modal, Button, TouchableOpacity } from "react-native"
import { useState } from "react";
import {customeStyle, customStyleChellange} from "../style"
import {Calendar, CalendarList, Agenda} from 'react-native-calendars';
import {formatDateCalendar} from '../(tabs)/Functions/timeStatsManager/time'
const CreateScreen = () =>{
    const [visibility, setVisibility] = useState(false);
    const [startDate, setStartDate] = useState("") 
    return(
        <View>
            <Button onPress={() => setVisibility(!visibility)} title="Show Modal"></Button>
            <Modal 
            transparent={true}
            visible={visibility}
            animationType="slide"
            >
                <Calendar
                    onDayPress = {(day: any) => {
                        console.log('selected day: ', day);
                        setStartDate(day['dateString']);
                    }}
                    minDate={ formatDateCalendar(new Date())}>
                    
                </Calendar>
                <Button onPress={() => setVisibility(!visibility)} title="Hide Modal"></Button>
            </Modal>
            <View style={customStyleChellange.nextToEachother} >
                <TouchableOpacity style={customStyleChellange.button}  >
                    <View style={customeStyle.button}>
                        <Text style={customeStyle.textButton}>Start Date </Text>
                    </View>
                </TouchableOpacity>

                <TouchableOpacity style={customStyleChellange.button}  >
                    <View style={customeStyle.button}>
                        <Text style={customeStyle.textButton}>End Date </Text>
                    </View>
                </TouchableOpacity>

            </View>

            
            
        </View>
    )
}

export default CreateScreen;