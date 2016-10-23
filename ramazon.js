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

// connection.connect(function(err) {
//     if (err) throw err;
//     console.log("connected as id " + connection.threadId);
//     // start();
// })


function printInventory() {
    connection.query('SELECT * FROM product',function(err,res){
      if(err) throw err;

      console.log('All Data received from Db:\n');

      for (var i=0; i < res.length; i++) {
         console.log(res[i].ItemID + " | " + res[i].ProductName + " | " + res[i].DepartmentName + "|" + res[i].Price);
      }

      console.log('----------------------------------------------------');
      promptUser();
  });

}

function promptUser() {
  prompt.get(
    {
      name: 'ID',
      description: ("What is the ID of the item you would like to buy?"),
      required: true
    }, function (err, result) {
    var itemIDBeingPurchased = parseInt(result.ID);
    //Confirm selection is valid
    connection.query('SELECT * FROM product',function(err,res) {
      if(err) throw err;

      for (var i=0; i < res.length; i++) {
        // console.log(parseInt(result.ID) +" | " + parseInt(res[i].ItemID))
        if (parseInt(result.ID) === parseInt(res[i].ItemID)) {
          getQuantity(itemIDBeingPurchased,res);
        }
      }
    })
  })
}

//check inventory
function getQuantity(itemIDBeingPurchased,res) {
  //convert ID being purchased from JSON array to DB ID
  itemIDBeingPurchased = itemIDBeingPurchased -1;

  prompt.get({
    name: 'quantity',
    description: ('Enter quantity you would like for:  ' + res[itemIDBeingPurchased].ProductName),
    required: true,
    },  function (err, result) {
      if (res[itemIDBeingPurchased].StockQuantity >= result.quantity) {
        // console.log("We have " + res[itemIDBeingPurchased].StockQuantity + " of that in stock!");
        resultingQuantity = res[itemIDBeingPurchased].StockQuantity - result.quantity;
        makeSale(itemIDBeingPurchased,resultingQuantity);
        printBill(res[itemIDBeingPurchased].Price,result.quantity)
      } else {
        console.log("Insufficient quantity.")
      }
      //check inventory levels
    })
}

//Update
function makeSale(ItemID, resultingQuantity) {
  ItemID = ItemID + 1;
  //UPDATE product SET StockQuantity=20 WHERE ItemID=3 
  var query = "UPDATE product SET StockQuantity=" + resultingQuantity + " WHERE ItemID=" + ItemID;
  connection.query(query,function(err,res){
    // console.log(res);
  });
}

function printBill(cost,quantity) {
  console.log("Thank you! Your total cost is " + cost * quantity);
}

printInventory();