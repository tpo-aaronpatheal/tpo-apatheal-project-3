
//List of global variables/selectors

const otherJobRole = document.getElementById("other-job-role");
const userJobRole = document.querySelector("#title");
const shirtColor = document.getElementById("color");
const shirtDesign = document.getElementById("shirt-designs");
const shirtColorOptions = document.querySelectorAll('#color > option')
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

/*Job Role Section-first line of code hides the otherJobRole text field on load. The event listener then listens for changes made by the user. 
The text field will only display if the user selects "other" in the drop down menu.*/
otherJobRole.style.display = 'none';
userJobRole.addEventListener('change', function(e) {
    if(e.target.value === 'other') {
        otherJobRole.style.display = '';
    } else {
        otherJobRole.style.display = 'none';
    }
});

/*T Shirt Info Section-When the page first loads, the color drop down menu is disabled until the user selects a desigm. 
Once the design is selected, it loops through the color options and only displays the colors available for the targeted 
color design that the user selected*/
shirtColor.disabled = true;
shirtDesign.addEventListener('change', function(e){
        shirtColor.disabled = false;
         if(e.target.value === 'js puns') {
               shirtColorOptions[1].selected = true;
            }
         if (e.target.value === 'heart js') {
                shirtColorOptions[4].selected = true;
        }
        for(let i = 1; i < shirtColorOptions.length; i++){
            if(shirtColorOptions[i].getAttribute('data-theme') === e.target.value){
                shirtColorOptions[i].style.display = '';
            } else {
                shirtColorOptions[i].style.display = 'none';
            }
        }
});

/*Register for Activities Section-the activities, activiesTotalCost, and activities cost variables were declared globally above.
This event listener listens for the selection changes made by the user. When the user selects an activiy, it adds the data cost to the total cost.
Likewise, if a user deselects an activity, it subtracts that events cost from the total cost.*/
let activitiesTotalCost = 0 //variable that will store the total cost of activities
activities.addEventListener('change', function(e){
    const dataCost = +e.target.getAttribute('data-cost');
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


/*Disable conflicting times as user selects from available activities. If a user deselects an activity, then the conflicting 
activity will become available again.*/

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
The page loads with the default credit card selection and credit card fields. However if the user selects one of the other two methods, 
then it is hidden and vice versa. */
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

/*Form Validation- Below are a list of the validators for the registration page. The userName validator ensures that the user enters
only letters and does not leave the field blank. If the user leaves the field blank then a 'Name field cannot be blank' message displays.
If the user enters any numerical or special characters then a 'Name field cannot contain any numerical or spcial charcters' message displays.
 I would like to note that I made the name validation case insensitive. The email validator ensures that the user enters 
an email format with numerical and or letters followed by an @ and ".". The email validator will display the error message 'Field cannot be blank. 
Please enter a valid email address' if the user attempts to submit without entering any text in the email field. Otherwise, the email field will display
'Email address must be formatted correctly' error message. The activities validator checks to ensure that at least one
activity is checked prior to form submission. Card validator ensures that the user enters 13-16 numerical characters. The zip validator ensures
the user enters 5 numerical characters and the cvv validator ensures the user enters 3 numerical characters. If any of these fields are not complete, 
the validators will prevent the form to submit. There are conditionals added to the Card validator, zip validator, and cvv validator that checks
to see if the credit card method has been selected prior to attemting validation.*/

function validateUserName() {
    let nameInput = userName.value;
    let isValidName = /^[a-z]+$/i;
    const errorMessage = document.querySelector('span#name-hint');
    if (nameInput === ''){
        errorMessage.innerText = 'Name field cannot be blank';
    } else {
        errorMessage.innerText = 'Name field cannot contain any numerical or special characters';
    };
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
    const errorMessage = document.querySelector('span#email-hint');
    if (emailInput === '') {
        errorMessage.innerText = 'Field cannot be blank. Please enter a valid email address';
    } else {
        errorMessage.innerText = 'Email address must be formatted correctly'
    };
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
        activities.lastElementChild.style.display = 'block';
        return false;
    } else if (isChecked > 0) {
        activities.parentElement.classList.remove("not-valid");
        activities.parentElement.classList.add("valid");
        activities.lastElementChild.style.display = 'none';
        return true;
    }

}


function validateCardNumber() {
    if (payment.value == 'credit-card'){
    let cardInput = userCardNumber.value;
    //let isValidCard = /^\d{13,16}$/; //This was my original regex. I altered it to add a format function which is at the bottom of this code.
        let isValidCard = /^(\d{4})\-?(\d{4})\-?(\d{4})\-?(\d{1,4})$/;
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
} 

function validateZip (){
    if (payment.value == 'credit-card'){
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
}
function validateCvv(){
    if (payment.value == 'credit-card') {
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
}
/*Submit event-The submit even listens for the users click when attempting to submit the form. If any of the validator requirements are not met, 
then the event.preventDefault will stop the form from submitting. If all of the validator requirements have been met, then the form will
"submit" and page will refresh*/
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

/*Key-up event-The key up event provides real time error validation. As the user is entering information into the required fields, the
error message will display until the user has met the validation requirements for that specific field.*/
userName.addEventListener('keyup', function(event) {
    validateUserName();
});

userEmail.addEventListener('keyup', function(event) {
    validateEmail();
});

userCardNumber.addEventListener('keyup', function(event) {
    validateCardNumber();
});

userZipCode.addEventListener('keyup', function(event) {
    validateZip();
});

userCvv.addEventListener('keyup', function(event) {
    validateCvv();
});

/*Click-event- listens for the users clicks on an activity.*/
activities.addEventListener('click', function(event) {
    validateActivities();
});

/* This function formats the users credit card input to include "-". I included this in my project for extra practice using the replace() 
method.*/
function formatCC(text) {
    const creditCard = /^(\d{4})\-?(\d{4})\-?(\d{4})\-?(\d{1,4})$/;
    return text.replace(creditCard, '$1-$2-$3-$4');
}
userCardNumber.addEventListener ("blur", e => {
    e.target.value = formatCC(e.target.value);
});