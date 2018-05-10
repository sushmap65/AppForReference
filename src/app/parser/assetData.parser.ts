import * as _ from 'lodash';
import * as moment from 'moment';
import { abnormalAlerts, EventValues,mapIcons } from '../constant'

interface LabelTemp {
  time: string;
  name: string;
  COUNT: number;
}

export function AssetStatusDIParse(dataitems) {
    const result = [];
    const first = dataitems[Object.keys(dataitems)[0]];
    _.forEach(first, (val, key) => {
        const dataPool = val.data.asset || val.data.platform;
        if (dataPool) {
            const dataKey = dataPool.columns;
            const values = dataPool.values;
            if (dataKey && values) {
                const ln = dataKey.length;
                const multiTimeObj = _.countBy(dataKey);
                if ( multiTimeObj['time'] === ln / 2 ) {
                    _.forEach(values, (items) => {
                        for ( let i = 0; i < ln; i++ ) {
                            if (items[i + 1] !== null) {
                                let date = items[i];
                                date = new Date(date);
                                result.push({
                                    name: dataKey[i + 1],
                                    time: date,
                                    val: items[i + 1]
                                });
                                i++;
                            }
                        }
                    });
                }
            }
        }
    });
    return result;
}

export function AssetStatusEventParser(dataitems) {
    const result = [];
    let typeArray;
    let typeDiArray;
    const first = dataitems[Object.keys(dataitems)[0]];
    _.forEach(first, (val, key) => {
        const eventPool = val.events;
        typeArray = val.types.events;
        typeDiArray = val.types.dis;
        if (eventPool) {
            const columns = eventPool.columns;
            _.forEach(eventPool.values, (items) => {
                const temp = _.zipObject(columns, items);
                result.push(temp);
            });
        }
    });
    _.forEach(result, (val, key) => {
       val.time = new Date(val.time);
       val.name = val.name;
    });
    return {
        result,
        typeArray,
        typeDiArray
    };
}

export function AssetEventCountParse(dataitems) {
    const result = [];
    const first = dataitems[Object.keys(dataitems)[0]];
    _.forEach(first, (val, key) => {
        const eventPool = val.events;
        if (eventPool && eventPool.values && eventPool.values.length > 0) {
            const columns = eventPool.columns;
            let temp = {name: '', COUNT: 0, time: new Date()};
            _.forEach(eventPool.values, (items) => {
                temp = _.zipObject(columns, items);
                const tempArray = [temp.name, temp.COUNT, temp.time];
                result.push(tempArray);
            });
        }
    });
    return result;
}
export function MapDiParser(dataitems,dataevents,name) {
    let lngObj;
    let latObj;
    let assetsMapData;
    let mapsLists = [];
    let centers: any;
    let time1;
    let time2;
    let ignition;
    let activeEvents;
    let ignitionStatus;
    let lastUpdatedStatus;
    let activeItems;
    if ( dataevents ) {
          activeEvents = dataevents.result;
          _.forEach(activeEvents, (o) => {
                          if (o.name === 'IgnitionON') {
                             time1 = o.time;
                          }
                      });
                      _.forEach(activeEvents, (o) => {
                          if (o.name === 'IgnitionOFF') {
                             time2 = o.time;
                          }
                      });
                      if(time1 && time2) {
                        ignitionStatus = moment(time1).isAfter(time2);
                        if(ignitionStatus) {
                          ignition = "ON";
                          lastUpdatedStatus = time1;
                        } else {
                          ignition = "OFF";
                          lastUpdatedStatus = time2;
                        }
                      } else if(time1) {
                          ignition = "ON";
                          lastUpdatedStatus = time1;
                      } else if(time2) {
                          ignition = "OFF";
                          lastUpdatedStatus = time2;
                      } else {
                        ;
                      }
    }
   if ( dataitems ) {
      lngObj = _.find(dataitems, (o) => {
          return o.name === 'Longitude';
      });
      latObj = _.find(dataitems, (o) => {
          return o.name === 'Latitude';
      });
    }
  let point;
  if ( latObj && lngObj ) {
      point = {
          lat: latObj.val,
          lng: lngObj.val,
          zoom: 3,
          radius: 100,
          color: 'red',
          IMEI: name,
          IgnitionStatus: ignition,
          LastUpdatedStatus: lastUpdatedStatus,
          iconUrl:mapIcons.locationIcon   
      };
  } else {
      point = {};
  }
return point;
}

