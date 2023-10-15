//grap the content of the forms
const form = document.querySelector("form");
const email = document.getElementById("email");
const emailError = document.querySelector("#email");

//Add Event Listener 
//Check for valid entries
email.addEventListener("input", (event) => {
    if (email.validity.valid) {
        //Dont show error message if field is valid
        emailError.textContent = "";
    } else{
        //Show error
        showError();
    }
});

//Add event listener for submissions
form.addEventListener("submit", (event) => {
    //Submit the form if valid
    if (!email.validity.valid) {
        //if not, show error
    showError();
    //Then prevent submitting
    event.preventDefault();
    }
});

//If entry field is empty show the ff
function showError(){
    if (email.validity.valueMissing) {
        //Show this
        emailError.textContent = "You need to enter your email address";
    } else if (email.validity.typeMismatch) {
        //if entry is valid email add. show;
        emailError.textContent = "Entry must be a valid email";
    }
}