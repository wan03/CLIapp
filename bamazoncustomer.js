const inquirer = require("inquirer"),
      mysql = require("mysql"),
      {table} = require("table");

var connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : 'root',
  database : 'bamazon_db'
});

connection.connect(function(err) {
  if (err) throw err;
  console.log("connected as id " + connection.threadId);
  start();
});


function start () {
  connection.query("SELECT id, product_name, price, stock_quantity FROM products", function(err, results) {
    if (err) throw err    
  inquirer
    .prompt([
      {
        name: "start",
        type: "rawlist",
        message: "What would you like to do?",
        choices: ["Buy", "Quit"]
      }]).then(function(choice){

        if (choice.start == "Quit"){
          console.log("Come again!");
          connection.end();
        } else {


          inquirer
          .prompt([
      {
        name: "buy",
        type: "list",
        message: "Which product do you wish to buy?",
        pageSize: 10,
        choices: function() {
          var choiceArray = [];
          for (var i = 0; i < results.length; i++) {
            choiceArray.push(results[i].id + "." + " Name: " + results[i].product_name + " | Price: " + results[i].price + " | Quantity: " + results[i].stock_quantity);
          }
          return choiceArray;      
}
        },
    
    {
      name: "quantity",
      type: "input",
      message: "How many would you like to purchase?",
      validate: function(value) {
        if (isNaN(value) === false && value > 0) {
          return true;
        }
        return false;
      }
    }]).then(function(data){
      console.log("Getting information...")
      buy(results, data);
    })  
  }
})
})
}

function buy (results, data){

console.log(data.buy.split(".")[0]);
let currentID = parseInt(data.buy.split(".")[0]) - 1
console.log("Stock: " + results[currentID].stock_quantity);
console.log("Stock hard: " + results[5 - 1].stock_quantity);
if(data.quantity <= results[currentID].stock_quantity){
console.log("Buy");

} else {
  console.log("Insufficient quantity!")
}
}