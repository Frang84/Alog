import { BarChart, LineChart, PieChart, PopulationPyramid, RadarChart } from "react-native-gifted-charts";
import { barDataItem } from "@/app/(tabs)/Functions/types";
import { View } from "react-native";



interface MyBarChartProps {
    data: barDataItem[];
}

export default function MyBarChart( {data} : MyBarChartProps){
    return(
        <View style={{paddingBottom: 30, paddingTop: 30}}>
        <BarChart 
        data={data}
        barBorderRadius={4}
        barWidth={22}
        spacing={40}
        yAxisThickness={0}
        xAxisThickness={0}
        isAnimated
        
        ></BarChart>
        </View>
    )
}