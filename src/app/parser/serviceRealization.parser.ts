import * as _ from 'lodash';
import * as moment from 'moment';

export function ServiceRealizationParser(serviceData) {
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
                  const temp = {
                      'month': monthKey[val.month - 1],
                      'Actual Services': val.value2,
                      'Service Alerts': val.value1
                  };
                  result.push(temp);
                });
return result;
}
