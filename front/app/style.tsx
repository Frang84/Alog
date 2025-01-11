import{
    StyleSheet,
    Touchable
  } from 'react-native';


export const customStyleTabBar = StyleSheet.create({
  tabBarText:{ 
    color: "gray",
    textDecorationColor: "#27b376",
    
  },
  tabsStyle: {
    backgroundColor: '#fff',
    
  }
})

export const customStyleChellange = StyleSheet.create({
  container: {
    flex: 1,
    padding:10,
    //backgroundColor: 'white',
    
  },
  nextToEachother: {
    flexDirection: 'row', // Ustawia elementy w jednym rzędzie
    //justifyContent: 'space-between', // Przestrzeń między elementami
    alignItems: 'center', // Wyrównanie względem osi Y
    padding: 10,
  },
  button: {
    flex: 1, // Przydziela równą szerokość obu przyciskom (opcjonalne)
    padding: 10,
    marginHorizontal: 5, // Odstępy między przyciskami
    borderRadius: 5,
},
input:{
  height: 40,
  width: 160,
  margin: 12,
  padding: 10,
  borderWidth: 1,
  borderColor: "#27b376",
  borderRadius: 4,
},

})

export const customeStyle = StyleSheet.create({

  note:{
    
    borderColor: '#27b376',
    borderWidth: 1,
    borderRadius: 4,
    backgroundColor:'white',
    shadowColor:'black',
    
  },
  shadowProp: {
    shadowColor: '#171717',
    shadowOffset: {width: -2, height: 4},
    shadowOpacity: 0.2,
    shadowRadius: 3,
  },

  noteOuter:{
    padding: 5,
  },

  touchableOpacity: {
    padding: 10
  },



  TouchableOpacityTwo: {
    paddingTop: 10,
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
    calendarButton:{
      fontSize: 40,
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
      delete:{
        backgroundColor: '	#bf212f',
        color:'	#bf212f',
        width:40,
        height:40
      }
})