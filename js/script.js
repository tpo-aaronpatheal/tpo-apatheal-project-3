
//List of global variables/selectors

const otherJobRole = document.getElementById("other-job-role");
const userJobRole = document.querySelector("#title");
const shirtColor = document.getElementById("color");
const shirtDesign = document.getElementById("shirt-designs");
const shirtColorOptions = document.querySelectorAll('#color > option')
const shirtColorLabel = document.querySelector('label[for="color"]');//created this variable so I can hide the color label until the user selects a shirt design. 
const activities = document.querySelector('#activities');
const activitiesCost = document.querySelector('#activities-cost');
const activitiesCheckBox = document.querySelectorAll("input[type='checkbox']");
const userEmail = document.querySelector('#email');
const userCardNumber = document.querySelector('#cc-num');
const userZipCode = document.querySelector('#zip');
const userCvv = document.querySelector('#cvv');
const form = document.querySelector('form');
const paymentMethod = document.querySelector('label[for="payment"]');
const payment = document.querySelector('#payment');
const creditCard = document.querySelector('#credit-card');
const payPal = document.querySelector('#paypal');
const bitCoin = document.querySelector('#bitcoin');
let isChecked = false;
//console.log();


//Setting the focus property on name field when page first loads
const userName = document.getElementById('name');
userName.focus();

/*Job Role Section-first line of code hides the otherJobRole text field on load. The event listener then listens for the users clicks. 
The text field will only display if the user selects "other" in the drop down menu.*/
otherJobRole.style.display = 'none';
userJobRole.addEventListener("click", function(e) {
    if(e.target.value === 'other') {
        otherJobRole.style.display = '';
    } else {
        otherJobRole.style.display = 'none';
    }
});

/*T Shirt Info Section-First line of code set prevTarget to an empty string. Then the shirt color drop down menu is disabled
until a shirt design is selected by the user. Once the design is selected, it loops through the color options and only displays
the colors available for the targeted color design that the user selected*/
let prevTarget = '';
shirtColor.hidden = true;
shirtColorLabel.hidden = true; 
shirtDesign.addEventListener('change', function(e){
    if (e.target.value === 'js puns'  || e.target.value === 'heart js'){
        shirtColor.hidden = false;
        shirtColorLabel.hidden = false;
            if(e.target.value !== prevTarget) {
                shirtColorOptions[0].selected = 'selected';
            }
        for(let i = 1; i < shirtColorOptions.length; i++){
            if(shirtColorOptions[i].getAttribute('data-theme') === e.target.value){
                shirtColorOptions[i].style.display = '';
            } else {
                shirtColorOptions[i].style.display = 'none';
            }
        }
    }
    prevTarget = e.target.value;
});

/*Register for Activities Section-the activities, activiesTotalCost, and activities cost variables were declared globally above.
This event listener listens for the users clicks. When the user selects an activiy, it adds the data cost to the total cost. Likewise, if a user 
deselects an activity, it subtracts that events cost from the total cost.*/
let activitiesTotalCost = 0 //variable that will store the total cost of activities
activities.addEventListener('change', function(e){
    const dataCost = +e.target.getAttribute('data-cost')
    if (e.target.checked) {
        activitiesTotalCost += dataCost;
    } else {
        activitiesTotalCost -= dataCost;
    }
    activitiesCost.innerHTML = `Total: $${activitiesTotalCost}`;
});

/* For Loop below loops through activity checkboxes and applies the focus or blur event depending on user input*/
for( let i = 0; i < activitiesCheckBox.length; i++) {
    activitiesCheckBox[i].addEventListener('focus', function(e) {
        activitiesCheckBox[i].parentElement.classList.add('focus');
    });
    activitiesCheckBox[i].addEventListener('blur', function(e) {
        activitiesCheckBox[i].parentElement.classList.remove('focus');
    });
}


/*Disable conflicting times*/

activities.addEventListener ('change', function(e){
    const activityTime = e.target.getAttribute('data-day-and-time');
    for (let i = 0; i < activitiesCheckBox.length; i++) {
        if (e.target.checked === true && activityTime === activitiesCheckBox[i].getAttribute('data-day-and-time') 
        && activitiesCheckBox[i] != e.target) {
            activitiesCheckBox[i].parentElement.classList.add('disabled');
            activitiesCheckBox[i].disabled = true;
        } else if (e.target.checked === false && activityTime === activitiesCheckBox[i].getAttribute('data-day-and-time') 
        && activitiesCheckBox[i].checked === false) {
            activitiesCheckBox[i].parentElement.classList.remove('disabled');
            activitiesCheckBox[i].disabled = false;
        }
    }
});


/*Payment Info Section. Hiding paypal and bitcoin payment option on load.  Event listener added to listen for the user's payment selection.
The page loads with the default credit card fields. However if the user selects one of the other two methods, then it is hidden and vice versa. */
const paymentSelector = document.querySelector('#payment').options[0];
const paymentMethodCredit = document.querySelector('#payment').options[1];
paymentSelector.selected = false;
paymentMethodCredit.selected = true;
payPal.hidden = true;
bitCoin.hidden = true;
payment.addEventListener('change', function(e){
    if(e.target.value === 'credit-card'){
        creditCard.hidden = false;
        payPal.hidden = true;
        bitCoin.hidden = true;
    } else if(e.target.value === 'bitcoin'){
            bitCoin.hidden = false;
            payPal.hidden = true;
            creditCard.hidden = true;
    } else if(e.target.value === 'paypal'){
        payPal.hidden = false;
        bitCoin.hidden= true;
        creditCard.hidden = true;
    }
});

