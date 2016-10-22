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
 prompt.get({
      name: 'ID',
      description: ("What is the ID of the item you would like to buy?"),
      required: true
    }, function (err, result) {
    
    //Confirm selection is valid
      connection.query('SELECT * FROM product',function(err,res){
        if(err) throw err;

        for (var i=0; i < res.length; i++) {
          if (parseInt(result.ID) === parseInt(res[i].ItemID)) {
            console.log("That is a valid selection");

            prompt.get({
              name: 'quantity',
              description: ('How many would you like?'),
              required: true,
              },  function (err, result) {
                console.log('  ID is ' + result.ID);
                console.log('  Qunatity is ' + result.quantity);
              })
          } else {
            console.log("Invalid Selection");
          }
        }
      })
    })

}

printInventory();