export function AlertDiParser(dataitems, name) {
    const temp={};
    temp['State'] = name;
    let total=0;
    const alertList = [
            'OilPressure',
            'EngineCoolentTemperature',
            'ExternalBatteryVoltage',
            'InternalBatteryCharge'
       ];
    _.forEach(dataitems, (o) => {
       if(alertList.indexOf(o.name) !== -1) {
            total += o.val;
            temp[o.name] = o.val;
       }
    });
    temp['total'] = total;

  return temp;
}

export function AssetAlertCountParse(dataitems) {
    const categoryMap = [{
                    id: 103,
                    type: 'Health'
                  }]
                  // {
                  //   id: 101,
                  //   type: 'Utilization'
                  // }];
    const result = [];
    const mainResult = [];
    const first = dataitems[Object.keys(dataitems)[0]];
    _.forEach(first, (val, key) => {
        const eventTypes = val.types.events;
        const eventTypeArray = {};
        _.forEach(categoryMap, (o) => {
            const tempResult = [];
            _.forEach(eventTypes, (p) => {
                 if (p.category === o.id) {
                     tempResult.push(p.name);
                 }
             });
            eventTypeArray[o.type] = tempResult;
        });

        const dataPool = val.events;
        if (dataPool) {
            const dataKey = dataPool.columns;
            const values = dataPool.values;
            if (dataKey && values) {
                let temp = {};
                _.forEach(values, (items) => {
                    temp = _.zipObject(dataKey, items);
                    result.push(temp);
                });
            }
        }
        _.forEach(eventTypeArray, (o: any, key) => {
            let count = 0;
            _.forEach(result, (p) => {
                if (o.indexOf(p.name) !== -1) {
                    count += p.COUNT;
                }
            });
            if (count > 0) {
                mainResult.push([key, count]);
            }
        });
    });
    return mainResult;
}
export function AlerthealthParser(dataitems) {
    const temp = [];
    const alertList = [
            'OilPressure',
            'EngineCoolentTemperature',
            'ExternalBatteryVoltage',
            'InternalBatteryCharge'
       ];
    _.forEach(dataitems, (o) => {
       if(alertList.indexOf(o.name) !== -1) {
          const tempArray = [o.name, o.val, o.time];
                temp.push(tempArray);
       }
    });
 return temp;
}

export function ActiveAlertCountParse(dataitems) {
    const categoryKeys = {
        'Safety': 100,
        'Battery': 101,
        'Security': 102,
        'Health': 103
    };
    const result = [];
    let categoryMapList = {};
    let eventCol, eventVal;
    let categoryData;
    let initialresult = [];
    const first = dataitems[Object.keys(dataitems)[0]];
    let assetIds = Object.keys(first);
    let category = first[Object.keys(first)[0]].types;
    _.forEach(category.events, (list) => {
      if(list.category && (list.category > 99 && list.category < 104)) {
        categoryMapList[list.name] = list.category;
      }
    });
    let i = 0;
    _.forEach(first, (val, key) => {
      initialresult = [];
        const eventPool = val.events;
        if (eventPool && eventPool.values && eventPool.values.length > 0) {
          const columns = eventPool.columns;
          let temp = {name: '', COUNT: 0};
            _.forEach(eventPool.values, (items) => {
                temp = _.zipObject(columns, items);
                const tempArray = [temp.name, temp.COUNT];
                tempArray.push(assetIds[i]);
                initialresult.push(tempArray);
            });
        }
        result.push(initialresult);
        i++;
    });

    const finalData = getAlertByCategory(categoryMapList, result);
     return finalData;
}

 const getAlertByCategory = function(list, data) {
  const categoryKeys = {
        'Safety': 100,
        'Battery': 101,
        'Security': 102,
        'Health': 103
    };
  let finalData = [];
  const resultData = [];
    let alertNames = Object.keys(list);
    _.forEach(data, (items) => {
      let alertData = [];
      _.forEach(items, (i) => {
        if(i.length > 0 && i.length < 4) {
          if(alertNames.indexOf(i[0]) !== -1) {
              alertData.push({
                name: i[0],
                value: i[1],
                assetid: i[2],
                category: list[i[0]]
              });
          }
        }  
      });
      finalData.push(alertData);
    });
    if(finalData !== undefined && finalData.length > 0) {
      _.forEach(finalData, (data) => {
        let temp = {
                      State: '',
                      Safety: 0,
                      Battery: 0,
                      Security: 0,
                      Health: 0,
                      total: 0
                    };
          _.forEach(data, (alerts) => {
            if(alerts.category !== undefined && alerts.category === 100) {
               temp.Safety = temp.Safety+alerts.value;
            }
            if(alerts.category !== undefined && alerts.category === 101) {
              temp.Battery = temp.Battery+alerts.value;
            }
            if(alerts.category !== undefined && alerts.category === 102) {
              temp.Security = temp.Security+alerts.value;
            }
            if(alerts.category !== undefined && alerts.category === 103) {
              temp.Health = temp.Health+alerts.value;
            }
            if(alerts.assetid !== undefined) {
              temp.State = alerts.assetid;
            }
            temp.total = temp.Safety+temp.Battery+temp.Security+temp.Health;
            
          });
          if(temp.total !== 0) {
            resultData.push(temp);
          } else {
            ;
          }
          
      });
    }
    return resultData;
}

