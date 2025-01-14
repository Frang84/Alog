import {Calendar} from 'react-native-calendars';
import {formatDateCalendar} from '@/app/(tabs)/Functions/timeStatsManager/time'

type myCalendarProps = {
    setDateFun: (date: string) => void,
    setVisibilityFun: (visibility: boolean) => void,
    visibility: boolean,
    minDate: string,
    
}

const MyCalendar = (props: myCalendarProps) => {
    return(
        <Calendar
            onDayPress = {(day: any) => {
                console.log('selected day: ', day);
                console.log(new Date(day['dateString']))
                props.setDateFun(day['dateString']);
                props.setVisibilityFun(props.visibility);
                
            }}
            minDate={ props.minDate }
            
            >
        
        </Calendar>
    )
}
export default MyCalendar;