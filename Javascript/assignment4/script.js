
//checking even or odd
const inputNum=document.getElementById("num");
const result=document.getElementById("oddevenStatus");

inputNum.addEventListener("input", () =>{

    const value=Number(inputNum.value);

    if(value=='')
        result.textContent=``;
    else if(value%2===0)
        result.textContent=`${value} is an even number`;
    else
        result.textContent=`${value} is a odd number`;
});

//computing factorial
const factorialBtn=document.getElementById("fact");
const factResult=document.getElementById("factResult");

function getFact(n){
    
    if(n===0 || n===1)
        return 1;
    else
        return (n*getFact(n-1));

}

factorialBtn.addEventListener("click", () =>{
    let num=Number(inputNum.value);

    if (num < 0) {
        factResult.textContent = "Factorial not defined for negative numbers";
        return;
    }

    let fact = getFact(num);
    factResult.textContent = `Factorial of ${num} is ${fact}`;
    
});

// factorialBtn.addEventListener("input" ,() =>{

//     if(num==='')
//         factResult.textContent=``;

// });

//random text

const TextArr=["Hi there!!","Hi again!! It's me again","Me again😂 Sorry for bothering like this","This is the last time🤣","For real this is the last time bye👋🏻"];
const HoverOutput=document.getElementById("hoverResult");
let hovercount=0;

factorialBtn.addEventListener("mouseover", () => {
    HoverOutput.textContent= TextArr[hovercount%TextArr.length];
    hovercount++;
});

// date and time

const FullDateDisplay=document.getElementById("displayFullDate");
const DateDisplay=document.getElementById("displayDate");
const displayTime=document.getElementById("displayTime");

let finalDate="";

const now= new Date();
const TodayDate=now.getDate();
const TodayMonth=now.getMonth();
const TodayYear=now.getFullYear();
DateDisplay.textContent=`Today's date is: ${TodayDate}/${TodayMonth}/${TodayYear}`;

updateClock();
setInterval(updateClock,1000);

function updateClock(){

    const present= new Date();
    FullDateDisplay.textContent=`${present}`;
    let hours=present.getHours();
    const merdiem= hours>=12 ? "PM" : "AM";
    hours= hours % 12 || 12;
    hours=hours.toString().padStart(2,0);
    const mins=present.getMinutes().toString().padStart(2,0);
    const sec=present.getSeconds().toString().padStart(2,0);
    const CurrentTime=`${hours}:${mins}:${sec} ${merdiem}`;
    displayTime.textContent=CurrentTime;

}

