import { Text, View, StyleSheet,ScrollView, Button } from "react-native"
import {Link} from "expo-router"
import { BarChart, LineChart, PieChart, PopulationPyramid, RadarChart } from "react-native-gifted-charts";
import { useEffect, useState } from "react";
import { apiGetRequest, apiPostRequest } from "@/app/functions/apiRequest";
import * as SecureStore from 'expo-secure-store';
import RNPickerSelect from 'react-native-picker-select';
import {formatDate, currentDay,currentWeekStart, currentWeekEnd, currentYearStart, currentYearEnd,fourYearsAgo,prevWeek,nextDay,nextWeek,nextYear,nextFourYears,prevDay, prevYear,prevFourYears} from './timeManager/time';
import { parse } from "@babel/core";

const  StatsPage = () =>{

  interface barDataItem{
    value: number;
    label?: string;
  }

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
  const [timeSpan, setTimeSpan] = useState('Week');
 
  const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
  const days = [  'Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  const hours = ['00', '01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20', '21', '22', '23'];
    
 
  useEffect(() => {
    
    
    getStats();
    
  }, [timeSpan,startDate]);


  const generateYears = () =>{
    
    
    const Year = endDate.getFullYear() - 4;
    let years = [Year.toString()];
    for (let index = 1; index < 5; index++) {
      years.push((Year + index).toString())
    }
    console.log(years)
    return years;
  }

  const processTotalAlcoholStats = (data: {period: string, totalAlcohol: number, totalPrice: number}[], timeStamps: string[], opt:string) => {
    let barData = timeStamps.map((label) => ({
      label: label,
      value: 0,
    }));
    
    data.forEach((item) => {
      let idx = 0;
      if (opt === 'd'){
        idx = parseInt(item.period);
      }
      else if(opt === 'w'){
      idx = new Date(item.period ).getDay();    
      }
      else if(opt === 'm'){
        idx = parseInt(item.period) - 1 //dostajemy miesiace ponumerowane od 1 a indeksy w tablicy zaczynaja sie od 0. 
      }
      else if(opt === 'y'){
        idx = parseInt(item.period) - parseInt(timeStamps[0]);
      }
      
      barData[idx].value = item.totalAlcohol;
    })
    console.log('barData: ', barData)
    return barData;
  }

  const processTotalPriceStats = (data: {period: string, totalAlcohol: number, totalPrice: number}[], timeStamps: string[], opt:string) => {
    let barData = timeStamps.map((label) => ({
      label: label,
      value: 0,
    }));
    
    data.forEach((item) => {
      let idx = 0;
      if (opt === 'd'){
        idx = parseInt(item.period);
      }
      if(opt == 'w'){
        idx = new Date(item.period ).getDay();
      }
      else if(opt == 'm'){
        idx = parseInt(item.period) - 1;
      }
      else if(opt === 'y'){
        idx = parseInt(item.period) - parseInt(timeStamps[0]);
      }
      barData[idx].value = item.totalPrice;
    })
    
    return barData;
  }
    


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

  const processPreferEventStats = (data: {eventType: string, volume: number}[]) =>{
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
  const processPreferTimeStats = (data: {time: string, volume: number}[]) =>{
    const times: string[] = ['00', '01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11','12','13','14','15','16','17','18','19','20','21','22','23'];
    let barData = times.map((label) => ({
      label: label,
      value: 0,
    })); 
    data.forEach((item) => {
      const type = item.time;
      const index = barData.findIndex((item) => item.label === type);
      barData[index].value = item.volume;
    });
    return barData;
  }


  
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

      console.log('endDateFormatted', endDateFormated);
      console.log('startDateFormated', startDateFormated);
    }

    else if(timeSpan === 'Year'){
      span = 'y';
      spanArr = generateYears();
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
      console.log('endDateFormatted', endDateFormated);
      console.log('startDateFormated', startDateFormated);
    }
    else if(timeSpan === 'Year'){
      setStartDate(fourYearsAgo());
      setEndDate(currentYearEnd());
      setStartDateFormated(formatDate(fourYearsAgo()));
      setEndDateFormated(formatDate(currentYearEnd()));
    }
  }
  
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
              timePeriod();
              console.log("timeSpan: ",timeSpan)
            }}
          
          items={[
            { label: 'Day', value: 'Day' },
            { label: 'Week', value: 'Week' },
            { label: 'Month', value: 'Month' },
            { label: 'Year', value: 'Year' },
        ]}
          />
          <Text>Prefer alcohol</Text>
          <BarChart data = {preferAlcoTypeStats} />  

          <Text>Prefer Event</Text>
          <BarChart data = {preferEventTypeStats} />

          <Text>average percentage of alcohol which you drink {avgPercentage}%</Text>

          <Text>prefer time to drink</Text>
          <BarChart data = {preferTimeStats} />
          <Text>Pure alcohol consumption</Text>
          <BarChart data = {totalAlcoholStats} 
          
          yAxisLabelSuffix=" ml"
          onPress = {(item: {label: string, value: number},index: number)=>console.log('item',item)}
          
          />
          <Text>money which you spend for alcohol</Text>
          <BarChart data = {totalAlcoholPrice} />
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