export function RouteReplayLocationParse(dataitems) {
    const result = [];
    const first = dataitems[Object.keys(dataitems)[0]];
    _.forEach(first, (val, key) => {
        const dataPool = val.data.asset;
        if (dataPool) {
            const dataKey = dataPool.columns;
            const values = dataPool.values;
            if (dataKey && values) {
                const ln = dataKey.length;
                 _.forEach(values, (items, key) => {
                   let tempObj = {
                     time : 0,
                     lat : 0,
                     lng : 0,
                     op : 0,
                     ct : 0,
                     eb: 0,
                     speed: 0
                   };
                   for ( let i = 0; i < ln; i++ ) {
                     if( dataKey[i] === 'time' )
                       tempObj.time = items[i];
                     if( dataKey[i] === 'Latitude' )
                       tempObj.lat = items[i];
                     if( dataKey[i] === 'Longitude' )
                       tempObj.lng = items[i];
                     if( dataKey[i] === 'OilPressure' )
                       tempObj.op = items[i];
                     if( dataKey[i] === 'EngineCoolentTemperature' )
                       tempObj.ct = items[i];
                     if( dataKey[i] === 'ExternalBatteryVoltage') 
                       tempObj.eb = items[i];
                     if( dataKey[i] === 'VehicleSpeedCAN')
                       tempObj.speed = items[i];
                   }
                   result.push(tempObj);
                 });
               }
             }
           });
    return result;
  }

export function RouteReplayEventsParse(dataitems) {
  const result = [];
  let finalResult;
  const first = dataitems[Object.keys(dataitems)[0]];
  _.forEach(first, (val, key) => {
    const dataPool = val.events;
    if (dataPool) {
      const dataKey = dataPool.columns;
      const values = dataPool.values;
      if (dataKey && values) {
        const ln = dataKey.length;
        _.forEach(values, (items) => {
          let temp = {
            name : "",
            time : 0,
            lat : 0,
            lng : 0,
            value: 0
          }
          for ( let i = 0; i < ln; i++ ) {
            if( dataKey[i] === "time") {
              temp.time = items[i];
            }
            if( dataKey[i] === "name") {
              temp.name = items[i];
            }
            //Its not generic ,requires some modification
            if( dataKey[i] === "description") {
              let parse = items[i].split('|');
              if(parse !== undefined && parse.length > 1) {
                let lat = parse[5].split('+');
                let lng = parse[6].split('+');
                temp.lat = Number(lat[1]);
                temp.lng = Number(lng[1]);

              }              
            }
           if( dataKey[i] === "description") {
               let descriptionData = items[i].split('|');
               let EventKeys = Object.keys(EventValues);
               let eventValue = 0;
               _.forEach(EventKeys , (keys) => {
                 if(keys === temp.name) {
                   _.forEach(descriptionData ,(events) => {
                       if(events.indexOf(EventValues[keys]) !== -1) {
                           let arr = events.split(':');
                           if(arr && arr.length > 1 ) {
                             eventValue = arr[1];
                             temp.value = eventValue;
                           }
                       }
                   });
                 }
               });
            }
          }
          result.push(temp);
        });
      }
    }
  });
  if(result.length > 0) {
    
    finalResult = getAbnormalEvents(result);
  }
  console.log('final result is:--', result);
  return finalResult;
}

  const getAbnormalEvents = function(data) {
    const result = [];
   // console.log('data in roytesdbbv', data);
    _.forEach(data ,(o) => {
        if(abnormalAlerts.indexOf(o.name) !== -1) {
            result.push({
              name: o.name,
              time: o.time,
              lat: o.lat,
              lng: o.lng,
              value: o.value
            });
        }
      });
    return result;

  }

