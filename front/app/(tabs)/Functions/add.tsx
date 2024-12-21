import { Text, View, StyleSheet } from "react-native"
import {Link} from "expo-router"

const  AddPage = () =>{
    return(
        <View style={styles.container}>
            <Text>
                Add Page
            </Text>
           
            
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
});