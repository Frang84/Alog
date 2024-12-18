import { Text, View, StyleSheet, StatusBar, SafeAreaView, TextInput, Button, KeyboardAvoidingView } from "react-native"
import { useState } from "react"
import {Link} from "expo-router"


const  LoginPage = () =>{
  const [email, setEmail] = useState("") 
  const [password, setPassword] = useState("") 
  const [errors, setError] = useState({})

  const validateForm = () =>{
    let errors = {};
    if (!email) errors.email = 'email is requierd';
    if (!password) errors.password = 'password is requierd';
    setError(errors);
    return Object.keys(errors).length === 0;
  }
  const handleSubmit = () =>{
    if(validateForm()){
      console.log("Submitted", email, password);
      setEmail("");
      setPassword("");
      setError({});
      
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