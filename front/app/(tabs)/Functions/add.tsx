import { Text, View, StyleSheet,TextInput, SafeAreaView, KeyboardAvoidingView, Button, Keyboard, Alert, ToastAndroid } from "react-native"
import { useState } from "react"
import {Link} from "expo-router"
import RNPickerSelect from 'react-native-picker-select';
import { apiPostRequest } from "@/app/functions/apiRequest";
import * as SecureStore from 'expo-secure-store';
const  AddPage = () =>{
  const [alcoholType, setalcoholType] = useState("") 
  const [alcoholName, setalcoholName] = useState("")
  const [price, setPrice] = useState(0)
  const [volume, setVolume] = useState(0)
  const [percentage, setPercentage] = useState(0)
  const [eventName, setEventName] = useState("Party")
  const [brand, setBrand] = useState("")

  const autoCompleteAlcohol = (alcoholTypeVal: string) => {
    if(alcoholTypeVal === "Bear"){
      setalcoholName("default bear")
      setPrice(15)
      setVolume(500)
      setPercentage(5)
      setBrand("default bear")
  }
  if(alcoholTypeVal === "Vodka"){
    setalcoholName("default vodka")
    setPrice(10)
    setVolume(30)
    setPercentage(40)
    setBrand("default vodka")
  }
  if(alcoholTypeVal === "Wine"){
    setalcoholName("default wine")
    setPrice(26)
    setVolume(150)
    setPercentage(12)
    setBrand("default wine")
  }
  if(alcoholTypeVal === "Whiskey"){
    setalcoholName("default whiskey")
    setPrice(26)
    setVolume(40)
    setPercentage(40)
    setBrand("default whiskey")
  }
  if(alcoholTypeVal === "Liqueur"){
    setalcoholName("default liqueur")
    setPrice(26)
    setVolume(40)
    setPercentage(40)
    setBrand("default liqueur")
  }
  //dokoncz dopisywanie
}

  const handleSubmit = async () => {
    console.log(alcoholType, alcoholName, price, volume, percentage, eventName)
    const url = 'http://10.0.2.2:8000/add'
    const payload = {
      name: alcoholName,
      alcoholType: alcoholType,
      price: price,
      volume: volume,
      percentage: percentage,
      eventName: eventName,
      brand: brand
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
      
    } catch (error) {
      console.error("Error occured:", error);
      console.log("Error", "Unable to connect to the server");
      ToastAndroid.show('Error occured', ToastAndroid.LONG);
    }
}
    return(
        <View style={styles.container}>
        <RNPickerSelect style={{ inputIOS: styles.input, inputAndroid: styles.inputAndroid }}
          onValueChange={(value) => 
            {
              console.log(value)
              setalcoholType(value)
              autoCompleteAlcohol(value)
            }}
          placeholder={{ label: 'Alcohol Type', value: null }}
          items={[
          { label: 'Bear', value: 'Bear' },
          { label: 'Vodka', value: 'Vodka' },
          { label: 'Wine', value: 'Wine' },
          { label: 'Whiskey', value: 'Whiskey' },
          { label: 'Liqueur', value: 'Liqueur' },
          { label: 'Cider', value: 'Cider' },
          { label: 'Rum', value: 'Rum' },
          { label: 'Gin', value: 'Gin' },
          { label: 'Brandy', value: 'Brandy' },
          { label: 'Tequila', value: 'Tequila' },
          { label: 'Cognac', value: 'Cognac' },
          { label: 'Other', value: 'Other' },
        ]}
          />
          <Text>Alcohol name</Text>
          <TextInput style={styles.input} 
          onChangeText={setalcoholName}
          value={alcoholName.toString()}
          ></TextInput>



          <Text>Price (PLN)</Text>
          <TextInput 
          style={styles.input} 
          onChangeText={(text) => setPrice(Number(text))}
          value={price.toString()}
          ></TextInput>


            <Text>Volume (ml)</Text>
            <TextInput 
            style={styles.input} 
            value={volume.toString()} 
            onChangeText={(text) => setVolume(Number(text))} 
            placeholder="Volume"
            />

          <Text>Percantage %</Text>
          <TextInput style={styles.input}
            onChangeText={(text) => setPercentage(Number(text))}
            value={percentage.toString()}
          ></TextInput>

          <Text>Brand</Text>
          <TextInput style={styles.input}
           onChangeText={setBrand}
            value={brand.toString()}
           ></TextInput>

          <RNPickerSelect style={{ inputIOS: styles.input, inputAndroid: styles.inputAndroid }}
          onValueChange={(value) => 
            {
              console.log(value)
              setEventName(value)
            }}
          placeholder={{ label: 'Party', value: 'Party' }}
          
          items={[
          { label: 'Alone', value: 'Alone' },
          { label: 'Wedding', value: 'Wedding' },
          { label: 'Birthday', value: 'Birthday' },
          { label: 'Meeting with friend', value: 'Meeting with friend' },
          { label: 'Work meeting', value: 'Work meeting' },
          { label: 'Date', value: 'Date' },
          { label: 'Other', value: 'Other' },
          
        ]}
          />

          <Button title="Add" onPress={handleSubmit}></Button>
            
        </View>
    )
}
export default AddPage;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f0f0f0',
  },
  input:{
    height: 40,
    width: 160,
    margin: 12,
    padding: 10,
    borderWidth: 1,
  },
  inputAndroid: {
    fontSize: 16,
    padding: 10,
    borderWidth: 1,
    width: 160,
    color: 'black',
     
  }
});