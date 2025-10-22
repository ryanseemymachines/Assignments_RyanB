
//checking even or odd
const inputNum=document.getElementById("num");
const result=document.getElementById("oddevenStatus");

inputNum.addEventListener("input", () =>{

    const value=Number(inputNum.value);

    if(value==''){
        result.textContent=``;
        
    }
    else if(value==0)
        result.textContent=`0 is a even number`;
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

//random text

const TextArr=["Hi there!!","Hi again!! It's me again","Me again😂 Sorry for bothering like this","This is the last time🤣","For real this is the last time bye👋🏻"];
const HoverOutput=document.getElementById("hoverResult");
let hovercount=0;

factorialBtn.addEventListener("mouseover", () => {
    HoverOutput.textContent= TextArr[hovercount%TextArr.length];
    hovercount++;
});

//color

const colors=["rgb(199, 53, 53)","rgb(230, 120, 30)","rgb(230, 190, 40)","rgb(65, 175, 85)","rgb(65, 120, 230)"];

const colorArray= document.getElementById("ColorArray");

for(let color of colors){
    const div=document.createElement("div");
    div.style.backgroundColor=color;
    div.textContent=color;
    div.style.padding="10px";
    colorArray.appendChild(div);
}

const ChangeBackground= document.getElementById("backgroundChange");

ChangeBackground.addEventListener("click", () => {
    let index=Math.floor(Math.random()*colors.length);
    const choosenColor= colors[index];
    document.body.style.backgroundColor=choosenColor;
})


const colorPalettes = [
    [
        "rgb(255, 235, 235)", 
        "rgb(255, 150, 150)", 
        "rgb(199, 53, 53)",   
        "rgb(180, 59, 59)",   
        "rgb(120, 30, 30)"    
    ],
    [
        "rgb(255, 245, 230)",
        "rgb(255, 200, 150)",
        "rgb(230, 120, 30)",
        "rgb(200, 95, 25)",
        "rgb(130, 55, 10)"
    ],

    [
        "rgb(255, 250, 220)",
        "rgb(255, 230, 140)",
        "rgb(230, 190, 40)",
        "rgb(190, 150, 25)",
        "rgb(120, 90, 10)"
    ],
    [
        "rgb(230, 255, 235)",
        "rgb(160, 240, 170)",
        "rgb(65, 175, 85)",
        "rgb(55, 140, 70)",
        "rgb(25, 90, 40)"
    ],
    [
        "rgb(230, 245, 255)",
        "rgb(160, 200, 255)",
        "rgb(65, 120, 230)",
        "rgb(45, 95, 190)",
        "rgb(20, 60, 130)"
    ]
];

const Btncolor = document.querySelectorAll(".color-btn");
const root=document.documentElement;

Btncolor.forEach(btn => {
    btn.addEventListener("click", (event)=>{
        const value=getComputedStyle(event.target).backgroundColor;

        const ReqColorArray= colorPalettes.find(subArray => subArray.includes(value));

        root.style.setProperty("--color-lighter",ReqColorArray[0]);
        root.style.setProperty("--color-light",ReqColorArray[1]);
        root.style.setProperty("--color-main",ReqColorArray[2]);
        root.style.setProperty("--color-dark",ReqColorArray[3]);
        root.style.setProperty("--color-darker",ReqColorArray[4]);
    });
});

// date and time

const FullDateDisplay=document.getElementById("displayFullDate");
const DateDisplay=document.getElementById("displayDate");
const displayTime=document.getElementById("displayTime");

let finalDate="";

const now= new Date();
const TodayDate=now.getDate();
const TodayMonth=now.getMonth()+1;
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


//object

const person={
    name:"Ryan",
    age:22,
    country:"India"
};

const pairs = Object.entries(person);

const display = document.getElementById("DisplayObject");
display.textContent = "The key-value pairs are:\n";

for (let [key, value] of pairs) {
    const keys = key.charAt(0).toUpperCase() + key.slice(1);
    const values = typeof(value) === "string" ? value.charAt(0).toUpperCase() + value.slice(1) : value;
    display.innerHTML += `<br>${keys}: ${values}`;
}