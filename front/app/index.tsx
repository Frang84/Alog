import { Text, View, StyleSheet, StatusBar, SafeAreaView, TextInput, Button, KeyboardAvoidingView } from "react-native"
import { useState, useEffect } from "react"
import {Link, router} from "expo-router"
import * as SecureStore from 'expo-secure-store';

const  LoginPage = () =>{
  const [email, setEmail] = useState("") 
  const [password, setPassword] = useState("") 
  const [errors, setError] = useState({})
  const [autheniticated, setAutheniticated] = useState(false) 
  

  const validateForm = () =>{
    let errors = {};
    if (!email) errors.email = 'email is requierd';
    if (!password) errors.password = 'password is requierd';
    setError(errors);
    return Object.keys(errors).length === 0;
  }
  const sendLoginRequest = async () => {
    const url = 'http://10.0.2.2:8000/auth/login'
    const payload = {
      email: email,
      password: password,
    };
    try {
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      const data = await response.json();
      if (response.ok) {
        // Obsłuż odpowiedź w przypadku sukcesu
        console.log("Success", `user loggedin:`,data);
        //console.log("Success", `user loggedin:`,data.access);
        const now = new Date();
        const twoWeeks = 14;
        const obj = {
          token: data,
          date: new Date(now.getTime() + 1000 * 60 * 60 * 24 * twoWeeks), 
        }
        SecureStore.setItemAsync("DateToken", JSON.stringify(obj));
        console.log(SecureStore.getItemAsync("DateToken"));
        setAutheniticated(true);
        console.log("authenticated", autheniticated);
        setPassword("");
        
      } else {
        // Obsłuż błędy (np. walidacja po stronie serwera)
        console.log("Error:", data.detail || "Error unknown");
        
      }
    } catch (error) {
      // Obsłuż błędy (np. brak połączenia z serwerem)
      console.error("Error occured:", error);
      console.log("Error", "Unable to connect to the server");
    }
  }
  const handleSubmit = () =>{
    if(validateForm()){
      console.log("Submitted", email, password);
      setEmail("");
      setPassword("");
      setError({});
      sendLoginRequest();
    }
  }
  const isAuthenticated = () => {
    console.log("in isAuthenticated,", autheniticated);
    SecureStore.getItemAsync("DateToken").then((value) => {
      if(value){
        const obj = JSON.parse(value);
        const now = new Date();
        if(now < new Date(obj.date)){
          setAutheniticated(true);
        }
        else{
          SecureStore.deleteItemAsync("DateToken");
          setAutheniticated(false);
      }
      
    }
    });
  }
  useEffect(() => {isAuthenticated()},[]);
  

  useEffect(() => {
    console.log('in useEffect', autheniticated);
    if (autheniticated) {
        console.log("User is authenticated");
        router.push('./(tabs)/Functions');
    }
}, [autheniticated]);


    return(
      <KeyboardAvoidingView behavior="padding" style={styles.container}>
        <SafeAreaView >
            <Text >Email</Text>
            {
              errors.email ? (<Text style={styles.errorText}>{errors.email}</Text>) : null
            }
            <TextInput style={styles.input} 
            placeholder="Enter your email" 
            value={email} 
            onChangeText={setEmail}/>

            <Text>Password</Text>
            {
              errors.password ? (<Text style={styles.errorText}>{errors.password}</Text>) : null
            }
            <TextInput style={styles.input} 
            placeholder="Enter your password"
            secureTextEntry 
            value={password} 
            onChangeText={setPassword}/>
            <Button title="Login" onPress={handleSubmit}></Button>
            <Text>Don't have account?</Text>
            <Button title="Register" onPress={() => router.push('/register')}></Button>
            
        </SafeAreaView>
      </KeyboardAvoidingView>
    )  
}
export default LoginPage;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f0f0f0',
    paddingTop: StatusBar.currentHeight
  },
  input:{
    height: 40,
    width: 160,
    margin: 12,
    padding: 10,
    borderWidth: 1
  },
  errorText:{
    color: 'red',
    marginBottom: 10,
  }
});