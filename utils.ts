import * as moment from 'moment';

export class Utils {
  /**
   * @param {number} timestamp
   * @param {number} offset
   * @param {string} format
   * @returns {string}
   */
  static getLocalTime = (timestamp: number, offset: number, format: string): string => {
    return `${moment.unix(timestamp).utcOffset(offset).format(format)}`;
  };

  
}