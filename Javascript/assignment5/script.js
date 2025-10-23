// Switching between sign in and sign up
const SignInBtn = document.getElementById("signinBtn");
const signIn = SignInBtn.parentElement.parentElement.nextElementSibling;
const reg = SignInBtn.parentElement.parentElement;
const SignUpBtn = document.getElementById("signupBtn");
const signUp = SignUpBtn.parentElement.parentElement.previousElementSibling;
const signin = SignUpBtn.parentElement.parentElement;

SignInBtn.addEventListener("click", () => {
    reg.classList.add("clicked");
    signIn.classList.add("show");
    signin.classList.remove("hide");
    signUp.classList.remove("display");
    clearForm('registrationForm');
});

SignUpBtn.addEventListener("click", () => {
    signin.classList.add("hide");
    signUp.classList.add("display");
    reg.classList.remove("clicked");
    signIn.classList.remove("show");
    clearForm('signinForm');
});

// Form validation functions
function showError(input, message) {
    const formGroup = input.parentElement;
    const errorDiv = formGroup.querySelector('.error-message');
    input.classList.add('error');
    input.classList.remove('success');
    errorDiv.textContent = message;
    errorDiv.classList.add('show');
}

function showSuccess(input) {
    const formGroup = input.parentElement;
    const errorDiv = formGroup.querySelector('.error-message');
    input.classList.add('success');
    input.classList.remove('error');
    errorDiv.classList.remove('show');
}

function validateEmailReg(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if(!re.test(email)){
        showError(regEmail,"Invalid email formal");
        return false;
    }

    let users = JSON.parse(localStorage.getItem("user")) ||[];

    const emailExists = users.some(user => user.email === email);
    if (emailExists) {
        showError(regEmail, "User already exists with this email");
        return false;
    }

    return true;
}

function validateEmail(email){
    const mail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return(mail.test(email));
}

function clearForm(formId) {
    const form = document.getElementById(formId);
    form.reset();
    const inputs = form.querySelectorAll('input');
    inputs.forEach(input => {
        input.classList.remove('error', 'success');
    });
    const errors = form.querySelectorAll('.error-message');
    errors.forEach(error => error.classList.remove('show'));
    const success = form.querySelector('.success-message');
    if (success) success.classList.remove('show');
}

// Registration form validation
const registrationForm = document.getElementById('registrationForm');
const regName = document.getElementById('regName');
const regEmail = document.getElementById('regEmail');
const regPassword = document.getElementById('regPassword');
const regConfirmPassword = document.getElementById('regConfirmPassword');
const regSuccessMessage = document.getElementById('regSuccessMessage');

registrationForm.addEventListener('submit', (e) => {
    e.preventDefault();
    let isValid = true;

    // Validate name
    if (regName.value.trim() === '') {
        showError(regName, 'Name is required');
        isValid = false;
    } 
    else if (regName.value.trim().length < 3) {
        showError(regName, 'Name must be at least 3 characters');
        isValid = false;
    } 
    else {
        showSuccess(regName);
    }

    // Validate email
    if (regEmail.value.trim() === '') {
        showError(regEmail, 'Email is required');
        isValid = false;
    } 
    else if (!validateEmailReg(regEmail.value.trim())) {
        isValid = false;
    } 
    else {
        showSuccess(regEmail);
    }

    // Validate password
    if (regPassword.value === '') {
        showError(regPassword, 'Password is required');
        isValid = false;
    } 
    else if (regPassword.value.length < 6) {
        showError(regPassword, 'Password must be at least 6 characters');
        isValid = false;
    } 
    else {
        showSuccess(regPassword);
    }

    // Validate confirm password
    if (regConfirmPassword.value === '') {
        showError(regConfirmPassword, 'Please confirm your password');
        isValid = false;
    } 
    else if (regPassword.value !== regConfirmPassword.value) {
        showError(regConfirmPassword, 'Passwords do not match');
        isValid = false;
    } 
    else {
        showSuccess(regConfirmPassword);
    }

    if (isValid) {
        regSuccessMessage.textContent = 'Registration successful! Welcome aboard!';
        regSuccessMessage.classList.add('show');
        let users = JSON.parse(localStorage.getItem("user")) || [];
        let regDetails ={
            name:regName.value,
            email:regEmail.value,
            password:regPassword.value
        };
        users=[...users,regDetails];
        localStorage.setItem("user",JSON.stringify(users));
        setTimeout(() => {
            clearForm('registrationForm');
        }, 500);
        setTimeout(() => {
            reg.classList.add("clicked");
            signIn.classList.add("show");
        },1000);
    } 
    else {
        regSuccessMessage.classList.remove('show');
    }
});

// Sign in form validation
const signinForm = document.getElementById('signinForm');
const signinEmail = document.getElementById('signinEmail');
const signinPassword = document.getElementById('signinPassword');
const signinSuccessMessage = document.getElementById('signinSuccessMessage');
const signinPasswordError=document.getElementById('signinPasswordError');

signinForm.addEventListener('submit', (e) => {
    e.preventDefault();
    let isValid = true;

    // Validate email
    if (signinEmail.value.trim() === '') {
        showError(signinEmail, 'Email is required');
        isValid = false;
    } 
    else if (!validateEmail(signinEmail.value.trim())) {
        showError(signinEmail, 'Please enter a valid email');
        isValid = false;
    } 
    else {
        showSuccess(signinEmail);
    }

    // Validate password
    if (signinPassword.value === '') {
        showError(signinPassword, 'Password is required');
        isValid = false;
    } 
    else {
        showSuccess(signinPassword);
    }

    if (isValid) {

        let users = JSON.parse(localStorage.getItem("user")) || [];
        
        const emailIndex = users.findIndex(user => user.email === signinEmail.value.trim());
        const signInPass = users[emailIndex].password;

        if(users[emailIndex].email === signinEmail.value.trim()){
            if(signInPass === signinPassword.value.trim()){
                signinSuccessMessage.textContent = 'Sign in successful! Welcome back!';
                signinSuccessMessage.classList.add('show');
                setTimeout(() => {
                    clearForm('signinForm');
                }, 1000);
            }
            else{
                showError(signinPassword,"Wrong passsword");
            }
        }else
        {showError(signinEmail,"Wrong email");}
    } else {
        signinSuccessMessage.classList.remove('show');
    }
});