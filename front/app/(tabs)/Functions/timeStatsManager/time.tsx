export function formatDate(date:Date) {
    let day = String(date.getDate()).padStart(2, '0'); // Dzień z zerem na początku
    let month = String(date.getMonth() + 1).padStart(2, '0'); // Miesiąc z zerem na początku
    let year = date.getFullYear(); // Rok
    return `${day}/${month}/${year}`;
  }
export function formatDateCalendar(date:Date){
  let day = String(date.getDate()).padStart(2, '0'); // Dzień z zerem na początku
  let month = String(date.getMonth() + 1).padStart(2, '0'); // Miesiąc z zerem na początku
  let year = date.getFullYear(); // Rok
  return `${year}-${month}-${day}`;
}
  export function currentDay(){
    return new Date();
  }
  
  export function currentWeekStart(){
    let now = new Date();
    let startOfWeek = new Date(now.setDate(now.getDate() - now.getDay())) ;
    return startOfWeek;
  }
  export function currentWeekEnd(){
    let now = new Date();
    let startOfWeek = new Date(now.setDate(now.getDate() - now.getDay())) ;
    let endOfWeek = new Date(now.setDate(startOfWeek.getDate() + 6));
    return endOfWeek;
  }
  export function currentYearEnd(){
    const now = new Date(); // Pobierz bieżącą datę
    const endOfYear = new Date(now.getFullYear(), 11, 31); // Ustaw datę na 31 grudnia bieżącego roku
    return endOfYear;
  }
  export function currentYearStart(){
    const now = new Date(); // Pobierz bieżącą datę
    const startOfYear = new Date(now.getFullYear(), 0, 1); // Ustaw datę na 1 stycznia bieżącego roku
    return startOfYear;
  }
  export function fourYearsAgo(){
    const now = new Date(); // Pobierz bieżącą datę
    const startOfYear = new Date(now.getFullYear() - 4, 0, 1); // Ustaw datę na 1 stycznia bieżącego roku
    return startOfYear;
  }
  

    export const nextFourYears = (date:Date)=>{
      return new Date(date.setFullYear(date.getFullYear() + 4))
    }
    export const prevFourYears = (date:Date)=>{
      return new Date(date.setFullYear(date.getFullYear() - 4))
    }
    export const nextYear = (date:Date)=>{
      return new Date(date.setFullYear(date.getFullYear() + 1))
    }
    export const prevYear = (date:Date)=>{
      return new Date(date.setFullYear(date.getFullYear() - 1))
    }
    export const nextDay = (date: Date) => {
      return new Date(date.setDate(date.getDate() + 1))
    }
    export  const prevDay = (date: Date) => {
      return new Date(date.setDate(date.getDate() - 1))
    }
    export const nextWeek = (date: Date) => {
      return new Date(date.setDate(date.getDate() + 7))
    }
    export  const prevWeek = (date: Date) => {
      return new Date(date.setDate(date.getDate() - 7))
    }
    export const generateYears = (endDate: Date) =>{
      const Year = endDate.getFullYear() - 4;
      let years = [Year.toString()];
      for (let index = 1; index < 5; index++) {
        years.push((Year + index).toString())
      }
      console.log(years)
      return years;
    }