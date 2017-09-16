
//AJAX TEST

function postAjax(url, data, success) {

    var xhr = window.XMLHttpRequest ? new XMLHttpRequest() : new ActiveXObject("Microsoft.XMLHTTP");
    xhr.open('POST', url);
    xhr.onreadystatechange = function() {
        if (xhr.readyState>3 && xhr.status==200) { success(xhr.responseText); }
    };
    xhr.setRequestHeader('X-Requested-With', 'XMLHttpRequest');
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.send(JSON.stringify(data));
    return xhr;
}

var json = {
    cos:"aaa"
}


// example request
postAjax(url, json, function(data){ console.log(data); });



//----------------BUDGET CONTROLLER------------------------
let budgetController = (function() {

    let Expenses = function(id, description, value) {
        this.id = id;
        this.description = description;
        this.value = value;
    }

    let Incomes = function(id, description, value) {
        this.id = id;
        this.description = description;
        this.value = value;
    }

    var data = {
        allItems: {
            expenses: [],
            incomes: []
        },
        totals: {
            expenses: 0,
            incomes: 0
        }
    }

})();


//----------------UI CONTROLLER----------------------------
let UIController = (function() {

    let DOMstrings = {
        type: '.add_type',
        description: '.add_description',
        value: '.add_value',
        addBtn: '.add_btn'
    }

    return {
        getInput: function() {
            return {
                type: document.querySelector(DOMstrings.type).value,
                description: document.querySelector(DOMstrings.description).value,
                value: document.querySelector(DOMstrings.value).value
            }
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

        // 2. Put the item to budget

        // 3. Put the item to UI

        // 4. Calculate the budget

        // 5. Display budget UI

        //testing
        console.log(input)
    }

    return {
        init: function() {
            setupEventListeners();
        }
    }


})(budgetController, UIController);



// INIT APP
controller.init();