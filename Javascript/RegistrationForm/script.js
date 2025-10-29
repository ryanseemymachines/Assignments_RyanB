//Input validations

function validateInput(){
    let isValid = true;
    const nameRegex=/^[A-Za-z]+$/;

    const firstName = FirstName.value.trim();
    const middleName = MiddleName.value.trim();
    const lastName = LastName.value.trim();

    // First name validation
    if (!firstName){
        // showError(FirstName, "Title is required.");
        isValid = false;
    } 
    else if (firstName.length < 3){
        // showError(FirstName, "Title must be at least 3 characters long.");
        isValid = false;
    } 
    else if (firstName.length > 15) 
    {
        // showError(FirstName, "Title can't be longer than 15 characters.");
        isValid = false;
    } 
    else if (!nameRegex.test(firstName)) 
    {
        // showError(FirstName, "Title contains invalid characters.");
        isValid = false;
    } 
    // else{
    //     showSuccess(FirstName);
    // }

    // Middle name validation
    if (middleName.length > 15) 
    {
        // showError(MiddleName, "Title can't be longer than 15 characters.");
        isValid = false;
    } 
    else if (!nameRegex.test(middleName)) 
    {
        // showError(MiddleName, "Title contains invalid characters.");
        isValid = false;
    } 
    // else{
    //     showSuccess(MiddleName);
    // }

    // Last name validation
    if (!lastName){
        // showError(LastName, "Title is required.");
        isValid = false;
    } 
    else if (lastName.length < 3){
        // showError(LastName, "Title must be at least 3 characters long.");
        isValid = false;
    } 
    else if (lastName.length > 15) 
    {
        // showError(LastName, "Title can't be longer than 15 characters.");
        isValid = false;
    } 
    else if (!nameRegex.test(lastName)) 
    {
        // showError(LastName, "Title contains invalid characters.");
        isValid = false;
    } 
    // else{
    //     showSuccess(LastName);
    // }

    //Password validation

    return isValid;
}


const FirstName = document.getElementById("regFirstName");
const MiddleName = document.getElementById("regMiddleName");
const LastName = document.getElementById("regLastName");
const Address = document.getElementById("regAddress");
const Password = document.getElementById("regPassword");
const ConfirmPassword = document.getElementById("regConfirmPassword");
const Phone = document.getElementById("regNumber");

const Form = document.getElementById("registrationForm");
const SubBtn = document.getElementById("reg-submit");


Form.addEventListener("submit" , (e) =>{
    e.preventDefault();

    const isValid=validateInput();
    console.log(isValid);
});

const personaldataYes=document.getElementById("regChoiceYes");
const personaldataNo=document.getElementById("regChoiceNo");

const personaldataSection=document.querySelector(".personal-data-choice");

personaldataYes.addEventListener("change", () =>{
    if(personaldataYes.checked){
        personaldataNo.checked = false;
        personaldataSection.style.display="flex";
        validatePersonalData();
    }
    else{
        personaldataSection.style.display="none";
    }
});

personaldataNo.addEventListener("change", () =>{
    if(personaldataNo.checked){
        personaldataYes.checked = false;
        personaldataSection.style.display="none";
    }
});

const Male=document.getElementById("regMale");
const Female=document.getElementById("regFemale");

Male.addEventListener("change", () =>{
    if(Male.checked){
    Female.checked = false;
    }
});

Female.addEventListener("change", () =>{
    if(Female.checked){
    Male.checked = false;
    }
});

const PasswordView=document.querySelector(".fa-password");
const ConfirmPasswordView=document.querySelector(".fa-confirmpassword");

PasswordView.addEventListener("click" , () =>{
    Password.type==="password"?Password.type="text":Password.type="password";
})

ConfirmPasswordView.addEventListener("click" , () =>{
    ConfirmPassword.type==="password"?ConfirmPassword.type="text":ConfirmPassword.type="password";
})
