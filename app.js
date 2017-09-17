
    var data;

//AJAX TEST

function postAjax(url, data) {
    return new Promise(function(resolve, reject) {
        var xhr = window.XMLHttpRequest ? new XMLHttpRequest() : new ActiveXObject("Microsoft.XMLHTTP");
        xhr.open('POST', url);
        xhr.onreadystatechange = function() {
            if (xhr.readyState>3 && xhr.status==200) { resolve(xhr.responseText); }
        };
        xhr.setRequestHeader('X-Requested-With', 'XMLHttpRequest');
        xhr.setRequestHeader('Content-Type', 'application/json');
        xhr.send(JSON.stringify(data));
        return xhr;
     })
}

var urlExp = 'https://api.mlab.com/api/1/databases/budget-app/collections/exp?apiKey=cxssGYdYHxJPJNWo9dR87IVu9OisXJ3t';
var urlInc = 'https://api.mlab.com/api/1/databases/budget-app/collections/inc?apiKey=cxssGYdYHxJPJNWo9dR87IVu9OisXJ3t';


function getAjax(url) {
    return new Promise(function(resolve, reject) {
        var request = new XMLHttpRequest();
        request.open('GET', url, true);

        request.onload = function() {
            if (request.status >= 200 && request.status < 400) {
                // Success!
                resolve(JSON.parse(request.responseText));
              
            } else {
                // We reached our target server, but it returned an error
                console.log('Error')
            }
        };

        request.onerror = function() {
            reject(request.statusText);
        };

        request.send();

        })
    

}

//----------------BUDGET CONTROLLER------------------------
let budgetController = (function() {

    let Expenses = function(description, value) {
        this.description = description;
        this.value = value;
    }

    let Incomes = function(description, value) {
        this.description = description;
        this.value = value;
    }


    return {
        addItem: function(type, desc, val) {
            let newItem;

            if(type === 'exp') {
                newItem = new Expenses(desc, val)
                postAjax(urlExp, newItem).then(function() {
                    location.reload()
                })
            } else if (type === 'inc') {
                newItem = new Incomes(desc, val)
                postAjax(urlInc, newItem).then(function() {
                    location.reload();
                })
            }
            return newItem;
        }  
    }

})();


//----------------UI CONTROLLER----------------------------
let UIController = (function() {

    let DOMstrings = {
        type: '.add_type',
        description: '.add_description',
        value: '.add_value',
        addBtn: '.add_btn',
        incomeContainer: '.income_list',
        expensesContainer: '.expenses_list'
    }

    return {
        getInput: function() {
            return {
                type: document.querySelector(DOMstrings.type).value,
                description: document.querySelector(DOMstrings.description).value,
                value: document.querySelector(DOMstrings.value).value
            }
        },
        getItemsList: function() {

           getAjax(urlExp).then(function(expData) {
                let element, html, newHtml;
                element = DOMstrings.expensesContainer;
                html = '<div class="item clearfix exp" id="expense-%id%"><div class="item_description">%description%</div><div class="right clearfix"><div class="item_value">%value%</div><div class="item_percentage">%percentage%</div><div class="item_delete"><button class="item_delete--btn"><i class="ion-ios-close-outline"></i></button></div></div></div>';
               

                expData.map(function(expObject) {
                            newHtml = html.replace('%id%', expObject._id.$oid);
                            newHtml = newHtml.replace('%description%', expObject.description);
                            newHtml = newHtml.replace('%value%', expObject.value);
                            document.querySelector(element).insertAdjacentHTML('beforeend', newHtml);
                    })
                });

 
            getAjax(urlInc).then(function(incData) {
                let element, html, newHtml;
                element = DOMstrings.incomeContainer;
                html = '<div class="item clearfix inc" id="income-%id%"><div class="item_description">%description%</div><div class="right clearfix"><div class="item_value">%value%</div><div class="item_delete"><button class="item_delete--btn"><i class="ion-ios-close-outline"></i></button></div></div></div>';

                incData.map(function(incObject) {
                    newHtml = html.replace('%id%', incObject._id.$oid);
                    newHtml = newHtml.replace('%description%', incObject.description);
                    newHtml = newHtml.replace('%value%', incObject.value);
                    document.querySelector(element).insertAdjacentHTML('beforeend', newHtml);
          
                    })
                })      
        },    
        DOMstrings: DOMstrings
    }
})();


//------------CONTROLLER----------------------------
let controller = (function(budgetCtrl, UICtrl) {

    let setupEventListeners = function() {
        let DOM = UICtrl.DOMstrings;

        document.querySelector(DOM.addBtn).addEventListener('click', ctrlAddItem)

        document.addEventListener('keypress', function(e) {
            if(e.keyCode === 13 || e.which === 13) {
                ctrlAddItem();
            }
        })
    }

    let ctrlAddItem = function() {
           
        // 1. Get the input fielld - done
        let input = UICtrl.getInput();

        // 2. Put the item to budget database
        budgetCtrl.addItem(input.type, input.description, input.value);

        
        // 4. Calculate the budget

        // 5. Display budget UI

        //testing
        console.log(input)
    }

    return {
        init: function() {
            UICtrl.getItemsList();
            setupEventListeners();
            
        }
    }


})(budgetController, UIController);



// INIT APP
controller.init();