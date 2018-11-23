'use strict';

class Utils {

    /**
     * Predicate which produces TRUE when param n is a numeric value
     * @param mixed n 
     */
    isNumeric(n) {
        return !isNaN(parseFloat(n)) && isFinite(n);
    }
}

module.exports = Utils;