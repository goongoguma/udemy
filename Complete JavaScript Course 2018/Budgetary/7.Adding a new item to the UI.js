// BUDGET CONTORLLER 
var budgetController = (function() {
  // function constructors for expenses and incomes 
  // BUDGET CONTROLLER keeps track of all the incomes and expenses and budget itself and percentages later
    var Expense = function(id, description, value) {
      this.id = id;
      this.description = description;
      this.value = value;
    };
  
    var Income = function(id, description, value) {
      this.id = id;
      this.description = description;
      this.value = value;
    };
  
    // var allExpenses = [];
    // var allIncomes = [];
    // var totalExpenses = 0;
  
    var data = {
      allItems: {
        exp: [],
        inc: []
      },
      totals: {
        exp: 0,
        inc: 0
      }
    };
  
    // function that other modules add new item into our data structure 
    return {
      addItem: function(type, des, val) {
        var newItem, ID;
       
        //[1 2 3 4 5], next ID = 6
        //[1 2 4 6 8], NEXT ID = 9
        //ID = last ID + 1
  
        // Creat new ID
        // ID is a unique number that we want to assign to each new item that we put either in the expense or in the income arrays for the allItems
        if (data.allItems[type].length > 0) {
          ID = data.allItems[type][data.allItems[type].length - 1].id + 1; 
        } else {
          ID = 0;
        }
        
  
        // Create new item based on 'inc' or 'exp' type
        if(type === 'exp') {
          newItem = new Expense(ID, des, val);
        } else if (type === 'inc') {
          newItem = new Income(ID, des, val);
        }
        
        // Push it into our data structure
        data.allItems[type].push(newItem);
        
        // Return the new element 
        return newItem;
  
      },
  
      testing: function() {
        console.log(data);
      }
    };
  
  })();
  
  
  // UI CONTROLLER
  var UIController = (function() {
  
    var DOMstrings = { // repo to save css class names 
      inputType: '.add__type',
      inputDescription: '.add__description',
      inputValue: '.add__value',
      inputBtn: '.add__btn',
      incomeContainer: '.income__list',
      expensesContainer: '.expenses__list'
    };
    return {
      getInput: function() {
        return{ // in order to return three values at the same time, binding them as one object is better than seperate variables 
          type : document.querySelector(DOMstrings.inputType).value, // will be either inc or exp 
          description : document.querySelector(DOMstrings.inputDescription).value,
          value : document.querySelector(DOMstrings.inputValue).value
        };
      },
  
      addListItem: function(obj, types) { //obj is the exact same object that we created using a function constructor and then passed to out app controller
        var html, newHtml, element;
        // Create HTML string with placeholder text
        if(types === 'inc'){ //replace to placeholder
          element = DOMstrings.incomeContainer;
          html ='<div class="item clearfix" id="income-%id%"><div class="item__description">%description%</div><div class="right clearfix"><div class="item__value">%value%</div><div class="item__delete"><button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button></div></div></div>'
        } else if(types === 'exp'){
          element = DOMstrings.expensesContainer;
          html = '<div class="item clearfix" id="expense-%id%"><div class="item__description">%description%</div><div class="right clearfix"><div class="item__value">%value%</div><div class="item__percentage">21%</div><div class="item__delete"><button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button></div></div></div>'
        }
             
        // Replace the placeholder text with some actual data
        newHtml = html.replace('%id%', obj.id); //id property is the one that holds the id in var Expense and Income 
        newHtml = newHtml.replace('%description%', obj.description);
        newHtml = newHtml.replace('%value%', obj.value);
        // Insert the HTML into the DOM
        document.querySelector(element).insertAdjacentHTML('beforeend',newHtml);
      },
  
      getDOMstrings: function() { // this function connects GLOBAL APP CONTROLLER to store css classes in GLOBAL APP CONTROLLER module 
        return DOMstrings;
      }
    };
  
  })();
  
  
  // GLOBAL APP CONTROLLER -> the module where we tell the other modules what to do 
  var controller = (function(budgetCtrl, UICtrl) {
  
    var setupEventListeners = function() {
      var DOM = UICtrl.getDOMstrings();
      document.querySelector(DOM.inputBtn).addEventListener('click', ctrlAddItem);
      document.addEventListener('keypress',function(event) {
      if (event.keyCode === 13 || event.which === 13) { //which is for older browsers
        ctrlAddItem();
      }
    });
   }
    
    // the form of ctrlAddItem() is very common : controller calling some method and the method does something and returns it 
    var ctrlAddItem = function() { //DRY coding
      var input, newItem;
      
      // 1. Get the field input data
      input = UICtrl.getInput();
     
      //2. Add the item to the budget controller 
      newItem = budgetCtrl.addItem(input.type, input.description, input.value)
  
      //3. Add the item to the UI
      UICtrl.addListItem(newItem, input.type);
  
      //4. Calculate the budget
  
      //5. Display the budget on the UI
    };
    
    return {
      init: function() {
        console.log('Application has strated.');
        setupEventListeners();
      }
    }
  })(budgetController, UIController);
  
  
  controller.init();
  
  
  
  
  