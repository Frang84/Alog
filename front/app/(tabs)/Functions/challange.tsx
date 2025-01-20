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
    const statusOfChallange = (item: challangeItem) => {
      const today = new Date()
      if(item.limit < item.overallAlc && item.challangeType === "Limit"){
        return "failed";
      }
      if(item.limit < item.drinkCount && item.challangeType === "Alone"){
        return "failed";
      }
       if(new Date(item.endDate) > today && new Date(item.startDate) < today){
        return "in progress";
      }
       if(new Date(item.startDate) > today){
        return 'start in future';
      }
      else{ 
        return "succeeded";
      }
    } 
    const howMuchAlready = (item: challangeItem) => {
      if(item.challangeType === "Alone"){
        const result = `you drinked ${item.drinkCount} times alone already`;
        return result; 
      }
      else{ 
        const result = `you drinked ${item.overallAlc} ml of 100% alcohol already`;
        return result;
      }
    }
    return(
        
            <View style={customStyleChellange.container}>
                <MyButton  onPressFun={() => router.navigate('/extraScreens/createChellange')} textToPrint='new challange' />
                <FlatList
                data={challangesList}
                renderItem={({item}) => {
                    console.log(item);
                    return(
                        <View style={customeStyle.noteOuter}>
                            <View style={customeStyle.note}>
                                <Text>type of challange: {item.challangeType}</Text>
                                <Text>start Date: {formatDate(new Date(item.startDate))}</Text>
                                <Text>end Date: {formatDate(new Date(item.endDate))}</Text>
                                <Text>limit : {item.limit} {(item.challangeType === 'Alone') ? "(times)" : "(ml of 100% alcohol)"}</Text>
                                <Text>{howMuchAlready(item)}</Text>  
                                <Text>Status: {statusOfChallange(item)}</Text>
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