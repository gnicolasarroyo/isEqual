(function (_global) {
    "use strict";
    
    var isEqual;
            
    isEqual = (function () {
        /**
         * isEqual
         * @description 
         *      A simple function to compare elements within javascrit. 
         *      Based on "typeof" and taking much help 
         *      from underscore.js (https://github.com/jashkenas/underscore)
         * 
         * @param {any} _a
         * @param {any} _b
         * @return {Null|Boolean} result
         */
        function isEqual (_a, _b) {
            var result, aType, bType, aKeys, bKeys, i;
            
            try {
                aType = typeof _a;
                bType = typeof _b;
                 
                if (aType !== bType) {
                    result = false;
                } else if (aType === "number") { 
                    // https://github.com/jashkenas/underscore/blob/master/underscore.js#L1187
                    if (+_a !== +_a) {
                        // `NaN`s are equivalent, but non-reflexive.
                        // Object(NaN) is equivalent to NaN.
                        result = +_b !== +_b;  
                    } else {
                        // An `egal` comparison is performed for other numeric values.
                        result = +_a === 0 ? 1 / +_a === 1 / _b : +_a === +_b;    
                    }
                } else if (aType === "string") {
                    // https://github.com/jashkenas/underscore/blob/master/underscore.js#L1183
                    // Primitives and their corresponding object wrappers are equivalent; thus, `"5"` is
                    // equivalent to `new String("5")`.
                    result = '' + _a === '' + _b;
                } else if ((aType === "boolean") 
                || ((aType === "object") && (_a instanceof Date && _b instanceof Date))) {
                    // https://github.com/jashkenas/underscore/blob/master/underscore.js#L1194
                    // Coerce dates and booleans to numeric primitive values. Dates are compared by their
                    // millisecond representations. Note that invalid dates with millisecond representations
                    // of `NaN` are not equivalent.
                    result = +_a === +_b;
                } else if ((aType === "object") && (_a instanceof Array && _b instanceof Array)) {
                    // The first difference we can find between two arrays is its length, 
                    // otherwise iterate comparing each element.
                    if (_a.length !== _b.length) {
                        result = false;
                    } else {
                        result = true;
                        for (i = 0; i < _a.length; i++) {
                            result = isEqual(_a[i], _b[i]);
                            if (!result) { break; }
                        }
                    }
                } else if ((aType === "object") && (_a instanceof Object && _b instanceof Object)) {
                    // The first difference we can find between two objects is the number of properties, 
                    // otherwise iterate comparing each element.
                    aKeys = Object.keys(_a);
                    bKeys = Object.keys(_b);
                    if (aKeys.length !== bKeys.length) {
                        result = false;
                    } else { 
                        result = true;
                        for (i = 0; i < aKeys.length; i++) {
                            result = isEqual(_a[aKeys[i]], _b[aKeys[i]]);
                            if (!result) { break; } 
                        }
                    }
                } else if (((aType === "object") && (_a === null && _b === null)) 
                || (aType === "function")
                || (aType === "undefined")) {
                    // The undefined values and the null values are equivalent 
                    // and the functions does not interest us compare now.
                    result = true;
                } else {
                    // When a and b do not fit with any of the alternatives, it returns false.
                    // This will help us identify in the future if we have to include new alterntivas.
                    result = false;
                }
            } catch(_ex) { 
                console.error(_ex.message);
                result = null;
            } finally {
                return result;
            }
        };
        
        return isEqual;
    })(); 
    
    _global.isEqual = isEqual;
})(window);