import * as _ from 'lodash';
import * as moment from 'moment';

export function ServiceCostParser(serviceData) {
const result = [];
const monthKey = [
                  'Jan',
                  'Feb',
                  'Mar',
                  'Apr',
                  'May',
                  'Jun',
                  'Jul',
                  'Aug',
                  'Sep',
                  'Oct',
                  'Nov',
                  'Dec'
                  ];
_.forEach(serviceData.data, ( val ) => {
              if(parseFloat(val.estimatedServiceCost) >0 || parseFloat(val.actualServiceCost) > 0) {
                const temp = {
                        'month': monthKey[val.month - 1],
                        'Estimated Service Cost': val.estimatedServiceCost,
                        'Actual Service Cost': val.actualServiceCost
                    };
                    result.push(temp);
              }
            });
console.log('ServiceCostParser:-', result);
return result;
}
