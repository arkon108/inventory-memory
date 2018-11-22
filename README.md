# Command line Shopping cart & Inventory example

## Usage
After checking out the repository, in terminal change to the repo directory and type `shop` to start program.

## Testing
Run `npm test` in the script directory.

### Example output

```
$ shop
Welcome to Inventory and Cart manager. Start by adding items to the Inventory

INVENTORY> ADD 1 Tshirt 4 4
INVENTORY> ADD 2 Book 15 40
INVENTORY> END
CART> ADD 1 2
CART> ADD 2 1
CART> ADD 2 2
CART> REMOVE 2 1
CART> CHECKOUT
Tshirt 2 x 4 = 8
Book 2 x 40 = 80
---------------------------
TOTAL: 88
---------------------------

CART> END
Thank you for shopping with us! Have a fantastic day!
```
