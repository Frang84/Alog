import{
    StyleSheet,
    Touchable
  } from 'react-native';


export const customeStyle = StyleSheet.create({
    touchableOpacity: {
        padding: 10
    },
    button: {
        color: "#27b376",
        borderRadius: 4,
        backgroundColor: '#27b376',
        textAlign: 'center',
    },
    textButton:{
        fontSize: 18,
        textAlign: 'center',
        color: '#fff',
        textTransform: 'uppercase',
        
    },
    container: {
        flex: 1,
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
})