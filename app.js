

//----------------BUDGET CONTROLLER------------------------
let budgetController = (function() {


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

    let DOM = UICtrl.DOMstrings;

    let ctrlAddItem = function() {
           
        // 1. Get the input fielld
        let input = UICtrl.getInput();

        // 2. Put the item to budget

        // 3. Put the item to UI

        // 4. Calculate the budget

        // 5. Display budget UI

        //testing
        console.log(input)
    }

    document.querySelector(DOM.addBtn).addEventListener('click', ctrlAddItem)

    document.addEventListener('keypress', function(e) {
        if(e.keyCode === 13 || e.which === 13) {
            ctrlAddItem();
        }
    })

})(budgetController, UIController);