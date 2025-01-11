 
export interface barDataItem{
  value: number;
  label?: string;
}

export interface challangeItem{
  challangeType: string;
  startDate: Date;
  endDate: Date;
  overallAlc: number;
  limit: number;
}

export interface hangoverItem{
  id: number;
  hangoverType: string;
  date: string;
}