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
 prompt.get([{
      name: 'ID',
      description: ("What is the ID of the item you would like to buy?"),
      required: true
    }, {
      name: 'quantity',
      description: ('How many would you like?'),
      required: true,
      conform: function (value) {
        return true;
      }
    }], function (err, result) {
    // 
    // Log the results. 
    // 
    console.log('Command-line input received:');
    console.log('  ID is ' + result.ID);
    console.log('  Qunatity is ' + result.quantity);
  });
}

printInventory();