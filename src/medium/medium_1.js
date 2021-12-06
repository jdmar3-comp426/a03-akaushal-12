import {variance} from "./data/stats_helpers.js";

/**
 * Gets the sum of an array of numbers.
 * @param array
 * @returns {*}
 * see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array
 * prototype functions. Very useful
 */
export function getSum(array) {
    let sum = 0;
    for (let i = 0; i < array.length; i++) {
        sum += array[i];
    }
    return sum; 
}


/**
 * Calculates the median of an array of numbers.
 * @param {number[]} array
 * @returns {number|*}
 *
 * example:
 * let array = [3,2,5,6,2,7,4,2,7,5];
 * console.log(getMedian(array)); // 4.5
 */
export function getMedian(array) {
    let median = 0;
    array.sort( (a,b) => a-b);
    if (array.length%2 == 0) {
        median = (array[array.length/2 - 1] + array[array.length/2]) / 2;
    } else {
        median = array[(array.length - 1)/ 2];
    }
    return median; 
}

/**
 * Calculates statistics (see below) on an array of numbers.
 * Look at the stats_helper.js file. It does variance which is used to calculate std deviation.
 * @param {number[]} array
 * @returns {{min: *, median: *, max: *, variance: *, mean: *, length: *, sum: *, standard_deviation: *}}
 *
 * example:
 * getStatistics([3,2,4,5,5,5,2,6,7])
 * {
  length: 9,
  sum: 39,
  mean: 4.333333333333333,
  median: 5,
  min: 2,
  max: 7,
  variance: 2.6666666666666665,
  standard_deviation: 1.632993161855452
 }
 */
export function getStatistics(array) {
    let object = {};
    object.length = array.length; 
    object.sum = getSum(array);
    object.mean = object.sum/object.length; 
    object.median = getMedian(array);
    array.sort(); 
    object.min = array[0];
    object.max =array[array.length - 1];
    object.variance = variance(array, object.mean);
    object.standard_deviation = Math.sqrt(object.variance);
    return object; 
}

