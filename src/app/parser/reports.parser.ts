import * as _ from 'lodash';
import * as moment from 'moment';

const haltEventName = 'Total Halt (in minutes)';
const stopEventName = 'Total Stop (in minutes)';
const utilizationEventName = 'Total Utilization (in minutes)';
const odoClosing = 'ODO Closing';
const periodOdo = 'Period ODO';

export function DIReportsParser(dataitems, assetMap) {
    let result = [];
    const offset = new Date().getTimezoneOffset();
    // TODO: Change this once the bug is fixed on sever
    const data = dataitems.result || dataitems;
    _.forEach(data, (val, key) => {
        if (typeof val === 'object') {
            _.forEach(val, (item, key) => {
            	const value = [];
                if (item && item.data) {
                    const dataPool = item.data.asset || item.data.platform;
                    if (dataPool) {
                        const dataKey = dataPool.columns;
                        const dataValues = dataPool.values;
                        if (dataKey && dataValues) {
                            _.forEach(dataValues, (o) => {
                                const temp = {};
                                temp['guid'] = key;
                                temp['name'] = assetMap[key];
                                const zipObj = _.zipObject(dataKey, o);
                                const tempResult = _.assign(temp, zipObj);
                                result.push(tempResult);
                            });
                        }
                    }
                }
                // result.push({key, value});
            });
        }
    });
    return result;
}

export function TotalODOParser(dataitems) {
    let result = [];
    console.log("dataitems", dataitems);
    // TODO: Change this once the bug is fixed on sever
    const data = dataitems.result || dataitems;
    _.forEach(data, (val, key) => {
        if (typeof val === 'object') {
            _.forEach(val, (item, key) => {
                const value = [];
                if (item && item.data) {
                    const dataPool = item.data.asset || item.data.platform;
                    if (dataPool) {
                        const dataKey = dataPool.columns;
                        const dataValues = dataPool.values;
                        if (dataKey && dataValues) {
                            _.forEach(dataValues, (o) => {
                                const temp = {};
                                temp['guid'] = key;
                                const zipObj = _.zipObject(dataKey, o);
                                const tempResult = _.assign(temp, zipObj);
                                result.push(tempResult);
                            });
                        }
                    }
                }
                // result.push({key, value});
            });
        }
    });
    // const data = filterODOdata(result);
     //console.log(' result in odo',result);
    const odoReportData = filterODOdata(result);
    console.log('odoReportData:-', odoReportData);
    return odoReportData;
}

function filterODOdata(data) {
    console.log('data is:--------- filetre odo', data);
    const result = [];
    const report1 = {};
    const report2 = {};
    let odoData1, actualData = [];
    let datata;
    _.forEach(data, (item) => {
        //console.log('item time is',item.time);
       // item.time  = moment.utc(item.time, 'YYYY-MM-DD HH:mm:ss').format('DD-MM-YYYY HH:mm:ss');

        item['date'] = moment.utc(item.time, 'YYYY-MM-DD HH:mm:ss').format('DD-MM-YYYY');
    })
    
    const odoDateData = _.groupBy(data, (o: any) => {
       return o.date;
    });
    console.log('odoDateData', odoDateData);
    const odoData = _.groupBy(data, (o: any) => {
       return o.guid;
    });

    _.forEach(odoData, (data) => {
      odoData1  = _.groupBy(data, (o: any) => {
            return o.date;
        });
      if(odoData1 !== undefined) {
          actualData.push(odoData1);
      }
    })
 console.log('odoguidData', actualData);
 if(actualData !== undefined && actualData.length > 0) {
     _.forEach(actualData, (data) => {
         _.forEach(data, (o: any) => {
             const l = o.length;
        //console.log(l,'l value');
                if(l) {
                    const temp = o[0];
                    const last = o[l-1];
                    const odoPerDay = temp['Total_ODO'] - last['Total_ODO'];
                    report1[temp.guid + '__' + temp.date] = {name: 'ODO Closing', value: temp['Total_ODO']};
                    report2[temp.guid + '__' + temp.date] = {name: 'Period ODO', value: odoPerDay};
                };
         })

     })
 }
     console.log('filterODOdata report1:-', report1, 'report2:-', report2);
  return [report1, report2];
    /*console.log('odoguidData', odoDateData);
    _.forEach(odoDateData, (data: any) => {

    });*/
    /*_.forEach(odoDateData, (o: any) => {
        const l = o.length;
        //console.log(l,'l value');
        if(l) {
            const temp = o[0];
            const last = o[l-1];
            const odoPerDay = temp['Total_ODO'] - last['Total_ODO'];
            report1[temp.guid + '__' + temp.date] = {name: 'ODO Closing', value: temp['Total_ODO']};
            report2[temp.guid + '__' + temp.date] = {name: 'Period ODO', value: odoPerDay};
        };

    })
    console.log('filterODOdata report1:-', report1, 'report2:-', report2);
    return [report1, report2];*/
}

export function EventReportsParser(events, assetMap) {
    const result = [];
    const data = events.result || events;
    _.forEach(data, (val, key) => {
        if (typeof val === 'object') {
            _.forEach(val, (item, key) => {
                const value = [];
                const eventPool = item.events;
                    if (eventPool) {
                        const eventKey = eventPool.columns;
                        const eventValues = eventPool.values;
                        if (eventKey && eventValues) {
                            _.forEach(eventValues, (o) => {
                                const temp = {};
                                temp['guid'] = key;
                                temp['name'] = assetMap[key];
                                const zipObj = _.zipObject(eventKey, o);
                                const tempResult = _.assign(temp, zipObj);
                                result.push(tempResult);
                            });
                        }
                    }
                    // result.push({key, value});
            });
        }
    });
    return result;
}

