import * as _ from 'lodash';
import { abnormalAlerts } from '../constant'

export function ActiveAlertEventsCountParse(dataitems) {
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

    const finalData = getAlertByEvents(categoryMapList, result);
     return finalData;
}

 const getAlertByEvents = function(list, data) {
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
                      LowInternalbattery: 0,
                      LowOilPressure: 0,
                      HighCoolantTemperature: 0,
                      LowVehicleBattery: 0,
                      OverSpeed: 0,
                      DeviceRemovalFromVehicle: 0,
                      total: 0
                    };
          _.forEach(data, (alerts) => {
            if(alerts.assetid !== undefined) {
              temp.State = alerts.assetid;
            }
            if(abnormalAlerts.indexOf(alerts.name) !== -1) {
              temp[alerts.name] = alerts.value;
            }

            temp.total = temp.LowInternalbattery+temp.LowOilPressure+temp.HighCoolantTemperature+temp.LowVehicleBattery+temp.OverSpeed+temp.DeviceRemovalFromVehicle;
            
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