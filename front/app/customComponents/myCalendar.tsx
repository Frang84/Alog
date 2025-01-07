import {Calendar} from 'react-native-calendars';
import {formatDateCalendar} from '@/app/(tabs)/Functions/timeStatsManager/time'

type myCalendarProps = {
    setDateFun: (date: string) => void,
    setVisibilityFun: (visibility: boolean) => void,
    visibility: boolean,
    
}

const MyCalendar = (props: myCalendarProps) => {
    return(
        <Calendar
        onDayPress = {(day: any) => {
            console.log('selected day: ', day);
            console.log(new Date(day['dateString']))
            props.setDateFun(day['dateString']);
            props.setVisibilityFun(props.visibility);
            //console.log(props.visibility)
        }}
        minDate={ formatDateCalendar(new Date()) }>
    </Calendar>
    )
}
export default MyCalendar;