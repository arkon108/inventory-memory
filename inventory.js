'use strict';

const utils       = require('./utils');
let Utils         = new utils;

/**
 * Inventory contains items in the following format
 * Inventory.items = [
 *  [ sku, name, quantity, price ]
 * ]
 */

class Inventory {

    /**
     * Initializes empty Inventory
     */
    constructor() {
        this.full = false;
        this.items = [];
    }

    /**
     * Inserts an item to the inventory
     * @param array item 
     */
    add(item) {
        if (!this.isValid(item)) {
            throw "Invalid item input, expected [SKU NAME QUANTITY PRICE]";
        }
        item = this.normalize(item);
        this.items.push(item);
    }

    /**
     * Produces the single item from inventory based on SKU
     * @param int sku 
     */
    get(sku) {
        let result = this.items.filter(i => i[0] == sku);
        return result.length && result[0] || [];
    }

    /**
     * Produces TRUE if there is available amount of items in the Inventory
     * @param array item 
     */
    available(item) {
        let [sku, quantity] = item;
        let stored = this.get(sku);

        return stored.length && (stored[2] - quantity >= 0) || false; 
    }

    /**
     * Predicate which returns TRUE if item is valid, FALSE otherwise
     * @param array item 
     */
    isValid(item) {
        return typeof item === "object" 
            && item.length === 4
            && Utils.isNumeric(item[0])
            && typeof item[1] === "string"
            && Utils.isNumeric(item[2])
            && Utils.isNumeric(item[3]);
    }

    /**
     * Casts string entries of the item to numerical values
     * @param array item 
     */
    normalize(item) {
        item[0] = parseInt(item[0]);    // sku
        item[2] = parseInt(item[2]);    // quantity
        item[3] = parseFloat(item[3]);  // price
        return item;
    }
}

module.exports = Inventory;