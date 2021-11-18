import mpg_data from "./data/mpg_data.js";
import {getStatistics} from "./medium_1.js";

/*
This section can be done by using the array prototype functions.
https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array
see under the methods section
*/


/**
 * This object contains data that has to do with every car in the `mpg_data` object.
 *
 *
 * @param {allCarStats.avgMpg} Average miles per gallon on the highway and in the city. keys `city` and `highway`
 *
 * @param {allCarStats.allYearStats} The result of calling `getStatistics` from medium_1.js on
 * the years the cars were made.
 *
 * @param {allCarStats.ratioHybrids} ratio of cars that are hybrids
 */
export const allCarStats = {
    avgMpg: getAvgMpg(mpg_data),
    allYearStats: getYearStats(mpg_data),
    ratioHybrids: getHybridRatio(mpg_data),
};

export function getAvgMpg(array) {
    var numHwy = 0;
    var numCity = 0;
    var sumHwy = 0;
    var sumCity = 0;
    for (var i = 0; i < array.length; i++) {
        sumCity += array[i].city_mpg; 
        sumHwy += array[i].highway_mpg;
        numHwy++;
        numCity++;
    }
    var city = sumCity / numCity; 
    var highway = sumHwy / numHwy; 
    return {city, highway};
}

export function getYearStats(array) {
    let newArray = []; 
    for (let i = 0; i < array.length; i++){
        newArray[i] = mpg_data[i].year; 
    }
    return getStatistics(newArray);
}

export function getHybridRatio(array) {
    var numHybrids = 0;
    var numOfCars = 0;
    for (let i = 0; i < array.length; i++) {
        numOfCars++;
        if (mpg_data[i].hybrid) {
            numHybrids;
        }
    }
    return numHybrids / numOfCars; 
}

/**
 * HINT: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/reduce
 *
 * @param {moreStats.makerHybrids} Array of objects where keys are the `make` of the car and
 * a list of `hybrids` available (their `id` string). Don't show car makes with 0 hybrids. Sort by the number of hybrids
 * in descending order.
 *
 *[{
 *     "make": "Buick",
 *     "hybrids": [
 *       "2012 Buick Lacrosse Convenience Group",
 *       "2012 Buick Lacrosse Leather Group",
 *       "2012 Buick Lacrosse Premium I Group",
 *       "2012 Buick Lacrosse"
 *     ]
 *   },
 *{
 *     "make": "BMW",
 *     "hybrids": [
 *       "2011 BMW ActiveHybrid 750i Sedan",
 *       "2011 BMW ActiveHybrid 750Li Sedan"
 *     ]
 *}]
 *
 *
 *
 *
 * @param {moreStats.avgMpgByYearAndHybrid} Object where keys are years and each year
 * an object with keys for `hybrid` and `notHybrid`. The hybrid and notHybrid
 * should be an object with keys for `highway` and `city` average mpg.
 *
 * Only years in the data should be keys.
 *
 * {
 *     2020: {
 *         hybrid: {
 *             city: average city mpg,
 *             highway: average highway mpg
 *         },
 *         notHybrid: {
 *             city: average city mpg,
 *             highway: average highway mpg
 *         }
 *     },
 *     2021: {
 *         hybrid: {
 *             city: average city mpg,
 *             highway: average highway mpg
 *         },
 *         notHybrid: {
 *             city: average city mpg,
 *             highway: average highway mpg
 *         }
 *     },
 *
 * }
 */
export const moreStats = {
    makerHybrids: [...new Set(mpg_data.map(car => car.make))].map(make => {
        return {
            make: make,
            hybrids: mpg_data.filter(car => car.make === make && car.hybrid).map(car => car.id)
        };
    }).filter(make => make.hybrids.length > 0).sort((a,b) => b.hybrids.length - a.hybrids.length),
    avgMpgByYearAndHybrid: getFunction(), 
};

export function getFunction() {
    let newObject = {};
    let year = mpg_data.map(elem => elem.year);
    let normal = mpg_data.filter(elem => elem.hybrid != true);
    let hybrid = mpg_data.filter(elem => elem.hybrid != false);
    for(let i = 0; i < year.length; i++) {
        let indexYear = year[i];
        let result = {
            hybrid: getAvgMpg(hybrid.filter(elem => elem.year == indexYear)),
            notHybrid: getAvgMpg(normal.filter(elem => elem.year == indexYear))
        }
        newObject[indexYear] = result; 
    };
    return newObject; 
}