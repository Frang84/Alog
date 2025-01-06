import { Text, View, StyleSheet,ScrollView, Button } from "react-native"
import {Link} from "expo-router"
import { BarChart, LineChart, PieChart, PopulationPyramid, RadarChart } from "react-native-gifted-charts";
import { useEffect, useState } from "react";
import { apiGetRequest, apiPostRequest } from "@/app/functions/apiRequest";
import * as SecureStore from 'expo-secure-store';
import RNPickerSelect from 'react-native-picker-select';

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

    
 
  useEffect(() => {
    
    
    getStats();
    
  }, [timeSpan]);


  const generateYears = () =>{
    
    const currentDate = new Date();
    const Year = currentDate.getFullYear() - 4;
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
      if(opt === 'w'){
      idx = new Date(item.period ).getDay();    
      }
      else if(opt === 'm'){
        idx = parseInt(item.period) - 1 //dostajemy miesiace ponumerowane od 1 a indeksy w tablicy zaczynaja sie od 0. 
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
      if(opt == 'w'){
        idx = new Date(item.period ).getDay();
      }
      else if(opt == 'm'){
        idx = parseInt(item.period) - 1;
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

  function formatDate(date:Date) {
    let day = String(date.getDate()).padStart(2, '0'); // Dzień z zerem na początku
    let month = String(date.getMonth() + 1).padStart(2, '0'); // Miesiąc z zerem na początku
    let year = date.getFullYear(); // Rok
    return `${day}/${month}/${year}`;
  }
  function currentWeekStart(){
    let now = new Date();
    let startOfWeek = new Date(now.setDate(now.getDate() - now.getDay())) ;
    return startOfWeek;
  }
  function currentWeekEnd(){
    let now = new Date();
    let startOfWeek = new Date(now.setDate(now.getDate() - now.getDay())) ;
    let endOfWeek = new Date(now.setDate(startOfWeek.getDate() + 6));
    return endOfWeek;
  }
  function currentYearEnd(){
    const now = new Date(); // Pobierz bieżącą datę
    const endOfYear = new Date(now.getFullYear(), 11, 31); // Ustaw datę na 31 grudnia bieżącego roku
    return endOfYear;
  }
  function currentYearStart(){
    const now = new Date(); // Pobierz bieżącą datę
    const startOfYear = new Date(now.getFullYear(), 0, 1); // Ustaw datę na 1 stycznia bieżącego roku
    return startOfYear;
  }
  
  const  moveForward = (currentStart: Date, currentEnd: Date) => () => {
    setEndDate(nextWeek(currentEnd));
    setStartDate(nextWeek(currentStart))
    setStartDateFormated(formatDate(startDate))
    setEndDateFormated(formatDate(endDate))
    console.log(startDate);
    console.log(endDate);
  }
  const  moveBackward = (currentStart: Date, currentEnd: Date) => () => {
    setEndDate(prevWeek(currentEnd));
    setStartDate(prevWeek(currentStart))
    setStartDateFormated(formatDate(startDate))
    setEndDateFormated(formatDate(endDate))
    console.log(startDate);
    console.log(endDate);
  }
  const nextYear = (date:Date)=>{
    return new Date(date.setFullYear(date.getFullYear() + 1))
  }
  const prevYear = (date:Date)=>{
    return new Date(date.setFullYear(date.getFullYear() + 1))
  }
  const nextWeek = (date: Date) => {
    return new Date(date.setDate(date.getDate() + 7))
  }
  const prevWeek = (date: Date) => {
    return new Date(date.setDate(date.getDate() - 7))
  }
  const getStats = async () => {
    const url = 'http://10.0.2.2:8000/stats'
    const dateToken = await SecureStore.getItemAsync("DateToken");
    let span = 'w'
    let spanArr = days
    //konkretne godziny dodawane sa na serwerze 
    if(timeSpan === 'Week'){
      console.log('in weeks')
      span = 'w';
      spanArr = days;
      setStartDate(currentWeekStart());
      setEndDate(currentWeekEnd());
      setStartDateFormated(formatDate(currentWeekStart()));
      setEndDateFormated(formatDate(currentWeekEnd()));
    }

    else if(timeSpan === 'Month'){
      span = 'm';
      spanArr = months;
      setStartDate(currentYearStart());
      setEndDate(currentYearEnd());
      setStartDateFormated(formatDate(currentYearStart()));
      setEndDateFormated(formatDate(currentYearEnd()));
      console.log('endDateFormatted', endDateFormated);
      console.log('startDateFormated', startDateFormated);
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
        setAvgPercentage(data["avgAlcoholPercentageStats"].toString().substring(0,5));
        setPreferEventTypeStats(processPreferEventStats(data["preferedEventTypeStats"]));
        setPreferTimeStats(processPreferTimeStats(data["drinkingHoursStats"]));
        settotalAlcoholStats(processTotalAlcoholStats(data["totalAlcoholPriceStats"], spanArr, span));
        setTotalAlcoholPrice(processTotalPriceStats(data["totalAlcoholPriceStats"], spanArr, span ));
      } catch (error) {
        console.error("Error occured", error);
      }
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
              
              console.log("timeSpan: ",timeSpan)
            }}
          
          items={[
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