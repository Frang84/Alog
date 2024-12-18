import { Text, View, StyleSheet, StatusBar, SafeAreaView, TextInput, Button, KeyboardAvoidingView, AppRegistry } from "react-native"
import { useState } from "react"
import {Link, router} from "expo-router"
import {sendRequest} from "./functions/apiPostRequest"

const  RegisterPage = () =>{
  const [email, setEmail] = useState("") ;
  const [password, setPassword] = useState("") ;
  const [username, setUsername] = useState("");
  const [errors, setError] = useState({});
  

  const validateForm = () =>{
    let errors = {};
    if (!email) errors.email = 'email is requierd';
    if (!password) errors.password = 'password is requierd';
    if (!username) errors.username = 'username is requierd';
    setError(errors);
    return Object.keys(errors).length === 0;
  }

  const loginAfterRegister = async () =>{
    const url = 'http://10.0.2.2:8000/auth/login'
    const payload = {
      email: email,
      password: password,
    };
    try{
      const response = await sendRequest(url, payload);
      console.log(response);
      setPassword("");
      router.push('./(tabs)/Functions' );
    }catch(error){
      console.log(error);
    }
  }

  const sendRegisterRequest = async () => {
    const url = 'http://10.0.2.2:8000/auth/register'
    const payload = {
      email: email,
      username: username,
      password: password,
    };
    try{
      const response = await sendRequest(url, payload);
      console.log(response);
      loginAfterRegister()
    }catch(error){
      console.log(error);
    }
  }
  const handleSubmit = () =>{
    if(validateForm()){
      console.log("Submitted", email, password);
      setEmail("");
      setPassword("");
      setError({});
      sendRegisterRequest();
    }
  }

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

            <Text >Username</Text>
            {
              errors.email ? (<Text style={styles.errorText}>{errors.email}</Text>) : null
            }
            <TextInput style={styles.input} 
            placeholder="Enter your username" 
            value={username} 
            onChangeText={setUsername}/> 

            <Text>Password</Text>
            {
              errors.password ? (<Text style={styles.errorText}>{errors.password}</Text>) : null
            }
            <TextInput style={styles.input} 
            placeholder="Enter your password"
            secureTextEntry 
            value={password} 
            onChangeText={setPassword}/>
            <Button title="Register" onPress={handleSubmit}></Button>
            
        </SafeAreaView>
      </KeyboardAvoidingView>
    )  
}
export default RegisterPage;

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