export function InsightReportsParser(events) {
    console.log('data from insight',events);
    const result = [];
    const data = events.result || events;
    _.forEach(data, (val, key) => {
        if (typeof val === 'object') {
            _.forEach(val, (item, key) => {
                const tempValue = [];
                const eventPool = item.events;
                    if (eventPool) {
                        const eventKey = eventPool.columns;
                        const eventValues = eventPool.values;
                        if (eventKey && eventValues) {
                            _.forEach(eventValues, (o) => {
                                // value.push(_.zipObject(eventKey, o));
                                const temp : any = _.zipObject(eventKey, o);
                                temp.time = moment.utc(temp.time, 'YYYY-MM-DD HH:mm:ss').format('DD-MM-YYYY');
                                tempValue.push(temp);
                            });
                        }
                    }
                    const value = __mapEventToTime(tempValue);
                    result.push({key, value});
            });
        }
    });
    console.log('InsightReportsParser:-', result);
    return result;
}


export function HaltReportsParser(events) {
    console.log('halt report parser', __moreReprotParser(events, haltEventName));
     return __moreReprotParser(events, haltEventName);
}

export function StopReportsParser(events) {
    console.log('stop report parser', __moreReprotParser(events, stopEventName));
    return __moreReprotParser(events, stopEventName);
}

export function UtilizationReportsParser(events) {
    return __moreReprotParser(events, utilizationEventName);
}

const __moreReprotParser = function(events, name) {
    const result = {};
    const data = events.result || events;
    _.forEach(data, (val, key) => {
        if (typeof val === 'object') {
            _.forEach(val, (item, key) => {
                if( item ) {
                    const temp: any = {};
                    _.forEach(item, (value, p:any) => {
                        const time = moment.unix(p/1000).format('DD-MM-YYYY');
                        result[key+ '__' +time] = {name, value}
                    });
                }
            });
        }
    });
    return result;
}
const __mapEventToTime = function (result) {
    const dummyrow = {
        assetName: 'no data',
        time: 'no data',
        OverSpeed: 0,
        LowInternalbattery: 0,
        DeviceRemovalFromVehicle: 0,
        LowVehicleBattery: 0,
        HighCoolantTemperature: 0,
        LowOilPressure: 0,
        DeviceConnectedToVehicle: 0,
        guid: 'no data'
    };

    dummyrow[haltEventName] = 0;
    dummyrow[stopEventName] = 0;
    dummyrow[utilizationEventName] = 0;
    dummyrow[odoClosing] = 0;
    dummyrow[periodOdo] = 0;

    const keyArray = _.keys(dummyrow);
    const dataResult = _.groupBy(result, (o: any) => { return o.time});
    console.log('dataresult',dataResult);
    const reportData = [];
    _.forEach(dataResult, (o, key) => {
        var temp = {};
        // temp['time'] = key;
        const first = o[Object.keys(o)[0]];

        _.forEach(first, (val, key) => {
           temp[key] = val;
        });
        const combineTemp = _.assign(dummyrow, temp);
        const tempResult = _.pick(dummyrow, keyArray);
        console.log('tempres from parse',tempResult);
        reportData.push(tempResult);
    });
    return reportData;
    /*const dummyrow = {
        assetName: 'no data',
        time: 'no data',
        OverSpeed: 0,
        LowInternalbattery: 0,
        DeviceRemovalFromVehicle: 0,
        LowVehicleBattery: 0,
        HighCoolantTemperature: 0,
        LowOilPressure: 0,
        DeviceConnectedToVehicle: 0,
        guid: 'no data'
    };

    dummyrow[haltEventName] = 0;
    dummyrow[stopEventName] = 0;
    dummyrow[utilizationEventName] = 0;
    dummyrow[odoClosing] = 0;
    dummyrow[periodOdo] = 0;
    const keyArray = _.keys(dummyrow);
    const dataResult = _.groupBy(result, (o: any) => { return o.time});
    const reportData = [];
    _.forEach(dataResult, (o, key) => {
        var temp = {};
        temp['time'] = key;
        _.forEach(o, (e) => {
           temp[e.name] = e.COUNT;
        });
        const combineTemp = _.assign(dummyrow, temp);
        const tempResult = _.pick(combineTemp, keyArray);
        reportData.push(tempResult);
    });
    return reportData;*/
}
const __getEventDetails = function (t) {
    const desc = t.description.split('|');
    _.forEach(desc, (o) => {
         const arr = o.split(':');
         if(arr[0] !== 'name') {
             if( arr[0] === 'Last_Updated_Timestamp') {
                 t['Last_Updated_Timestamp'] = moment
                     .unix(arr[1]/1000)
                     .format('DD-MM-YYYY HH:mm:ss');
             } else {
                 t[arr[0]] = arr[1];
             }
         }
    });
    delete(t.description);
    return t;
}
export function InsightReportsParser1(events) {
  const result = [];
  const response = events.result.result;
    const first = response[Object.keys(response)[0]];
    console.log('first from insight',first);
    _.forEach(first, (val, key) => {
        const value1 = [];
        console.log('key from insight',key);
        const dataPool = val.data.asset || val.data.platform;
        if (dataPool) {
            const dataKey = dataPool.columns;
            const values = dataPool.values;
            if (dataKey && values) {
            _.forEach(values, (o) => {
            // value.push(_.zipObject(eventKey, o));
            const temp : any = _.zipObject(dataKey, o);
            temp.time = moment.utc(temp.time, 'YYYY-MM-DD HH:mm:ss').format('DD-MM-YYYY');
            value1.push(temp);
            });
            const value = __mapEventToTime(value1);
                result.push({key, value});
                console.log('data and val',dataKey , values);
                console.log('tempval', result);
            }
        }
    });
    console.log('final insight report from parser', result);
    return result;
}