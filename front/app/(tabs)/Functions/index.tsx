import { Text, View, StyleSheet,ScrollView, Button } from "react-native"
import {Link} from "expo-router"
import { BarChart, LineChart, PieChart, PopulationPyramid, RadarChart } from "react-native-gifted-charts";
import { useEffect, useState } from "react";
import { apiGetRequest, apiPostRequest } from "@/app/functions/apiRequest";
import * as SecureStore from 'expo-secure-store';

const  StatsPage = () =>{
  const [startDate, setStartDate] = useState("29/12/2024")
  const [endDate, setEndDate] = useState("5/1/2025")
  const [stats, setStats] = useState([])
  const data=[ {value:50, frontColor: "green"}, {value:80}, {value:90}, {value:70}, {value:70},{value:20},{value:30},{value:70, frontColor: "red"} ]

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
        console.log("Success", `data:`,data["drinkingHoursStats"]);
        setStats(data);
        
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
          <Button title="get stats" onPress={getStats}></Button>
          <BarChart data = {data} />
          <PieChart data = {data} />  
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