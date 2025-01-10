import { View, Text, ScrollView, FlatList} from "react-native"
import { customeStyle, customStyleChellange } from "@/app/style"
import MyButton from '../../customComponents/myButton'
import {Link, router} from "expo-router"



const ChallangeScreen = () =>{
    const goToCreateChellange = () =>{
        
    }
    const dataList = [{type: 'alcohol limit', startDate: '1/1/2025', endDate: '7/1/2025', limit: 125, current: 75}];
    return(
        
            <View style={customStyleChellange.container}>
                <MyButton  onPressFun={() => router.navigate('/extraScreens/createChellange')} textToPrint='new chellange' />
                <FlatList
                data={dataList}
                renderItem={({item}) => {
                    console.log(item)
                    return(
                        <View style={customeStyle.noteOuter}>
                            <View style={customeStyle.note}>
                                <Text>type of challange: {item.type}</Text>
                                <Text>start date: {item.startDate}</Text>
                                <Text>end date: {item.endDate}</Text>
                                <Text>limit: {item.limit} ml</Text>
                                <Text>current consumption: {item.current} ml</Text>
                                <Text>progress bar: {item.current/item.limit} %</Text>
                            </View>
                        </View>
                    );
                }}
            >    
            </FlatList>
            </View>

        
            

            
        
    )
}

export default ChallangeScreen;