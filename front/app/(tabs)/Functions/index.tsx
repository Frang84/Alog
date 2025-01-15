import { Text, View, StyleSheet,ScrollView, Button } from "react-native"
import {Link} from "expo-router"
import { BarChart, LineChart, PieChart, PopulationPyramid, RadarChart } from "react-native-gifted-charts";
import { useEffect, useState, useCallback } from "react";
import { apiGetRequest, apiPostRequest } from "@/app/functions/apiRequest";
import * as SecureStore from 'expo-secure-store';
import RNPickerSelect from 'react-native-picker-select';
import {formatDate, currentDay,currentWeekStart, currentWeekEnd, currentYearStart, currentYearEnd,fourYearsAgo,
  prevWeek,nextDay,nextWeek,nextYear,nextFourYears,prevDay,
  prevYear,prevFourYears, generateYears} from './timeStatsManager/time'
import {processPreferAlcoholStats, processPreferEventStats, processPreferTimeStats, processTotalAlcoholStats, processTotalPriceStats} from './timeStatsManager/stats'
import {barDataItem} from './types'
import MyBarChart from '../../customComponents/myCharts/myBarChart'
import { useFocusEffect } from "expo-router";

import { parse } from "@babel/core";

const  StatsPage = () =>{



  const [startDateFormated, setStartDateFormated] = useState(() => {
    return formatDate(currentWeekStart());
  });
  const [endDateFormated, setEndDateFormated] = useState(() => {
    return formatDate(currentWeekEnd());
  });

  const [startDate, setStartDate] = useState<Date>(() => {
    return currentWeekStart();
  })

  const [endDate, setEndDate] = useState<Date>(() => {
    return currentWeekEnd();
  });

  const [preferAlcoTypeStats, setPreferAlcoTypeStats] = useState<barDataItem[]>([]);
  const [avgPercentage, setAvgPercentage] = useState<string>('0');
  const [preferEventTypeStats, setPreferEventTypeStats] = useState<barDataItem[]>([]);
  const [preferTimeStats, setPreferTimeStats] = useState<barDataItem[]>([]);
  const [totalAlcoholStats, settotalAlcoholStats] = useState<barDataItem[]>([]);
  const [totalAlcoholPrice, setTotalAlcoholPrice] = useState<barDataItem[]>([]);
  const [totalAlcohol, setTotalAlcohol] = useState('')
  const [timeSpan, setTimeSpan] = useState('Week');
 
  const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
  const days = [  'Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  const hours = ['00', '01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20', '21', '22', '23'];
    
 
  useEffect(() => {
    getStats();
  }, [timeSpan,startDate]);

  useFocusEffect(
    useCallback(() => {
      getStats();
    }, [])
  )


  


  
  const  moveForward = (currentStart: Date, currentEnd: Date) => () => {
  if(timeSpan === "Day"){
    setEndDate(nextDay(currentEnd));
    setStartDate(nextDay(currentStart))
    setStartDateFormated(formatDate(startDate))
    setEndDateFormated(formatDate(endDate))
  }
  else if(timeSpan === "Week"){
    setEndDate(nextWeek(currentEnd));
    setStartDate(nextWeek(currentStart))
    setStartDateFormated(formatDate(startDate))
    setEndDateFormated(formatDate(endDate))
  }
  else if(timeSpan === "Month"){
    setEndDate(nextYear(currentEnd));
    setStartDate(nextYear(currentStart))
    setStartDateFormated(formatDate(startDate))
    setEndDateFormated(formatDate(endDate))
  }
  else if(timeSpan === "Year"){
    setEndDate(nextFourYears(currentEnd));
    setStartDate(nextFourYears(currentStart))
    setStartDateFormated(formatDate(startDate))
    setEndDateFormated(formatDate(endDate))
  }
    console.log(startDate);
    console.log(endDate);
  }
  const  moveBackward = (currentStart: Date, currentEnd: Date) => () => {
    if(timeSpan === "Day"){
      setEndDate(prevDay(currentEnd));
      setStartDate(prevDay(currentStart))
      setStartDateFormated(formatDate(startDate))
      setEndDateFormated(formatDate(endDate))
    }
    else if(timeSpan === "Week"){
      setEndDate(prevWeek(currentEnd));
      setStartDate(prevWeek(currentStart))
      setStartDateFormated(formatDate(startDate))
      setEndDateFormated(formatDate(endDate))
    }
    else if(timeSpan === "Month"){
      setEndDate(prevYear(currentEnd));
      setStartDate(prevYear(currentStart))
      setStartDateFormated(formatDate(startDate))
      setEndDateFormated(formatDate(endDate))
    }
    else if(timeSpan === "Year"){
      setEndDate(prevFourYears(currentEnd));
      setStartDate(prevFourYears(currentStart))
      setStartDateFormated(formatDate(startDate))
      setEndDateFormated(formatDate(endDate))
    }
  }

  const getStats = async () => {
    const url = 'http://10.0.2.2:8000/stats'
    const dateToken = await SecureStore.getItemAsync("DateToken");
    let span = 'w'
    let spanArr = days
    //konkretne godziny dodawane sa na serwerze 
    if(timeSpan == 'Day'){
      span = 'd';
      spanArr = hours;
      
    }
    else if(timeSpan === 'Week'){
      console.log('in weeks')
      span = 'w';
      spanArr = days;

    }

    else if(timeSpan === 'Month'){
      span = 'm';
      spanArr = months;

    }

    else if(timeSpan === 'Year'){
      span = 'y';
      spanArr = generateYears(endDate);
    }
    
    const payload = {
      startDate: startDateFormated,
      endDate: endDateFormated,
      timeSpan: timeSpan
    };
    if (dateToken) {
      const accessToken = JSON.parse(dateToken).token.access;
      try {
        const data = await apiPostRequest(url, payload, accessToken);
        console.log("Success", `user loggedin:`, data);
        console.log("timeSpan: ", timeSpan);

        setPreferAlcoTypeStats(processPreferAlcoholStats(data["preferAlcoTypeStats"]));
        let avgAlcPer = (data["avgAlcoholPercentageStats"] !== null) ? data["avgAlcoholPercentageStats"].toString().substring(0,5) : '0.0';
        setAvgPercentage(avgAlcPer);
        let totalAlcohol = (data["totalAlcoholConsumption"] !== null) ? data["totalAlcoholConsumption"].toString().substring(0,5) : '0.0';
        setTotalAlcohol(totalAlcohol);
        setPreferEventTypeStats(processPreferEventStats(data["preferedEventTypeStats"]));
        setPreferTimeStats(processPreferTimeStats(data["drinkingHoursStats"]));
        settotalAlcoholStats(processTotalAlcoholStats(data["totalAlcoholPriceStats"], spanArr, span));
        setTotalAlcoholPrice(processTotalPriceStats(data["totalAlcoholPriceStats"], spanArr, span ));
      } catch (error) {
        console.error("Error occured", error);
      }
    }
  }

  const timePeriod = () => {
    if(timeSpan === 'Day'){
      console.log('in weeks')
      setStartDate(currentDay());
      setEndDate(currentDay());
      setStartDateFormated(formatDate(currentDay()));
      setEndDateFormated(formatDate(currentDay()));
    }
    else if(timeSpan === 'Week'){
      console.log('in weeks')
      setStartDate(currentWeekStart());
      setEndDate(currentWeekEnd());
      setStartDateFormated(formatDate(currentWeekStart()));
      setEndDateFormated(formatDate(currentWeekEnd()));
    }

    else if(timeSpan === 'Month'){
      setStartDate(currentYearStart());
      setEndDate(currentYearEnd());
      setStartDateFormated(formatDate(currentYearStart()));
      setEndDateFormated(formatDate(currentYearEnd()));

    }
    else if(timeSpan === 'Year'){
      setStartDate(fourYearsAgo());
      setEndDate(currentYearEnd());
      setStartDateFormated(formatDate(fourYearsAgo()));
      setEndDateFormated(formatDate(currentYearEnd()));
    }
  }
  useEffect(()=>{
    timePeriod();
  }, [timeSpan])
  
  return(
    <View style={styles.container}>
      <ScrollView style={styles.scrollView}>  
        <Text>{startDateFormated} - {endDateFormated}</Text>
        <Button title=">" onPress={moveForward(startDate, endDate)}></Button>
        <Button title="<" onPress={moveBackward(startDate, endDate)}></Button>
      <RNPickerSelect style={{ inputIOS: styles.input, inputAndroid: styles.inputAndroid }}
          onValueChange={(value) => 
            {
              setTimeSpan(value);
              console.log('value changed')
             
              console.log("timeSpan: ",timeSpan)
            }}
          
          items={[
            { label: 'Day', value: 'Day' },
            { label: 'Week', value: 'Week' },
            { label: 'Month', value: 'Month' },
            { label: 'Year', value: 'Year' },
        ]}/>

          <Text>Total alcohol consumption: {totalAlcohol} in ml of pure (100%) alcohol</Text>

          <Text>Prefer alcohol in ml of pure (100%) alcohol</Text>
          <MyBarChart data={preferAlcoTypeStats}></MyBarChart>

          <Text>Prefer Event in term of pure Alcohol consumption in ml</Text>
          <MyBarChart data={preferEventTypeStats}></MyBarChart>

          <Text>prefer time to drink</Text>
          <MyBarChart data={preferTimeStats}></MyBarChart>

          <Text>Pure alcohol consumption</Text>
          <MyBarChart data={totalAlcoholStats}></MyBarChart>

          <Text>money which you spend on alcohol</Text>
          <MyBarChart data={totalAlcoholPrice}></MyBarChart>

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
  inputAndroid: {
    fontSize: 16,
    padding: 10,
    borderWidth: 1,
    width: 160,
    color: 'black',
     
  },
  input:{
    height: 40,
    width: 160,
    margin: 12,
    padding: 10,
    borderWidth: 1,
  },
});