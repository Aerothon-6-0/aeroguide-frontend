interface Flight {
    Time: string;
    FlightNum: string;
    Source: string;
    Destination: string;
    startTime:string;
    endTime:string;
  }
  
  const Data: Flight[] = [
    {
      "Time": "2024-05-25T01:30:00+00:00",
      "FlightNum": "9070",
      "startTime": "2024-05-25T01:30:00+00:00",
      "endTime": "2024-05-25T02:30:00+00:00",
      "Source": "Taiyuan",
      "Destination": "Hohhot"
  },
  {
      "Time": "2024-05-25T01:10:00+00:00",
      "FlightNum": "9069",
      "startTime": "2024-05-25T01:10:00+00:00",
      "endTime": "2024-05-25T03:05:00+00:00",
      "Source": "Taiyuan",
      "Destination": "Nanjing Lukou International Airport"
  },
  {
      "Time": "2024-05-25T02:00:00+00:00",
      "FlightNum": "213",
      "startTime": "2024-05-25T02:00:00+00:00",
      "endTime": "2024-05-25T05:30:00+00:00",
      "Source": "Yiwu",
      "Destination": "Ninoy Aquino International"
  },
  {
      "Time": "2024-05-25T01:15:00+00:00",
      "FlightNum": "358",
      "startTime": "2024-05-25T01:15:00+00:00",
      "endTime": "2024-05-25T05:45:00+00:00",
      "Source": "Guangzhou Baiyun International",
      "Destination": "Seoul (Incheon)"
  },
  {
      "Time": "2024-05-25T01:10:00+00:00",
      "FlightNum": "9635",
      "startTime": "2024-05-25T01:10:00+00:00",
      "endTime": "2024-05-25T03:15:00+00:00",
      "Source": "Guangzhou Baiyun International",
      "Destination": "Hangzhou"
  },
  {
      "Time": "2024-05-25T00:50:00+00:00",
      "FlightNum": "1034",
      "startTime": "2024-05-25T00:50:00+00:00",
      "endTime": "2024-05-25T02:55:00+00:00",
      "Source": "Nanjing Lukou International Airport",
      "Destination": "Guangzhou Baiyun International"
  },
  {
      "Time": "2024-05-25T00:30:00+00:00",
      "FlightNum": "495",
      "startTime": "2024-05-25T00:30:00+00:00",
      "endTime": "2024-05-25T06:20:00+00:00",
      "Source": "Shanghai Pudong International",
      "Destination": "Schiphol"
  },
  {
      "Time": "2024-05-25T02:40:00+00:00",
      "FlightNum": "899",
      "startTime": "2024-05-25T02:40:00+00:00",
      "endTime": "2024-05-25T05:00:00+00:00",
      "Source": "Haneda Airport",
      "Destination": "Shanghai Pudong International"
  },
  {
      "Time": "2024-05-25T02:20:00+00:00",
      "FlightNum": "629",
      "startTime": "2024-05-25T02:20:00+00:00",
      "endTime": "2024-05-25T06:00:00+00:00",
      "Source": "Haneda Airport",
      "Destination": "Hong Kong International"
  },
  ];
  
  export default Data;