#! /usr/bin/env node
'use strict'

// requires and main app constants
const read      = require('readline'),
    iface       = read.createInterface(process.stdin, process.stdout),
    prompt_inv  = 'INVENTORY> ',
    prompt_cart = 'CART> ',
    Inventory   = require('./inventory'),
    Cart        = require('./cart');

// Separated initializing of main application classes for clarity
const I = new Inventory();
const C = new Cart();

iface.on('line', function(line) {
    line = line.trim();
    var commands = line.split(' ');

    if (I.full) { // Adding items to shopping cart
        
        switch (commands[0]) {
            case 'ADD':
                var item = commands;
                item.shift();
                try {
                    C.add(item, I);
                } catch (err) {
                    console.log(err);
                }
                
                break;

            case 'REMOVE':
                var item = commands;
                item.shift();
                C.remove(item);
                break;

            case 'CHECKOUT':
                C.checkout(I);
                break;

            case 'END':
                iface.close();
                break;

            default:
                console.log(`Unrecognized command '${commands[0]}'`);
                break;
        }
        iface.setPrompt(prompt_cart, prompt_cart.length);
    } else { // Adding items to the inventory

        iface.setPrompt(prompt_inv, prompt_inv.length);

        switch (commands[0]) {
            case 'ADD':
                let item = commands;
                item.shift();

                try {
                    I.add(item);
                } catch (err) {
                    console.log(err);
                }
                
                break;

            case 'END':
                if (I.items.length > 0) {
                    iface.setPrompt(prompt_cart, prompt_cart.length);
                    I.full = true;
                } else {
                    console.log('Please ADD something to the inventory first');
                }
                
                break;

            default:
                console.log(`Unrecognized command '${commands[0]}'`);
                break;
        }
    }

    iface.prompt();

  }).on('close', function() {

    console.log('Thank you for shopping with us! Have a fantastic day!');
    process.exit(0);

  });

  console.log("Welcome to Inventory and Cart manager. Start by adding items to the Inventory\n");
  iface.setPrompt(prompt_inv, prompt_inv.length);
  iface.prompt();