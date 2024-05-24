// FlightData.d.ts
// @ts-ignore
declare module './Data.ts' {
  interface Flight {
    Time: string;
    FlightNum: string;
    Source: string;
    Destination: string;
    startTime:string;
    endTime:string
  }

  const Data: Flight[];

  export default Data;
}