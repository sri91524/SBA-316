const btnCollectionDecrease = document.querySelectorAll(".btnDec");
const btnCollectionIncrease = document.querySelectorAll(".btnInc");
const btnAddCart = document.getElementById("btnAddCart");
const txtQty = document.querySelectorAll('input[type="text"]');

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



btnAddCart.addEventListener("click", function(e){
    let currUserProduct = [];
    txtQty.forEach(itemQty => {
        
        if(parseInt(itemQty.value) > 0)
        {           
            const prodName = itemQty.parentNode.previousElementSibling.querySelector("img").alt;
            const priceElement = itemQty.parentNode.previousElementSibling.children[2].textContent;
            const price =priceElement.substring(1,priceElement.indexOf("/"));
            const qty = parseInt(itemQty.value.trim());
            currUserProduct.push({productName: prodName, price:price, quantity:qty});            
        }
    });
    
    console.log(currUserProduct);
    if(currUserProduct.length > 0){
        localStorage.setItem("currUser", JSON.stringify(currUserProduct)); 
    }
    window.location.href = "cart.html"; 
});




