var pw = "";

var mysql = require('mysql');
var prompt = require('prompt');

var connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root", //Your username
    password: pw, //Your password
    database: "ramazon"
})

var commands = ["View products for sale", "View low inventory", "Add to inventory", "Add new product"];

for (var i=0; i < commands.length; i++) {
   console.log(i +1 + ": " + commands[i]);
}

console.log('----------------------------------------------------');
promptUser();

function promptUser() {
  prompt.get(
    {
      name: 'ID',
      description: ("What is the number of the command you want to run?"),
      required: true
    }, function (err, result) {
    var commandToRun = parseInt(result.ID);

    switch(commandToRun) {
        //Print inventory
        case 1:
            printInventory();
            break;
        //Print low inventory
        case 2:
            printLowInventory();
            break;
        //Add to inventory
        case 3:
            printInventory(3);
            break;
        //add new product
        case 4:
            printInventory();
            break;
    }
  })
}

function printInventory(command) {
    connection.query('SELECT * FROM product',function(err,res){
      if(err) throw err;
      for (var i=0; i < res.length; i++) {
         console.log(res[i].ItemID + " | " + res[i].ProductName + " | " + res[i].Price + " | " + res[i].StockQuantity);
      }

      console.log('----------------------------------------------------');

      if (command ==3) {
        AddInventory();
      }
  });
}

function printLowInventory() {
    connection.query('SELECT * FROM product',function(err,res){
      if(err) throw err;
      for (var i=0; i < res.length; i++) {
        if (res[i].StockQuantity < 5) {
         console.log(res[i].ItemID + " | " + res[i].ProductName + " | " + res[i].Price + " | " + res[i].StockQuantity);
        }
      }

      console.log('----------------------------------------------------');
      promptUser();
  });
}


//check inventory. De-nest this if time permits
function AddInventory() {
  
  prompt.get(
    {
      name: 'item',
      description: ('Which item has increased inventory?'),
      required: true,
    }, function (err, result) {
      itemToIncrease = parseInt(result.item);

      //how many more
      prompt.get(
          {
            name: 'quantity',
            description: ('How many more?'),
            required: true,
          }, function (err, quantityPrompt) {

            //GET CURRENT QUANTITY OF THE SELECTED ITEM
            var query = "SELECT StockQuantity from product where ItemID=" + itemToIncrease;
            connection.query(query,function(err,res){
              var updatedQuantity = parseInt(quantityPrompt.quantity) + parseInt(res[0].StockQuantity);

              //increase quantity for the specified item
              var query = "UPDATE product SET StockQuantity=" + updatedQuantity + " WHERE ItemID=" + itemToIncrease;
              connection.query(query,function(err,res){
              });
            });
        })
  })
}

function makeSale(ItemID, resultingQuantity) {
  ItemID = ItemID + 1;
  var query = "UPDATE product SET StockQuantity=" + resultingQuantity + " WHERE ItemID=" + ItemID;
  connection.query(query,function(err,res){
  });
}
