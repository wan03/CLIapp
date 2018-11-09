// Required Constants
const inquirer = require("inquirer"),
      mysql = require("mysql"),
      {table} = require("table");

// Connection to database
var connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : 'root',
  database : 'bamazon_db'
});

connection.connect(function(err) {
  if (err) throw err;
  start();
});

// Function to start process
function start (){
  inquirer
  .prompt([
    {
      name: "start",
      type: "list",
      message: "What would you like to do?",
      choices: ["View Products for Sale", "View Low Inventory", "Add to Inventory", "Add New Product", "Quit"]
    }]).then(function(choice){

      switch (choice.start){
        case "View Products for Sale":
        viewProducts();
        break;
        case "View Low Inventory" :
        lowInventory();
        break;
        case "Add to Inventory" :
        addInventory();
        break;
        case "Add New Product" :
        newProduct();
        break;
        case "Quit" :
        console.log("See you next time!");
          connection.end();
      }      
      });
}

// Function to view products in database
function viewProducts (){
  connection.query("SELECT id, product_name, price, stock_quantity FROM products", function(err, results) {
    if (err) throw err
    let config,
    data = [
      ['ID', 'Name', 'Price', 'Quantity']      
  ],
    choiceArray = [],
    output;
    
    for (var i = 0; i < results.length; i++) {
      choiceArray.push(results[i].id); 
      choiceArray.push(results[i].product_name);
      choiceArray.push("$" + results[i].price);
      choiceArray.push(results[i].stock_quantity);     
    }
    while (choiceArray.length > 0){
      chunk = choiceArray.splice(0,4)
      data.push(chunk);
    }   

config = {
    columns: {
        0: {
            alignment: 'left',
            minWidth: 10
        },
        1: {
            alignment: 'left',
            minWidth: 10
        },
        2: {
            alignment: 'left',
            minWidth: 10
        }
    }
};
 
output = table(data, config);
console.log(output);
start();
  })
};

// Function to check for low inventory
function lowInventory () {
  connection.query("SELECT id, product_name, price, stock_quantity FROM products", function(err, results) {
    if (err) throw err
    let config,
    data = [
      ['ID', 'Name', 'Price', 'Quantity']      
  ],
    choiceArray = [],
    output;
    
    for (var i = 0; i < results.length; i++) {
      if(results[i].stock_quantity < 5){
      choiceArray.push(results[i].id); 
      choiceArray.push(results[i].product_name);
      choiceArray.push(results[i].price);
      choiceArray.push(results[i].stock_quantity);
    }     
    }
    while (choiceArray.length > 0){
      chunk = choiceArray.splice(0,4)
      data.push(chunk);
    }   

config = {
    columns: {
        0: {
            alignment: 'left',
            minWidth: 10
        },
        1: {
            alignment: 'left',
            minWidth: 10
        },
        2: {
            alignment: 'left',
            minWidth: 10
        }
    }
};
 
output = table(data, config);
console.log(output);
start();
  })

}

function addInventory () {
  connection.query("SELECT id, product_name, price, stock_quantity FROM products", function(err, results) {
    if (err) throw err    
  inquirer
    .prompt([     
      {
        name: "buy",
        type: "list",
        message: "Which product do you wish to update?",
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
      message: "How many would you like to add?",
      validate: function(value) {
        if (isNaN(value) === false && value > 0) {
          return true;
        }
        return false;
      }
    }]).then(function(data){     
let IDplaceArray = parseInt(data.buy.split(".")[0]) - 1
let quantity = parseInt(results[IDplaceArray].stock_quantity) + parseInt(data.quantity);
var query = connection.query(
  "UPDATE products SET ? WHERE ?",
  [
    {
      stock_quantity: quantity
    },
    {
      id: data.buy.split(".")[0]
    }
  ],
  function(err, res) {
    console.log(results[IDplaceArray].product_name + " was succesfully updated");    
    start();
  }
  )
    })  
  });
}

function newProduct () {
  inquirer
    .prompt([
      {
        name: "name",
        type: "input",
        message: "What is the name of the product you want to add?"
      },
      {
        name: "deptName",
        type: "input",
        message: "What is the name of the department of the product you want to add?"
      },
      {
        name: "price",
        type:"input",
        message:"What is the price of this product?",
        validate: function(value) {
          if (isNaN(value) === false && value > 0) {
            return true;
          }
          return false;
        }
      },
      {
        name: "quantity",
        type:"input",
        message:"What is the quantity of the product that you wish to add?",
        validate: function(value) {
          if (isNaN(value) === false && value > 0) {
            return true;
          }
          return false;
        }
      }
    ]).then(function(data){
      console.log("Inserting a new product...\n");
  var query = connection.query(
    "INSERT INTO products SET ?",
    {
      product_name: data.name,
      department_name: data.deptName,
      price: data.price,
      stock_quantity: data.quantity
    },
    function(err, res) {
      if (err) throw err
      console.log("Product had been inserted!\n");
      // Call updateProduct AFTER the INSERT completes
      start();
    }
  );


    })

}

