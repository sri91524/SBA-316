const table = document.getElementById("cart");
const app =document.getElementById("app");
const btnEmptyCart = document.getElementById("emptyCart");

btnEmptyCart.classList.add("btnempty");
const total = document.getElementById("Total");
const divBottom = document.getElementById("divbtm");
let amount = 0;

// ToDo -- R007 -- Use the DocumentFragment interface or HTML templating with the cloneNode method to create templated content. 
const frag = new DocumentFragment();

let currUserProduct = JSON.parse(localStorage.getItem("currUser"));
console.log(currUserProduct);

if(!JSON.parse(localStorage.getItem("currUser"))){      
    table.style.display ="none";    
    divBottom.style.display ="none";  
    //ToDo -- R008-- Modify the HTML or text content of at least one element in response to user interaction using innerHTML, innerText, or textContent. 
    total.textContent = "";       
    app.innerHTML ="<h2>Your cart is empty.  Continue Shopping !!</h2>";
}
else
{
    //to display product details in view cart page
    currUserProduct.forEach(items =>{
        const prodName = items.productName;
        const unitPrice = items.price;
        const quantity = items.quantity;
        const totalPrice = parseFloat(unitPrice * quantity);

        //ToDo --R005 -- Create at least one element using createElement.
    
        const tr = document.createElement("tr");

        const td0 = document.createElement('td');
        td0.innerHTML = `<button style="border:none" onclick="deleteRow(this, '${prodName}')"><img src=../images/delete.png width=20px></button>`;
        tr.appendChild(td0);

        const td1 = document.createElement("td");
        td1.innerHTML = `<img src=../images/${prodName}.jpg width=100px alt="${prodName}"/>`;
        tr.appendChild(td1);
        
        const td2 = document.createElement("td");
        td2.textContent = "$" + unitPrice;
        tr.appendChild(td2);

        const td3 = document.createElement("td");
        td3.textContent = quantity;
        tr.appendChild(td3);

        const td4 = document.createElement("td");
        td4.textContent = "$" + totalPrice.toFixed(2);
        tr.appendChild(td4);

        amount += totalPrice;

        frag.appendChild(tr);   
    });

    //ToDo--R006 --Use appendChild and/or prepend to add new elements to the DOM.
    table.appendChild(frag);
    console.log(amount);
    total.textContent = `Total before taxes: $${amount.toFixed(2)}`;
}

//on delete of each product row
function deleteRow(row, pName){
    let i = row.parentNode.parentNode.rowIndex;  
    table.deleteRow(i); 
    let cartItems = currUserProduct.filter(prod => prod.productName != pName);
    
    if(cartItems.length > 0){
        localStorage.setItem("currUser", JSON.stringify(cartItems)); 
        currUserProduct = JSON.parse(localStorage.getItem("currUser"));
        amount = 0;
        currUserProduct.forEach(items =>{            
            const unitPrice = items.price;
            const quantity = items.quantity;
            const totalPrice = parseFloat(unitPrice * quantity);
            amount += totalPrice;
        });
        total.textContent = `Total before taxes: $${amount.toFixed(2)}`;
    }
    else
    {
        //ToDo -- R009 - Modify the style and/or CSS classes of an element in response to user interactions using the style or classList properties.
        localStorage.removeItem("currUser");
        total.textContent = "";     
        divBottom.style.display ="none";
        table.style.display ="none";
        app.innerHTML ="<h2>Your cart is empty.  Continue Shopping !!</h2>";
    }
}

//on click of empty cart remove from local storage and display empty cart message
btnEmptyCart.addEventListener("click", function(e){

    // ToDo -- R012 --Use at least two Browser Object Model (BOM) properties or methods.
    const confirmUser = window.confirm("Your cart will be emptied. Do you want to proceed?");
    if(confirmUser)
    {
        localStorage.removeItem("currUser");
        total.textContent = "";     
        divBottom.style.display ="none";
        table.style.display ="none";
        app.innerHTML ="<h2>Your cart is empty.  Continue Shopping !!</h2>";
    }
});

btnProceed.addEventListener("click", function(e){
    window.location.href = "createaccount.html";

});

