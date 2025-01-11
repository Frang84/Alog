import { View, Text, ScrollView, FlatList} from "react-native"
import { customeStyle, customStyleChellange } from "@/app/style"
import MyButton from '../../customComponents/myButton'
import {Link, router} from "expo-router"
import * as SecureStore from 'expo-secure-store';
import {apiGetRequest} from '@/app/functions/apiRequest'
import { useState, useCallback, useEffect } from "react";
import { useFocusEffect } from "expo-router";
import {barDataItem, challangeItem} from './types'
import { EventEmitter } from 'events';
import {formatDate} from './timeStatsManager/time'

const ChallangeScreen = () =>{
    const [challangesList, setChallangesList] = useState<challangeItem[]>([]);
 
    
      useFocusEffect(
        useCallback(() => {
          getChallange();
        }, [])
      )
    const getChallange = async () => {
        const url = 'http://10.0.2.2:8000/challanges'
        const dateToken = await SecureStore.getItemAsync("DateToken");
        if (dateToken) {
          const accessToken = JSON.parse(dateToken).token.access;
          try {
            const data = await apiGetRequest(url, accessToken);
            setChallangesList(data["challangesList"])
           
          } catch (error) {
            console.error("Error occured", error);
          }
        }
      }
    return(
        
            <View style={customStyleChellange.container}>
                <MyButton  onPressFun={() => router.navigate('/extraScreens/createChellange')} textToPrint='new chellange' />
                <FlatList
                data={challangesList}
                renderItem={({item}) => {
                    
                    return(
                        <View style={customeStyle.noteOuter}>
                            <View style={customeStyle.note}>
                                <Text>type of challange: {item.challangeType}</Text>
                                <Text>start Date: {formatDate(new Date(item.startDate))}</Text>
                                <Text>end Date: {formatDate(new Date(item.endDate))}</Text>
                                <Text>limit : {item.limit} {(item.challangeType === 'Alone') ? "(times)" : "(ml of 100% alcohol)"}</Text>
                                <Text>how much you drinked already: {item.overallAlc} (ml od 100% alcohol)</Text>  
                            </View>
                        </View>
                    );
                }}
            >    
            </FlatList>
            </View>

        
            

            
        
    )
}

export default ChallangeScreen;