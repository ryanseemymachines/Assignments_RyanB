// Elements
const form = document.getElementById("registrationForm");
const firstName = document.getElementById("regFirstName");
const middleName = document.getElementById("regMiddleName");
const lastName = document.getElementById("regLastName");
const address = document.getElementById("regAddress");
const password = document.getElementById("regPassword");
const confirmPassword = document.getElementById("regConfirmPassword");
const phone = document.getElementById("regNumber");
const birthday = document.getElementById("regBirthday");
const email = document.getElementById("regEmail");
const male = document.getElementById("regMale");
const female = document.getElementById("regFemale");
const terms = document.getElementById("regTerms");
const choiceYes = document.getElementById("regChoiceYes");
const choiceNo = document.getElementById("regChoiceNo");
const personalSection = document.querySelector(".personal-data-choice");
const successMsg = document.getElementById("regSuccessMessage");
const submitBtn = document.getElementById("reg-submit");

const today = new Date();
today.setFullYear(today.getFullYear() - 18);
const maxDate = today.toISOString().split("T")[0];
birthday.setAttribute("max", maxDate);

// Show/Hide Personal Data Section
choiceYes.addEventListener("change", () =>{
    if(choiceYes.checked){
        choiceNo.checked = false;
        personalSection.style.display = "flex";
    }
});

choiceNo.addEventListener("change", () =>{
    if(choiceNo.checked){
        choiceYes.checked = false;
        personalSection.style.display = "none";
        // Clear personal data fields when "No" is selected
        birthday.value = "";
        email.value = "";
        male.checked = false;
        female.checked = false;
        clearError(birthday);
        clearError(email);
        clearError(male);
    }
});

// Password visibility toggles
document.querySelector(".fa-password").addEventListener("click", () =>{
    password.type = password.type === "password" ? "text" : "password";
});
document.querySelector(".fa-confirmpassword").addEventListener("click", () =>{
    confirmPassword.type = confirmPassword.type === "password" ? "text" : "password";
});

// Gender checkbox mutual exclusivity
male.addEventListener("change", () =>{
    if(male.checked){
        female.checked = false;
    }
});

female.addEventListener("change", () =>{
    if(female.checked){
        male.checked = false;
    }
});

// Helper functions
function showError(input, message){
    const group = input.closest(".form-group");
    const errorDiv = group.querySelector(".error-message");
    if(errorDiv){
        errorDiv.textContent = message;
    }
}

function clearError(input){
    const group = input.closest(".form-group");
    const errorDiv = group.querySelector(".error-message");
    if(errorDiv){
        errorDiv.textContent = "";
    }
}

// Validate all fields - only called on submit
function validateForm(){
    let valid = true;
    const nameRegex = /^[A-Za-z]+$/;

    // Clear all previous errors
    document.querySelectorAll(".error-message").forEach((msg) => (msg.textContent = ""));

    // First Name validation
    if(!firstName.value.trim() || !nameRegex.test(firstName.value.trim())){
        showError(firstName, "First name is required and must contain only letters.");
        valid = false;
    }

    // Middle Name validation
    if(middleName.value.trim() && !nameRegex.test(middleName.value.trim())){
        showError(middleName, "Middle name can only contain letters.");
        valid = false;
    }

    // Last Name validation
    if(!lastName.value.trim() || !nameRegex.test(lastName.value.trim())){
        showError(lastName, "Last name is required and must contain only letters.");
        valid = false;
    }

    // Address validation
    if(!address.value.trim()){
        showError(address, "Address is required.");
        valid = false;
    }

    // Password validation
    const passRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

    if(!password.value.trim()){
        showError(password, "Password is required.");
        valid = false;
    } 
    else if(!passRegex.test(password.value)){
        showError(password, "Password must include uppercase, lowercase, number, and special character (min 8 chars).");
        valid = false;
    }

    if(!confirmPassword.value.trim()){
        showError(confirmPassword, "Please confirm your password.");
        valid = false;
    } 
    else if(confirmPassword.value !== password.value){
        showError(confirmPassword, "Passwords do not match.");
        valid = false;
    }

    // Phone validation - must be exactly 10 digits
    if(!/^\d{10}$/.test(phone.value.trim())){
        showError(phone, "Enter a valid 10-digit phone number.");
        valid = false;
    }

    //Personal data choice
    if(!choiceYes.checked && !choiceNo.checked){
        showError(choiceNo, "Please select your choice.");
        valid = false;
    }

    // Personal data validation (if Yes is selected)
    if(choiceYes.checked){
        if(!birthday.value){
            showError(birthday, "Date of birth is required.");
            valid = false;
        }
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if(!email.value.trim() || !emailRegex.test(email.value.trim())){
            showError(email, "Enter a valid email address.");
            valid = false;
        }

        if(!male.checked && !female.checked){
            showError(male, "Please select your gender.");
            valid = false;
        }
    }

    // Terms validation
    if(!terms.checked){
        showError(terms,"You must accept terms and conditions.");
        valid = false;
    }

    return valid;
}

// Submit form
form.addEventListener("submit", (e) =>{
    e.preventDefault();
    
    // Clear any previous success message
    successMsg.textContent = "";
    
    // Validate all fields
    const isValid = validateForm();

    if (!isValid){
        const firstErrorElement = document.querySelector('.error-message:not(:empty)');
        if (firstErrorElement){
            const errorInput = firstErrorElement.previousElementSibling;
            (firstErrorElement).scrollIntoView({
                behavior: 'smooth',
                block: 'center'
            });
            if(errorInput){
                errorInput.focus();
            }
        }
    }
    else{
        // Show success message
        successMsg.textContent = "Registration successful! Redirecting...";
        successMsg.style.color = "green";
        successMsg.style.display = "block";

        // Reset and redirect after delay
        setTimeout(() =>{
            form.reset();
            personalSection.style.display = "none";
            document.querySelectorAll(".error-message").forEach((msg) => (msg.textContent = ""));
            successMsg.textContent = "";
            successMsg.style.display = "none";
            
            // Redirect (update path as needed)
            window.location.href = "../ToDo_copy/index.html";
                        
            // For demonstration, just re-enable the button
            checkRequiredFields();
        }, 2000);
    } 
});


