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


  const [stats, setStats] = useState([])
  const data=[ {value:50, frontColor: "green", label:'bear'}, {value:80}, {value:90}, {value:70}, {value:70},{value:20},{value:30},{value:70, frontColor: "red"} ]
 
  useEffect(() => {
    getStats();
    setPreferAlcoTypeStats(processPreferAlcoholStats(stats));
  }, []);

  const processPreferAlcoholStats = (data: {alcoholType: string, volume: number}[]) =>{
    
    console.log(stats);
    let barData = data.map((item) => ({
      label: item.alcoholType,
      value: item.volume,
    }));
    console.log("bar data", barData);
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
        console.log("Success", `data:`,data);
        setStats(data["preferAlcoTypeStats"]);
        // processPreferAlcoholStats(stats);
        
      } catch (error) {
        console.error("Error occured", error);
      }
    }
  }

  
  return(
      <View style={styles.container}>
          <Text>
              index Page
          </Text>   
          
          <BarChart data = {data} />
          <PieChart data = {preferAlcoTypeStats} />  
      </View>
  )
}
export default StatsPage;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f0f0f0',
  },
});