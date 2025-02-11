//ToDo --R002 -- Cache at least one element using querySelector or querySelectorAll.
const btnCollectionDecrease = document.querySelectorAll(".btnDec");
const btnCollectionIncrease = document.querySelectorAll(".btnInc");

//ToDo --R001 -- Cache at least one element using selectElementById.
const btnAddCart = document.getElementById("btnAddCart");
const txtQty = document.querySelectorAll('input[type="text"]');

//Decrease Quantity of product "-"" button

btnCollectionDecrease.forEach(btnDec => {    
    btnDec.addEventListener('click', function(event) {
    event.preventDefault();
    const txtQuantityId = btnDec.getAttribute("data-id");
    let txtQuantity = document.getElementById(txtQuantityId);
    let quantity = parseInt(txtQuantity.value);
    if(quantity > 0)
    {quantity--;}
    else
    {quantity = 0;}
    txtQuantity.value = quantity; 
  });
});

//Increase quantity of product "+" button

btnCollectionIncrease.forEach(btnInc => {    
    btnInc.addEventListener('click', function(event) {
    event.preventDefault();
    const txtQuantityId = btnInc.getAttribute("data-id");
    let txtQuantity = document.getElementById(txtQuantityId);
    let quantity = parseInt(txtQuantity.value);
    quantity++;
    txtQuantity.value = quantity;   
  });
});

//Add to cart button
btnAddCart.addEventListener("click", function(e){
    let currUserProduct = [];
    //ToDo -- R004 -- Iterate over a collection of elements to accomplish some task.
    txtQty.forEach(itemQty => {        
        if(parseInt(itemQty.value) > 0)
        {         
            //TODo --R003 -- Use the parent-child-sibling relationship to navigate between elements at least once (firstChild, lastChild, parentNode, nextElementSibling, etc.).  
            const prodName = itemQty.parentNode.previousElementSibling.querySelector("img").alt;
            const priceElement = itemQty.parentNode.previousElementSibling.children[2].textContent;
            const price =priceElement.substring(1,priceElement.indexOf("/"));
            const qty = parseInt(itemQty.value.trim());
            currUserProduct.push({productName: prodName, price:price, quantity:qty});            
        }
    });
    // save product details in local storage for populating the page on refresh
    if(currUserProduct.length > 0){
        localStorage.setItem("currUser", JSON.stringify(currUserProduct)); 
    }
    //ToDo --R012-- Use at least two Browser Object Model (BOM) properties or methods.
    //redirect to cart page
    window.location.href = "cart.html"; 
});




