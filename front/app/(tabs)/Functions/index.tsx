import { Text, View, StyleSheet,ScrollView, Button } from "react-native"
import {Link} from "expo-router"
import { BarChart, LineChart, PieChart, PopulationPyramid, RadarChart } from "react-native-gifted-charts";
import { useEffect, useState } from "react";
import { apiGetRequest, apiPostRequest } from "@/app/functions/apiRequest";
import * as SecureStore from 'expo-secure-store';

const  StatsPage = () =>{

  interface barDataItem{
    value: number;
    label?: string;
  }

  const [startDate, setStartDate] = useState("29/12/2024")
  const [endDate, setEndDate] = useState("5/1/2025")
  const [preferAlcoTypeStats, setPreferAlcoTypeStats] = useState<barDataItem[]>([])
  const [avgPercentage, setAvgPercentage] = useState<string>('0')
  const [preferEventTypeStats, setPreferEventTypeStats] = useState<barDataItem[]>([])

 
  useEffect(() => {
    
    getStats();
    
  }, []);

  const processPreferAlcoholStats = (data: {alcoholType: string, volume: number}[]) =>{
    const alcoholTypes: string[] = ['Vodka', 'Bear', 'Wine', 'Whiskey', 'Rum', 'Tequila', 'Gin', 'Brandy', 'Liqueur', 'Cider', 'Other'];
    let barData = alcoholTypes.map((label) => ({
      label: label,
      value: 0,
    })); 
    data.forEach((item) => {
      const type = item.alcoholType;
      const index = barData.findIndex((item) => item.label === type);
      barData[index].value = item.volume;
    });
    return barData;
  }
  const processPreferAlcoholEventStats = (data: {eventType: string, volume: number}[]) =>{
    const events: string[] = ['Party', 'Wedding', 'Birthday', 'Meeting with friend','Work meeting', 'Date', 'Alone', 'Other'];
    let barData = events.map((label) => ({
      label: label,
      value: 0,
    })); 
    data.forEach((item) => {
      const type = item.eventType;
      const index = barData.findIndex((item) => item.label === type);
      barData[index].value = item.volume;
    });
    return barData;
  }

  const getStats = async () => {
    const url = 'http://10.0.2.2:8000/stats'
    const dateToken = await SecureStore.getItemAsync("DateToken");
    const payload = {
      startDate: startDate,
      endDate: endDate
    };
    if (dateToken) {
      const accessToken = JSON.parse(dateToken).token.access;
      try {
        const data = await apiPostRequest(url, payload, accessToken);
        console.log("Success", `user loggedin:`, data);
        setPreferAlcoTypeStats(processPreferAlcoholStats(data["preferAlcoTypeStats"]));
        
        setAvgPercentage(data["avgAlcoholPercentageStats"].toString().substring(0,5));
        setPreferEventTypeStats(processPreferAlcoholEventStats(data["preferedEventTypeStats"]));
      } catch (error) {
        console.error("Error occured", error);
      }
    }
  }

  
  return(
    <View style={styles.container}>
      <ScrollView style={styles.scrollView}>
          <Text>
              index Page
          </Text>   
          <Text></Text>
          <BarChart data = {preferAlcoTypeStats} />
          <PieChart data = {preferAlcoTypeStats} />  
          <BarChart data = {preferEventTypeStats} />
          <Text>average percentage of alcohol which you drink {avgPercentage}%</Text>
      </ScrollView>
    </View>
  )
}
export default StatsPage;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // justifyContent: 'center',
    // alignItems: 'center',
    padding:10,
    backgroundColor: '#f0f0f0',
  },
  scrollView: {
    flex: 1,
   
    backgroundColor: '#f0f0f0',
    marginHorizontal: 20,
  },
});