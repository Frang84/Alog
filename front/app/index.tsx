import { Text, View, StyleSheet, StatusBar, SafeAreaView, TextInput, Button, KeyboardAvoidingView } from "react-native"
import { useState } from "react"
import {Link, router} from "expo-router"


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
        console.log("Sukces", `Zalogowano użytkownika:`,data);
        setPassword("");
        router.push('./(tabs)/Functions' );
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
      // 
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