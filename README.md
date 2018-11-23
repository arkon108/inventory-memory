# Command line Shopping cart & Inventory example

## Usage
After checking out the repository, in terminal change to the repo directory and type `shop` to start program.

## Testing
Run `npm test` in the script directory.

### Example output

```
terminal-inventory $ shop
Welcome to Inventory and Cart manager. Start by adding items to the Inventory

INVENTORY> ADD 1 Book 5 2.25
INVENTORY> ADD 2 DVD 10 6.80
INVENTORY> END
CART> ADD 
Invalid item input, expected [SKU QUANTITY]
CART> ADD 1 4
CART> ADD 1 5
Can't add item to cart
CART> ADD 1 1
CART> ADD 2 4
CART> ADD 3 3
Can't add item to cart
CART> CHECKOUT
Book 5 x 2.25 = 11.25
DVD 4 x 6.8 = 27.2
---------------------------
TOTAL: 38.45
---------------------------

CART> END
Thank you for shopping with us! Have a fantastic day!
terminal-inventory $ 

```