/*Form Validation- */

function validateUserName() {
    let nameInput = userName.value;
    let isValidName = /^[a-z]+$/i;
    if (isValidName.test(nameInput) == false) {
       // event.preventDefault();
        userName.parentElement.classList.add("not-valid");
        userName.parentElement.classList.remove("valid"); 
        userName.classList.add("error-border");
        userName.parentElement.lastElementChild.style.display = 'block'; 
        return false;
    } else if (isValidName.test(nameInput) == true) {
        userName.parentElement.classList.add("valid");
        userName.parentElement.classList.remove("not-valid");
        userName.classList.remove("error-border");
        userName.parentElement.lastElementChild.style.display = 'none';
        return true;
    }
} 

function validateEmail() {
    let emailInput = userEmail.value;
    let isValidEmail = /^[^@]+@[^@]+\.[a-z]+$/i;
    if(isValidEmail.test(emailInput) == false) {
        //event.preventDefault();
        userEmail.parentElement.classList.add("not-valid");
        userEmail.parentElement.classList.remove("valid");
        userEmail.classList.add("error-border");
        userEmail.parentElement.lastElementChild.style.display = 'block';
        return false;
    } else if (isValidEmail.test(emailInput) == true) {
        userEmail.parentElement.classList.remove("not-valid");
        userEmail.parentElement.classList.add("valid");
        userEmail.classList.remove("error-border");
        userEmail.parentElement.lastElementChild.style.display = 'none';
        return true;
    }
}
//Activities validator which checks to see if at least one activities box has been checked before submission.

function validateActivities(){
    let isChecked = 0;
    for (let i = 0; i < activitiesCheckBox.length; i++){
        if (activitiesCheckBox[i].checked) {
            isChecked += 1;
        }
    }
    if (isChecked === 0) {
        activities.parentElement.classList.add("not-valid");
        activities.parentElement.classList.remove("valid");
        activities.parentElement.lastElementChild.style.display = 'block';
        return false;
    } else if (isChecked > 0) {
        activities.parentElement.classList.remove("not-valid");
        activities.parentElement.classList.add("valid");
        activities.parentElement.lastElementChild.style.display = 'none';
        return true;
    }

}


function validateCardNumber() {
    let cardInput = userCardNumber.value;
    let isValidCard = /^\d{13,16}$/;
    const errorMessage = document.querySelector('span#cc-hint');
    errorMessage.textContent = 'Credit card number must be between 13 - 16 digits and contain only numeric values';
    if(isValidCard.test(cardInput) == false){
        //event.preventDefault();
        userCardNumber.parentElement.classList.add("not-valid");
        userCardNumber.parentElement.classList.remove("valid");
        userCardNumber.classList.add("error-border");
        userCardNumber.parentElement.lastElementChild.style.display = 'block';
        return false;
    } else if (isValidCard.test(cardInput) == true){
        userCardNumber.parentElement.classList.remove("not-valid");
        userCardNumber.parentElement.classList.add("valid");
        userCardNumber.classList.remove("error-border");
        userCardNumber.parentElement.lastElementChild.style.display = 'none';
        return true;
    }
} 



function validateZip (){
    let zipInput = userZipCode.value;
    let isValidZip = /^\d{5}$/;
    if(isValidZip.test(zipInput) == false){
        //event.preventDefault();
        userZipCode.parentElement.classList.add("not-valid");
        userZipCode.parentElement.classList.remove("valid");
        userZipCode.classList.add("error-border");
        userZipCode.parentElement.lastElementChild.style.display = 'block';
        return false;
    } else if (isValidZip.test(zipInput) == true){
        userZipCode.parentElement.classList.remove("not-valid");
        userZipCode.parentElement.classList.add("valid");
        userZipCode.classList.remove("error-border");
        userZipCode.parentElement.lastElementChild.style.display = 'none';
        return true;
    }
}
function validateCvv(){
    let cvvInput = userCvv.value;
    let isValidCvv = /^\d{3}$/;
    if(isValidCvv.test(cvvInput) == false){
        //event.preventDefault();
        userCvv.parentElement.classList.add("not-valid");
        userCvv.parentElement.classList.remove("valid");
        userCvv.classList.add("error-border");
        userCvv.parentElement.lastElementChild.style.display = 'block';
        return false;
    } else if (isValidCvv.test(cvvInput) == true){
        userCvv.parentElement.classList.remove("not-valid");
        userCvv.parentElement.classList.add("valid");
        userCvv.classList.remove("error-border");
        userCvv.parentElement.lastElementChild.style.display = 'none';
        return true;
    }
}
//submit events
form.addEventListener('submit', function(event) {
    if (validateUserName() == false || validateEmail() == false || validateActivities() == false || validateCardNumber() == false ||
    validateZip() == false || validateCvv() == false){
    event.preventDefault();
    validateUserName();
    validateEmail();
    validateActivities();
    validateCardNumber();
    validateZip();
    validateCvv();
    } else {
    validateUserName();
    validateEmail();
    validateActivities();
    validateCardNumber();
    validateZip();
    validateCvv();
    }
});

//Key-up events
form.addEventListener('keyup', function(event) {
    validateUserName();
    validateEmail();
    validateActivities();
    validateCardNumber();
    validateZip();
    validateCvv();
});

//Credit card format






