export const processTotalAlcoholStats = (data: {period: string, totalAlcohol: number, totalPrice: number}[], timeStamps: string[], opt:string) => {
    let barData = timeStamps.map((label) => ({
      label: label,
      frontColor: '#27b376',
      value: 0,
    }));
    
    data.forEach((item) => {
      let idx = 0;
      if (opt === 'd'){
        idx = parseInt(item.period);
      }
      else if(opt === 'w'){
      idx = new Date(item.period).getDay();  
      if(25.35 < item.totalAlcohol){
        barData[idx].frontColor = '#bf212f';
      }  
      }
      else if(opt === 'm'){
        idx = parseInt(item.period) - 1 //dostajemy miesiace ponumerowane od 1 a indeksy w tablicy zaczynaja sie od 0. 
      }
      else if(opt === 'y'){
        idx = parseInt(item.period) - parseInt(timeStamps[0]);
      }
      
      barData[idx].value = item.totalAlcohol;
    })
    console.log('barData: ', barData)
    return barData;
  }

  export const processTotalPriceStats = (data: {period: string, totalAlcohol: number, totalPrice: number}[], timeStamps: string[], opt:string) => {
    let barData = timeStamps.map((label) => ({
      label: label,
      frontColor: '#006f3c',
      value: 0,
    }));
    
    data.forEach((item) => {
      let idx = 0;
      if (opt === 'd'){
        idx = parseInt(item.period);
      }
      if(opt == 'w'){
        idx = new Date(item.period ).getDay();

      }
      else if(opt == 'm'){
        idx = parseInt(item.period) - 1;
      }
      else if(opt === 'y'){
        idx = parseInt(item.period) - parseInt(timeStamps[0]);
      }
      barData[idx].value = item.totalPrice;
    })
    
    return barData;
  }
    


  export const processPreferAlcoholStats = (data: {alcoholType: string, volume: number}[]) =>{
    const alcoholTypes: string[] = ['Vodka', 'Bear', 'Wine', 'Whiskey', 'Rum', 'Tequila', 'Gin', 'Brandy', 'Liqueur', 'Cider', 'Other'];
    let barData = alcoholTypes.map((label) => ({
      label: label,
      frontColor: '#006f3c',
      value: 0,
    })); 
    data.forEach((item) => {
      const type = item.alcoholType;
      const index = barData.findIndex((item) => item.label === type);
      barData[index].value = item.volume;
    });
    return barData;
  }

  export const processPreferEventStats = (data: {eventType: string, volume: number}[]) =>{
    const events: string[] = ['Party', 'Wedding', 'Birthday', 'Meeting with friend','Work meeting', 'Date', 'Alone', 'Other'];
    let barData = events.map((label) => ({
      label: label,
      frontColor: '#006f3c',
      value: 0,
    })); 
    data.forEach((item) => {
      const type = item.eventType;
      const index = barData.findIndex((item) => item.label === type);
      barData[index].value = item.volume;
    });
    return barData;
  }
  export const processPreferTimeStats = (data: {time: string, volume: number}[]) =>{
    const times: string[] = ['00', '01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11','12','13','14','15','16','17','18','19','20','21','22','23'];
    let barData = times.map((label) => ({
      label: label,
      frontColor: '#006f3c',
      value: 0,
    })); 
    data.forEach((item) => {
      const type = item.time;
      const index = barData.findIndex((item) => item.label === type);
      barData[index].value = item.volume;
    });
    return barData;
  }

  export const proccessHangovers = (data: {hangoverType: string, count: number}[]) => {
    const types: string[] = ['indigestion', 'restless night	', 'bad mood', 'restless night']
    let barData = types.map((label) => ({
      label: label,
      frontColor: '#006f3c',
      value: 0
    }))
    data.forEach((item) => {
      const type = item.hangoverType;
      const index = barData.findIndex((item) => item.label === type);
      barData[index].value = item.count
    })
    return barData;
  }