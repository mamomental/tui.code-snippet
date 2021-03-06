/**
 * @fileoverview This module provides a Enum Constructor.
 * @author NHN Ent.
 *         FE Development Team <e0242@nhnent.com>
 * @dependency type, collection.js
 */

(function(tui) {

'use strict';

/* istanbul ignore if */
if (!tui) {
    tui = window.tui = {};
}
if (!tui.util) {
    tui.util = window.tui.util = {};
}

/**
 * Check whether the defineProperty() method is supported.
 * @type {boolean}
 */
var isSupportDefinedProperty = (function () {
    try {
        Object.defineProperty({}, 'x', {});
        return true;
    } catch (e) {
        return false;
    }
}());

/**
 * A unique value of a constant.
 * @type {number}
 */
var enumValue = 0;

/**
 * Make a constant-list that has unique values.<br>
 * In modern browsers (except IE8 and lower),<br>
 *  a value defined once can not be changed.
 *
 * @param {...string | string[]} itemList Constant-list (An array of string is available)
 * @exports Enum
 * @constructor
 * @class
 * @memberof tui.util
 * @examples
 *  //create
 *  var MYENUM = new Enum('TYPE1', 'TYPE2');
 *  var MYENUM2 = new Enum(['TYPE1', 'TYPE2']);
 *
 *  //usage
 *  if (value === MYENUM.TYPE1) {
 *       ....
 *  }
 *
 *  //add (If a duplicate name is inputted, will be disregarded.)
 *  MYENUM.set('TYPE3', 'TYPE4');
 *
 *  //get name of a constant by a value
 *  MYENUM.getName(MYENUM.TYPE1); // 'TYPE1'이 리턴된다.
 *
 *  // In modern browsers (except IE8 and lower), a value can not be changed in constants.
 *  var originalValue = MYENUM.TYPE1;
 *  MYENUM.TYPE1 = 1234; // maybe TypeError
 *  MYENUM.TYPE1 === originalValue; // true
 *
 **/
function Enum(itemList) {
    if (itemList) {
        this.set.apply(this, arguments);
    }
}

/**
 * Define a constants-list
 * @param {...string| string[]} itemList Constant-list (An array of string is available)
 */
Enum.prototype.set = function(itemList) {
    var self = this;

    if (!tui.util.isArray(itemList)) {
        itemList = tui.util.toArray(arguments);
    }

    tui.util.forEach(itemList, function itemListIteratee(item) {
        self._addItem(item);
    });
};

/**
 * Return a key of the constant.
 * @param {number} value A value of the constant.
 * @returns {string|undefined} Key of the constant.
 */
Enum.prototype.getName = function(value) {
    var foundedKey,
        self = this;

    tui.util.forEach(this, function(itemValue, key) {
        if (self._isEnumItem(key) && value === itemValue) {
            foundedKey = key;
            return false;
        }
    });

    return foundedKey;
};

/**
 * Create a constant.
 * @private
 * @param {string} name Constant name. (It will be a key of a constant)
 */
Enum.prototype._addItem = function(name) {
    var value;

    if (!this.hasOwnProperty(name)) {
        value = this._makeEnumValue();

        if (isSupportDefinedProperty) {
            Object.defineProperty(this, name, {
                enumerable: true,
                configurable: false,
                writable: false,
                value: value
            });
        } else {
            this[name] = value;
        }
    }
};

/**
 * Return a unique value for assigning to a constant.
 * @private
 * @returns {number} A unique value
 */
Enum.prototype._makeEnumValue = function() {
    var value;

    value = enumValue;
    enumValue += 1;

    return value;
};

/**
 * Return whether a constant from the given key is in instance or not.
 * @param {string} key - A constant key
 * @returns {boolean} Result
 * @private
 */
Enum.prototype._isEnumItem = function(key) {
    return tui.util.isNumber(this[key]);
};

tui.util.Enum = Enum;

})(window.tui);
