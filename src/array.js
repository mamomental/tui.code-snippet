/**
 * @fileoverview This module has some functions for handling array.
 * @author NHN Ent.
 *         FE Development Team <jiung.kang@nhnent.com>
 * @dependency type.js
 */

(function(ne) {
    'use strict';
    if (!ne) {
        ne = window.ne = {};
    }
    if (!ne.util) {
        ne.util = window.ne.util = {};
    }

    var aps = Array.prototype.slice;

    /**
     * Generate an integer Array containing an arithmetic progression.
     * @param {number} start
     * @param {number} stop
     * @param {number} step
     * @returns {Array}
     * @example
     *
     *   var arr = ne.util.range(5);
     *   console.log(arr); // [0,1,2,3,4]
     *
     *   arr = ne.util.range(1, 5);
     *   console.log(arr); // [1,2,3,4]
     *
     *   arr = ne.util.range(2, 10, 2);
     *   console.log(arr); // [2,4,6,8]
     *
     *   arr = ne.util.range(10, 2, -2);
     *   console.log(arr); // [10,8,6,4]
     */
    var range = function(start, stop, step) {
        var arr = [],
            flag;

        if (ne.util.isUndefined(stop)) {
            stop = start || 0;
            start = 0;
        }

        step = step || 1;
        flag = step < 0 ? -1 : 1;
        stop *= flag;

        for(; start * flag < stop; start += step) {
            arr.push(start);
        }

        return arr;
    };

    /**
     * Zip together multiple lists into a single array
     * @param {...Array}
     * @returns {Array}
     * @example
     *
     *   var result = ne.util.zip([1, 2, 3], ['a', 'b','c'], [true, false, true]);
     *
     *   console.log(result[0]); // [1, 'a', true]
     *   console.log(result[1]); // [2, 'b', false]
     *   console.log(result[2]); // [3, 'c', true]
     */
    var zip = function() {
        var arr2d = aps.call(arguments),
            result = [];

        ne.util.forEach(arr2d, function(arr) {
            ne.util.forEach(arr, function(value, index) {
                if (!result[index]) {
                    result[index] = [];
                }
                result[index].push(value);
            });
        });

        return result;
    };

    ne.util.range = range;
    ne.util.zip = zip;
})(window.ne);