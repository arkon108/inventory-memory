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
assert(inventory.isValid([]) === false, "Inventory doesn't allow empty item input");
assert(inventory.isValid(['a', 1, 1, 1]) === false, "Inventory doesn't allow incorrect item elements");
assert(inventory.isValid(mockItems[0]) === true, "Inventory validates the correct item input");

inventory.add(mockItems[0]);
inventory.add(mockItems[1]);
inventory.add(mockItems[2]);

assert(inventory.full === false, "Inventory is empty until set by flag");
assert(inventory.get(2) === mockItems[1], "Inventory fetches the item listing by SKU");

assert(inventory.available([1, 1]) === true, "Inventory allows access to available items");
assert(inventory.available([1,21]) === false, "Inventory prevents access to items over available quantity");
assert(inventory.available([4, 1]) === false, "Inventory prevents access to nonexisting items");

/**
 * Shopping cart tests
 */
assert(cart.items.length === 0, "New shopping cart is empty");
assert(cart.isValid([]) === false, "Cart doesn't accept empty input");
assert(cart.isValid(['a', 1]) === false, "Cart doesn't accept string input");
assert(cart.isValid([1, 1]) === true, "Cart doesn't accepts proper numeric input");
assert(cart.isValid([1, 1, 1]) === false, "Cart doesn't accept wrong number of input elements");

cart.add([1, 1], inventory);
cart.add([2, 5], inventory);
assert.deepEqual(cart.items[1], [2,5], "Cart inserts items");

cart.add([1,9], inventory);
assert.deepEqual(cart.items[0], [1,10], "Cart adds items with same SKU");

cart.remove([2, 3]);
assert.deepEqual(cart.items[1], [2,2], "Cart removes items based on SKU");

cart.remove([2, 2]);
assert(cart.items.length === 1, "When all items with same SKU are removed, entire listing gets deleted");

cart.checkout(inventory);
assert(cart.items.length === 0, "Cart after checkout is empty");
