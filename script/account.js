const form = document.getElementById("accountregistration");

const username = form.elements.username;
const email = form.elements.email;
const password = form.elements.password;
const passwordCheck = form.elements.passwordCheck;
const address = form.elements.address;
const states = form.elements.states;
const city =form.elements.city;
const zip = form.elements.zip;
const errDisplay = document.getElementById("errorDisplay");
const ul = document.createElement("ul");

let errors = [];
//on focus - display validation messages below the form elements
// ToDo -- R011 --Register at least two different event listeners and create the associated event handler functions.
username.addEventListener('focus', function() {    
    document.getElementById('name-validation').classList.add('active');
});

email.addEventListener('focus', function() {    
    document.getElementById('email-validation').classList.add('active');
});

password.addEventListener('focus', function() {    
    document.getElementById('password-validation').classList.add('active');
});

passwordCheck.addEventListener('focus', function() {    
    document.getElementById('passwordcheck-validation').classList.add('active');
});

address.addEventListener('focus', function() {    
    document.getElementById('address-validation').classList.add('active');
});

states.addEventListener('focus', function() {
    document.getElementById('states-validation').classList.add('active');
});

zip.addEventListener('focus', function() {    
    document.getElementById('zip-validation').classList.add('active');
});

//-------------------------------------------------------
// ToDo -- R011 --Register at least two different event listeners and create the associated event handler functions.
// ToDo -- R014 -- Include at least one form and/or input with DOM event-based validation. (This can be the same form or input as the one above, but should include event-based validation in addition to the HTML attribute validation.)
form.addEventListener("submit", ValidateRegister);

//-----------------------------------------------------------------
//onclick of CreateAccount button validate form fields
function ValidateRegister(e){
    e.preventDefault();
    ul.innerHTML ="";
    errors = [];

    console.log(errors);
    console.log(errDisplay.innerHTML);

    const regex = /^[A-Za-z\s]+$/;          //name validation
    const zipCodeRegex = /^[0-9]{5}(?:-[0-9]{4})?$/;
    
    const inputUserName = username.value.trim();
    const inputEmail= email.value.trim();
    const inputPassword = password.value.trim();
    const inputPasswordCheck = passwordCheck.value.trim();   
    const inputZip = zip.value.trim();

    strErrMsg = "The username cannot contain any special characters or numbers."; 
    if(!regex.test(inputUserName))
    {   
        errors.push(strErrMsg);
        username.focus();              
    }

    strErrMsg = "The email must be a valid email address.";
    if(!isValidEmail(inputEmail)){ 
        errors.push(strErrMsg);        
        email.focus();       
    } 

    ValidatePassword(inputPassword, "password");     
    ValidatePassword(inputPasswordCheck,"passwordcheck");

    strErrMsg = "Invalid zip code. Please enter valid 5 digit or Zip-4 digit code"; 
    if(!zipCodeRegex.test(inputZip))
    {   
        errors.push(strErrMsg);
        zip.focus();              
    }

    if(errors.length > 0)    {
        // errDisplay.innerHTML = errors.join("<br>");
        errors.forEach(item => {
            const li = document.createElement("li");
            li.textContent = item;
            ul.appendChild(li);
        });
        errDisplay.appendChild(ul);
        //ToDo -- R009 --Modify the style and/or CSS classes of an element in response to user interactions using the style or classList properties.
        //ToDo -- R010-- Modify at least one attribute of an element in response to user interaction.
        errDisplay.setAttribute("style","display:block");
        errDisplay.setAttribute("style","color:red"); 
        errDisplay.classList.add("error-message");       
    }
    else{
        form.reset();
        ul.innerHTML ="";
        errDisplay.setAttribute("style","display:none");
        alert("Registered Succesfully!!")
    }
}

//-------------------------------------
//validating password & confirm password
function ValidatePassword(Password, passwordType)
{
    const strPassword = "password";
    const passwordVal = password.value.trim();
    const confirmPasswordVal = passwordCheck.value.trim();
     
    strErrMsg = "Password must have at least one uppercase, one lowercase letter, one number and one special character.";
    if(!isValidPassword(Password))
    {    
        if(!errors.includes(strErrMsg))  
        {
                errors.push(strErrMsg);  
        }  

        if(passwordType === "password")
        {password.focus();}
        else{passwordCheck.focus();}            
    }  
    
    strErrMsg = "Both passwords must match."; 
    if(confirmPasswordVal.trim() != ""){
                
        if(passwordVal.trim().toLowerCase() !== confirmPasswordVal.trim().toLowerCase())
        {                       
            if(!errors.includes(strErrMsg))  
            {
                errors.push(strErrMsg);  
            }  
            if(passwordType === "password")
            {password.focus();}
            else{passwordCheck.focus();}  
        }      
    }
}

//------------------------
//to check password valid based on pattern
function isValidPassword(password)
{
    const pattern = new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[-+_!@#$%^&*()|:<>.,?]).+$");
    return pattern.test(password);
}

//to check email valid based on pattern
function isValidEmail(email) {
    const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return regex.test(email);
}