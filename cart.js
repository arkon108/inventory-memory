'use strict';

const utils       = require('./utils');
let Utils         = new utils;

/**
 * Shopping cart which contains temporary list of items
 * Items are stored as array in the format:
 * [sku, amount]
 * uses Inventory
 */
class Cart {

    /**
     * Initializes the empty cart
     */
    constructor() {
        this.items = [];
    }

    /**
     * Inserts a new item or adds amount to existing cart item, based on SKU (first element)
     * Uses existing inventory to check for quantity of desired items
     * @param array item 
     * @param object inventory
     */
    add(item, Inventory) {

        if (!this.isValid(item)) {
            throw "Invalid item input, expected [SKU QUANTITY]";
        }

        item = this.normalize(item);

        if (this.items.filter(i => i[0] == item[0]).length) { // item with SKU exists already
            this.items = this.items.map(
                i => {
                    // check for availability of the item in the Inventory
                    if (!Inventory.available([item[0], item[1] + i[1]])) {
                        throw "Can't add item to cart";
                    }

                    // when the SKU of the newly added item matches the item in the inventory, just add amount
                    if (i[0] == item[0]) {
                        i[1] += item[1];
                    }
                    return i;
                }
            );
        } else { // no item with matching SKU found, add the item to the cart
            // check for availability of the item in the Inventory
            if (!Inventory.available(item)) {
                throw "Can't add item to cart";
            }
            this.items.push(item);
        }
    }

    /**
     * Decreases the amount of item in the cart, removes entirely if it falls below 1
     * @param array item 
     */
    remove(item) {
        item = this.normalize(item);

        if (this.items.filter(i => i[0] == item[0]).length) { // item with SKU exists already
            this.items = this.items.map(
                i => {
                    // when the SKU of the newly added item matches the item in the inventory, just add amount
                    if (i[0] == item[0]) {
                        i[1] -= item[1];
                    }
                    return i;
                }
            );
        }

        // filter out the items with quantity of 0 or less
        this.items = this.items.filter(i => i[1] > 0);
    }

    /**
     * Prints the state of the cart with calculated prices and clears the cart state
     * Uses Inventory of items
     * @param object Inventory
     */
    checkout(Inventory) {
        let total = 0;
        this.items.forEach(i => {
            let [ sku, name, quantity, price ] = Inventory.get(i[0]);
            console.log(`${name} ${i[1]} x ${price} = ${i[1] * price}`);
            total += i[1] * price;

            // update Inventory state
            Inventory.items = Inventory.items.map(item => {
                if (item[0] === sku) {
                    item[2] -= i[1];
                }
                return item;
            });
        });
        console.log("---------------------------");
        console.log(`TOTAL: ${total}`);
        console.log("---------------------------\n");

        this.items = [];
    }

    /**
     * Predicate which returns TRUE if cart entry is valid, FALSE otherwise
     * @param array item 
     */
    isValid(item) {
        return typeof item === "object" 
            && item.length === 2
            && Utils.isNumeric(item[0])
            && Utils.isNumeric(item[1]);
    }

    /**
     * Produces the item with string elements cast to int
     * @param array item 
     */
    normalize(item) {
        return item.map(x => parseInt(x));
    }
}

module.exports = Cart;
