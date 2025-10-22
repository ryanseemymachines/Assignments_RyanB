//switching between sign in and sign up
const SignInBtn =document.getElementById("signinBtn");
const signIn = SignInBtn.parentElement.parentElement.nextElementSibling;

const reg=SignInBtn.parentElement.parentElement;

const SignUpBtn =document.getElementById("signupBtn");
const signUp = SignUpBtn.parentElement.parentElement.previousElementSibling;

const signin=SignUpBtn.parentElement.parentElement;
SignInBtn.addEventListener("click" , () => {
    reg.classList.add("clicked");
    signIn.classList.add("show");
    signin.classList.remove("hide");
    signUp.classList.remove("display");
});

SignUpBtn.addEventListener("click" , () => {
    
    signin.classList.add("hide");
    signUp.classList.add("display");
    reg.classList.remove("clicked");
    signIn.classList.remove("show");
    
});

//