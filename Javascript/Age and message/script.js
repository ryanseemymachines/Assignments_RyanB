
const myText=document.getElementById("myText");
const mySubmit=document.getElementById("mySubmit");
const result=document.getElementById("result");

let age;

mySubmit.onclick=function() {
    age=myText.value;
    age=Number(age);
    if(age>=100){
        result.innerText="You are very old";
    }
    else if(age==0){
        result.innerText="You are just born";
    }
    else if(age>=18){
        result.innerText="You are of legal age";
    }
    else if(age<0){
        result.innerText="Your age can't be below zero";
    }
    else
        result.innerText="You are young";
}

