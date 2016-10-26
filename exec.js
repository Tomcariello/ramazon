var pw = "";

var mysql = require('mysql');
var prompt = require('prompt');
require('console.table');

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
// })


function printOptions() {
  console.log('What would you like to do?\n');
  console.log('1: View product sales by department');
  console.log('2: Create new department');
  console.log('----------------------------------------------------');
  promptUser();
}


function promptUser() {
  prompt.get(
    {
      name: 'ID',
      description: ("What would you like to do?\nSelect 1 or 2"),
      required: true
    }, function (err, result) {
    var command = parseInt(result.ID);
    //Confirm selection is valid
    switch(command) {
      case 1:
        viewProductSales();
        break;
      case 2:
        createDepartment();
        break;
      default:
        printOptions();
        break;
    }
  })
}

//view product sales
function viewProductSales() {
  var query = "select * from departments";
  connection.query(query,function(err,res){
    if(err) throw err;

    var tableArray = [];

    for (var i=0; i<res.length; i++) {
      var tempArray = [];
      var totalProfit = res[i].TotalSales - res[i].OverheadCosts;
      tempArray.push(res[i].DepartmentID);
      tempArray.push(res[i].DepartmentName);
      tempArray.push(res[i].OverheadCosts);
      tempArray.push(res[i].TotalSales);
      tempArray.push(totalProfit.toFixed(2));
      tableArray.push(tempArray);
    }

    console.table(['Department ID','Department Name','Overhead Costs','Product Sales','Profit'], tableArray);
  });

}

//Update
function createDepartment() {
  prompt.get([
    {
      name: 'name',
      description: ("What is the name of the new department?"),
      required: true
    }, {
      name: 'cost',
      description: ("What was the startup cost of this department?"),
      required: true
    }, {
      name: 'sales',
      description: ("What are your sales to date?"),
      required: true
    }], function (err, result) {
      // console.log(result);

      var query = "INSERT INTO departments (DepartmentName, OverheadCosts,TotalSales) VALUES ('" + result.name + "'," + result.cost + "," + result.sales + ");";
      connection.query(query,function(err,res){
        if(err) throw err;
      });
    })
}

printOptions();