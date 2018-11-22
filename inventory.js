'use strict';

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
        item = this.normalize(item);
        this.items.push(item);
    }

    /**
     * Produces the single item from inventory based on SKU
     * @param int sku 
     */
    get(sku) {
        return this.items.filter(i => i[0] == sku)[0];
    }

    /**
     * Sets the full flag to indicate inventory being complete
     */
    setFull() {
        this.full = true;
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