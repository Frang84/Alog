import { Text, View, StyleSheet,ScrollView } from "react-native"
import {Link} from "expo-router"
import { BarChart, LineChart, PieChart, PopulationPyramid, RadarChart } from "react-native-gifted-charts";


const  StatsPage = () =>{
  const data=[ {value:50, frontColor: "green"}, {value:80}, {value:90}, {value:70} ]
    return(
        <View style={styles.container}>
            <Text>
                index Page
                <BarChart data = {data} />
                <PieChart data = {data} />
            </Text>     
        </View>
    )
}
export default StatsPage;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f0f0f0',
  },
});