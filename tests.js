'use strict'

// requires and main app constants
const   Inventory   = require('./inventory'),
        Cart        = require('./cart'),
        assert      = require('assert');

let inventory   = new Inventory();
let cart        = new Cart();
let mockItems   = [
    [1, 'Book', 20, 4.50],
    [2, 'CD', 100, 10.25],
    [3, 'DVD', 150, 15.99]
];

/**
 * Inventory tests
 */
inventory.add(mockItems[0]);
inventory.add(mockItems[1]);
inventory.add(mockItems[2]);

assert(inventory.full === false, "Inventory is empty until set by flag");
inventory.setFull();
assert(inventory.full === true, "Inventory is full when set by flag");
assert(inventory.get(2) === mockItems[1], "Inventory fetches the item listing by SKU");

/**
 * Shopping cart tests
 */
assert(cart.items.length === 0, "New shopping cart is empty");
cart.add([1, 1]);
cart.add([2, 5]);
assert.deepEqual(cart.items[1], [2,5], "Cart inserts items");

cart.add([1,9]);
assert.deepEqual(cart.items[0], [1,10], "Cart adds items with same SKU");

cart.remove([2, 3]);
assert.deepEqual(cart.items[1], [2,2], "Cart removes items based on SKU");

cart.remove([2, 2]);
assert(cart.items.length === 1, "When all items with same SKU are removed, entire listing gets deleted");

cart.checkout(inventory);
assert(cart.items.length === 0, "Cart after checkout is empty");
